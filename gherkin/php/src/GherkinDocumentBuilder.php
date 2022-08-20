<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\Builder;
use Cucumber\Gherkin\Parser\RuleType;
use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Gherkin\ParserException\AstBuilderException;
use Cucumber\Messages\Background;
use Cucumber\Messages\Comment;
use Cucumber\Messages\DataTable;
use Cucumber\Messages\DocString;
use Cucumber\Messages\Examples;
use Cucumber\Messages\Feature;
use Cucumber\Messages\FeatureChild;
use Cucumber\Messages\GherkinDocument;
use Cucumber\Messages\Id\IdGenerator;
use Cucumber\Messages\Location as MessageLocation;
use Cucumber\Messages\Rule;
use Cucumber\Messages\RuleChild;
use Cucumber\Messages\Scenario;
use Cucumber\Messages\Step;
use Cucumber\Messages\TableCell;
use Cucumber\Messages\TableRow;
use Cucumber\Messages\Tag;
use LogicException;

/**
 * @implements Builder<GherkinDocument>
 */
final class GherkinDocumentBuilder implements Builder
{
    /** @var list<Comment> */
    private array $comments = [];

    /** @var non-empty-list<AstNode> */
    private array $stack;

    public function __construct(
        private readonly string $uri,
        private readonly IdGenerator $idGenerator,
    ) {
        $this->reset($uri);
    }

    public function build(Token $token): void
    {
        if (null === $token->match) {
            throw new LogicException('Token was not yet matched');
        }

        $ruleType = RuleType::cast($token->match->tokenType);

        if ($token->match->tokenType == TokenType::Comment) {
            $this->comments[] = new Comment($this->getLocation($token->match, 0), $token->match->text);
        } else {
            $this->currentNode()->add($ruleType, $token->match);
        }
    }

    public function startRule(RuleType $ruleType): void
    {
        array_push($this->stack, new AstNode($ruleType));
    }

    public function endRule(RuleType $ruleType): void
    {
        $node = array_pop($this->stack);
        $transformedNode = $this->getTransformedNode($node);
        if (null !== $transformedNode) {
            $this->currentNode()->add($node->ruleType, $transformedNode);
        }
    }

    public function getResult(): GherkinDocument
    {
        $document = $this->currentNode()->getSingle(GherkinDocument::class, Ruletype::GherkinDocument);

        if (null === $document) {
            throw new LogicException('GherkinDocument was not built from source, but no parse errors');
        }

        return $document;
    }

    public function reset(string $uri): void
    {
        $this->stack = [new AstNode(RuleType::None)];
    }

    private function currentNode(): AstNode
    {
        return $this->stack[array_key_last($this->stack)];
    }

    /**
     * @return object|string|list<object>|null
     */
    private function getTransformedNode(AstNode $node): object|string|array|null
    {
        return match ($node->ruleType) {
            RuleType::Step => $this->transformStepNode($node),
            RuleType::DocString => $this->transformDocStringNode($node),
            RuleType::ScenarioDefinition => $this->transformScenarioDefinitionNode($node),
            RuleType::ExamplesDefinition => $this->transformExamplesDefinitionNode($node),
            RuleType::ExamplesTable => $this->transformExamplesTableNode($node),
            RuleType::DataTable => $this->transformDataTableNode($node),
            Ruletype::Background => $this->transformBackgroundNode($node),
            RuleType::Description => $this->transformDescriptionNode($node),
            RuleType::Feature => $this->transformFeatureNode($node),
            RuleType::Rule => $this->transformRuleNode($node),
            RuleType::GherkinDocument => $this->transformGherkinDocumentNode($node),
            default => $node,
        };
    }

    private function getLocation(TokenMatch $token, int $column): MessageLocation
    {
        $column = ($column === 0) ? $token->location->column : $column;

        return new MessageLocation($token->location->line, $column);
    }

    private function getDescription(AstNode $node): string
    {
        return (string) $node->getSingleUntyped(RuleType::Description, "");
    }

    /** @return list<Step> */
    private function getSteps(AstNode $node): array
    {
        return $node->getitems(Step::class, RuleType::Step);
    }

    /** @return list<TableRow> */
    private function getTableRows(AstNode $node): array
    {
        $rows = array_map(
            fn ($token) => new TableRow($this->getLocation($token, 0), $this->getCells($token), $this->idGenerator->newId()),
            $node->getTokenMatches(TokenType::TableRow),
        );

        $this->ensureCellCount($rows);

        return $rows;
    }

    /** @param list<TableRow> $rows */
    private function ensureCellCount(array $rows): void
    {
        if (!count($rows)) {
            return;
        }

        $cellCount = count($rows[0]->cells);
        foreach ($rows as $row) {
            if (count($row->cells) !== $cellCount) {
                $location = new Location($row->location->line, $row->location->column ?? 0);
                throw new AstBuilderException('inconsistent cell count within the table', $location);
            }
        }
    }

    /**
     * @return list<TableCell>
     */
    private function getCells(TokenMatch $token): array
    {
        return array_map(
            fn ($cellItem) => new TableCell($this->getLocation($token, $cellItem->column), $cellItem->text),
            $token->items,
        );
    }

    /**
     * @return list<Tag>
     */
    private function getTags(AstNode $node): array
    {
        $tagsNode = $node->getSingle(AstNode::class, RuleType::Tags, new AstNode(RuleType::None));

        $tokens = $tagsNode->getTokenMatches(TokenType::TagLine);
        $tags = [];
        foreach ($tokens as $token) {
            foreach ($token->items as $tagItem) {
                $tags[] = new Tag(
                    location: $this->getLocation($token, $tagItem->column),
                    name: $tagItem->text,
                    id: $this->idGenerator->newId(),
                );
            }
        }

        return $tags;
    }

    /**
     * @param array<TokenMatch> $lineTokens
     */
    private function joinMatchedTextWithLinebreaks(array $lineTokens): string
    {
        return join("\n", array_map(fn ($t) => $t->text, $lineTokens));
    }

    private function transformStepNode(AstNode $node): Step
    {
        $stepLine = $node->getTokenMatch(TokenType::StepLine);

        return new Step(
            location: $this->getLocation($stepLine, 0),
            keyword: $stepLine->keyword,
            keywordType: $stepLine->keywordType,
            text: $stepLine->text,
            docString: $node->getSingle(DocString::class, RuleType::DocString),
            dataTable: $node->getSingle(DataTable::class, RuleType::DataTable),
            id: $this->idGenerator->newId(),
        );
    }

    private function transformDocStringNode(AstNode $node): DocString
    {
        $separatorToken = $node->getTokenMatches(TokenType::DocStringSeparator)[0];
        $mediaType = $separatorToken->text;
        $lineTokens = $node->getTokenMatches(TokenType::Other);

        $content = $this->joinMatchedTextWithLinebreaks($lineTokens);

        return new DocString(
            location: $this->getLocation($separatorToken, 0),
            mediaType: $mediaType ?: null, // special case turns '' into null
            content: $content,
            delimiter: $separatorToken->keyword,
        );
    }

    private function transformScenarioDefinitionNode(AstNode $node): ?Scenario
    {
        $scenarioNode = $node->getSingle(AstNode::class, RuleType::Scenario);
        if (null === $scenarioNode) {
            return null;
        }
        $scenarioLine = $scenarioNode->getTokenMatch(TokenType::ScenarioLine);

        return new Scenario(
            location: $this->getLocation($scenarioLine, 0),
            tags: $this->getTags($node),
            keyword: $scenarioLine->keyword,
            name: $scenarioLine->text,
            description: $this->getDescription($scenarioNode),
            steps: $this->getSteps($scenarioNode),
            examples: $scenarioNode->getItems(Examples::class, RuleType::ExamplesDefinition),
            id: $this->idGenerator->newId(),
        );
    }

    private function transformExamplesDefinitionNode(AstNode $node): ?Examples
    {
        $examplesNode = $node->getSingle(AstNode::class, RuleType::Examples);
        if (null === $examplesNode) {
            return null;
        }
        $examplesLine = $examplesNode->getTokenMatch(TokenType::ExamplesLine);
        /** @var list<TableRow>|null $rows */
        $rows = $examplesNode->getSingleUntyped(RuleType::ExamplesTable);
        $tableHeader = is_array($rows) && count($rows) ? $rows[0] : null;
        $tableBody = (is_array($rows) && count($rows) > 0) ? array_slice($rows, 1) : [];

        return new Examples(
            location: $this->getLocation($examplesLine, 0),
            tags: $this->getTags($node),
            keyword: $examplesLine->keyword,
            name: $examplesLine->text,
            description: $this->getDescription($examplesNode),
            tableHeader: $tableHeader,
            tableBody: $tableBody,
            id: $this->idGenerator->newId(),
        );
    }

    private function transformDataTableNode(AstNode $node): DataTable
    {
        $rows = $this->getTableRows($node);

        return new DataTable($rows[0]->location, $rows);
    }

    /** @return list<TableRow> */
    private function transformExamplesTableNode(AstNode $node): array
    {
        return $this->getTableRows($node);
    }

    private function transformBackgroundNode(AstNode $node): Background
    {
        $backgroundLine = $node->getTokenMatch(TokenType::BackgroundLine);

        return new Background(
            location: $this->getLocation($backgroundLine, 0),
            keyword: $backgroundLine->keyword,
            name: $backgroundLine->text,
            description: $this->getDescription($node),
            steps: $this->getSteps($node),
            id: $this->idGenerator->newId(),
        );
    }

    private function transformDescriptionNode(AstNode $node): string
    {
        $lineTokens = $node->getTokenMatches(TokenType::Other);

        $lineText = preg_replace(
            '/(\\n\\s*)*$/u',
            '',
            $this->joinMatchedTextWithLinebreaks($lineTokens),
        );

        return $lineText;
    }

    private function transformFeatureNode(AstNode $node): ?Feature
    {
        $header = $node->getSingle(AstNode::class, RuleType::FeatureHeader, new AstNode(RuleType::FeatureHeader));
        if (!$header instanceof AstNode) {
            return null;
        }
        $tags = $this->getTags($header);
        $featureLine = $header->getTokenMatch(TokenType::FeatureLine);

        $children = [];

        $background = $node->getSingle(Background::class, RuleType::Background);
        if ($background instanceof Background) {
            $children[] = new FeatureChild(background: $background);
        }

        foreach ($node->getItems(Scenario::class, RuleType::ScenarioDefinition) as $scenario) {
            $children[] = new FeatureChild(scenario: $scenario);
        }

        foreach ($node->getItems(Rule::class, RuleType::Rule) as $rule) {
            $children[] = new FeatureChild($rule, null, null);
        }

        $language = $featureLine->gherkinDialect->getLanguage();

        return new Feature(
            location: $this->getLocation($featureLine, 0),
            tags: $tags,
            language: $language,
            keyword: $featureLine->keyword,
            name: $featureLine->text,
            description: $this->getDescription($header),
            children: $children,
        );
    }

    private function transformRuleNode(AstNode $node): Rule
    {
        $header = $node->getSingle(AstNode::class, RuleType::RuleHeader, new AstNode(RuleType::RuleHeader));

        $ruleLine = $header->getTokenMatch(TokenType::RuleLine);

        $children = [];
        $tags = $this->getTags($header);

        $background = $node->getSingle(Background::class, RuleType::Background);
        if ($background) {
            $children[] = new RuleChild(background: $background);
        }
        $scenarios = $node->getItems(Scenario::class, RuleType::ScenarioDefinition);
        foreach ($scenarios as $scenario) {
            $children[] = new RuleChild(scenario: $scenario);
        }

        return new Rule(
            location: $this->getLocation($ruleLine, 0),
            tags: $tags,
            keyword: $ruleLine->keyword,
            name: $ruleLine->text,
            description: $this->getDescription($header),
            children: $children,
            id: $this->idGenerator->newId(),
        );
    }

    private function transformGherkinDocumentNode(AstNode $node): GherkinDocument
    {
        $feature = $node->getSingle(Feature::class, RuleType::Feature);

        return new GherkinDocument(
            uri: $this->uri,
            feature: $feature,
            comments: $this->comments,
        );
    }
}

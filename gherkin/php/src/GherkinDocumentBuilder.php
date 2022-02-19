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
use SebastianBergmann\Type\LogicException;

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
        private readonly IdGenerator $idGenerator
    ) {
        $this->reset($uri);
    }

    public function build(Token $token): void
    {
        if (is_null($token->matchedType)) {
            throw new \LogicException('Token was not yet matched');
        }

        $ruleType = RuleType::cast($token->matchedType);

        if ($token->matchedType == TokenType::Comment) {
            $this->comments[] = new Comment($this->getLocation($token, 0), $token->matchedText ?? '');
        } else {
            $this->currentNode()->add($ruleType, $token);
        }
    }

    public function startRule(RuleType $ruleType): void
    {
        array_push($this->stack, new AstNode($ruleType));
    }

    public function endRule(RuleType $ruleType): void
    {
        $node = array_pop($this->stack);
        if ($transformedNode = $this->getTransformedNode($node)) {
            $this->currentNode()->add($node->ruleType, $transformedNode);
        }
    }

    public function getResult(): GherkinDocument
    {
        $document = $this->currentNode()->getSingle(GherkinDocument::class, Ruletype::GherkinDocument);

        if (is_null($document)) {
            throw new \LogicException('GherkinDocument was not built from source, but no parse errors');
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
        switch ($node->ruleType) {

            case RuleType::Step:

                $stepLine = $node->getToken(TokenType::StepLine);

                return new Step(
                    location: $this->getLocation($stepLine, 0),
                    keyword: $stepLine->matchedKeyword ?? '',
                    text: $stepLine->matchedText ?? '',
                    docString: $node->getSingle(DocString::class, RuleType::DocString),
                    dataTable: $node->getSingle(DataTable::class, RuleType::DataTable),
                    id: $this->idGenerator->newId(),
                );

            case RuleType::DocString:

                $separatorToken = $node->getTokens(TokenType::DocStringSeparator)[0];
                $mediaType = $separatorToken->matchedText ?: null;
                $lineTokens = $node->getTokens(TokenType::Other);

                $content = join("\n", array_map(fn ($t) => $t->matchedText, $lineTokens));

                return new DocString(
                    location: $this->getLocation($separatorToken, 0),
                    mediaType: $mediaType,
                    content: $content,
                    delimiter: $separatorToken->matchedKeyword ?? '',
                );

            case RuleType::ScenarioDefinition:
                $scenarioNode = $node->getSingle(AstNode::class, RuleType::Scenario);
                if (is_null($scenarioNode)) {
                    throw new LogicException('No scenario in definition');
                }
                $scenarioLine = $scenarioNode->getToken(TokenType::ScenarioLine);

                return new Scenario(
                    location: $this->getLocation($scenarioLine, 0),
                    tags: $this->getTags($node),
                    keyword: $scenarioLine->matchedKeyword ?? '',
                    name: $scenarioLine->matchedText ?? '',
                    description: $this->getDescription($scenarioNode),
                    steps: $this->getSteps($scenarioNode),
                    examples: $scenarioNode->getItems(Examples::class, RuleType::ExamplesDefinition),
                    id: $this->idGenerator->newId()
                );

            case RuleType::ExamplesDefinition:

                $examplesNode = $node->getSingle(AstNode::class, RuleType::Examples);
                if (is_null($examplesNode)) {
                    return null;
                }
                $examplesLine = $examplesNode->getToken(TokenType::ExamplesLine);
                /** @var list<TableRow>|null $rows */
                $rows = $examplesNode->getSingleUntyped(RuleType::ExamplesTable);
                $tableHeader = is_array($rows) && count($rows) ? $rows[0] : null;
                $tableBody = is_array($rows) && count($rows) ? array_slice($rows, 1) : [];

                return new Examples(
                    location: $this->getLocation($examplesLine, 0),
                    tags: $this->getTags($node),
                    keyword: $examplesLine->matchedKeyword ?? '',
                    name: $examplesLine->matchedText ?? '',
                    description: $this->getDescription($examplesNode),
                    tableHeader: $tableHeader,
                    tableBody: $tableBody,
                    id: $this->idGenerator->newId(),
                );

            case RuleType::ExamplesTable:

                return $this->getTableRows($node);

            case RuleType::DataTable:

                $rows =$this->getTableRows($node);

                return new DataTable($rows[0]->location, $rows);

            case Ruletype::Background:

                $backgroundLine = $node->getToken(TokenType::BackgroundLine);

                return new Background(
                    location: $this->getLocation($backgroundLine, 0),
                    keyword: $backgroundLine->matchedKeyword ?? '',
                    name: $backgroundLine->matchedText ?? '',
                    description: $this->getDescription($node),
                    steps: $this->getSteps($node),
                    id: $this->idGenerator->newId(),
                );

            case RuleType::Description:

                $lineTokens = $node->getTokens(TokenType::Other);

                $lineText = preg_replace(
                    '/(\\n\\s*)*$/u',
                    '',
                    join("\n", array_map(
                        (fn ($t): string => $t->matchedText ?? ''),
                        $lineTokens
                    ))
                );

                return $lineText;

            case RuleType::Feature:
                $header = $node->getSingle(AstNode::class, RuleType::FeatureHeader, new AstNode(RuleType::FeatureHeader));
                if (!$header instanceof AstNode) {
                    return null;
                }
                $tags = $this->getTags($header);
                $featureLine = $header->getToken(TokenType::FeatureLine);

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

                $language = $featureLine->matchedGherkinDialect?->getLanguage();
                if (is_null($language)) {
                    return null;
                }

                return new Feature(
                    location: $this->getLocation($featureLine, 0),
                    tags: $tags,
                    language: $language,
                    keyword: $featureLine->matchedKeyword ?? '',
                    name: $featureLine->matchedText ?? '',
                    description: $this->getDescription($header),
                    children: $children,
                );

            case RuleType::Rule:

                $header = $node->getSingle(AstNode::class, RuleType::RuleHeader, new AstNode(RuleType::RuleHeader));
                if (is_null($header)) {
                    return null;
                }

                $ruleLine = $header->getToken(TokenType::RuleLine);

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
                    keyword: $ruleLine->matchedKeyword ?? '',
                    name: $ruleLine->matchedText ?? '',
                    description: $this->getDescription($header),
                    children: $children,
                    id: $this->idGenerator->newId(),
                );

            case RuleType::GherkinDocument:
                $feature = $node->getSingle(Feature::class, RuleType::Feature);

                return new GherkinDocument(
                    uri: $this->uri,
                    feature: $feature,
                    comments: $this->comments,
                );

            default:
                return $node;
        }
    }

    private function getLocation(Token $token, int $column): MessageLocation
    {
        $column = ($column === 0) ? $token->location->getColumn() : $column;

        return new MessageLocation($token->location->getLine(), $column);
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
        $rows = [];

        foreach ($node->getTokens(TokenType::TableRow) as $token) {
            $rows[] = new TableRow($this->getLocation($token, 0), $this->getCells($token), $this->idGenerator->newId());
        }

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
                throw new AstBuilderException('Inconsistent cell count within the table', $location);
            }
        }
    }

    /**
     * @return list<TableCell>
     */
    private function getCells(Token $token): array
    {
        return array_map(
            fn ($cellItem) => new TableCell($this->getLocation($token, $cellItem->column), $cellItem->text),
            $token->matchedItems ?? []
        );
    }

    /**
     * @return list<Tag>
     */
    private function getTags(AstNode $node): array
    {
        $tagsNode = $node->getSingle(AstNode::class, RuleType::Tags, new AstNode(RuleType::None));

        $tokens = $tagsNode?->getTokens(TokenType::TagLine) ?? [];
        $tags = [];
        foreach ($tokens as $token) {
            foreach ($token->matchedItems ?? [] as $tagItem) {
                $tags[] = new Tag(
                    location: $this->getLocation($token, $tagItem->column),
                    name: $tagItem->text,
                    id: $this->idGenerator->newId(),
                );
            }
        }

        return $tags;
    }
}

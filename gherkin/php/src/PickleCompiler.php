<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Messages\DataTable;
use Cucumber\Messages\DocString;
use Cucumber\Messages\Feature;
use Cucumber\Messages\GherkinDocument;
use Cucumber\Messages\Id\IdGenerator;
use Cucumber\Messages\Pickle;
use Cucumber\Messages\PickleDocString;
use Cucumber\Messages\PickleStep;
use Cucumber\Messages\PickleStepArgument;
use Cucumber\Messages\PickleTable;
use Cucumber\Messages\PickleTableCell;
use Cucumber\Messages\PickleTableRow;
use Cucumber\Messages\PickleTag;
use Cucumber\Messages\Rule;
use Cucumber\Messages\Scenario;
use Cucumber\Messages\Step;
use Cucumber\Messages\TableCell;
use Cucumber\Messages\TableRow;
use Cucumber\Messages\Tag;
use Generator;

final class PickleCompiler
{
    /** @var array<string, PickleStep\Type|null> */
    private array $pickleStepTypeFromKeyword = [];

    private Step\KeywordType $lastKeywordType = Step\KeywordType::UNKNOWN;

    public function __construct(
        private readonly IdGenerator $idGenerator,
    ) {
        $this->pickleStepTypeFromKeyword[Step\KeywordType::UNKNOWN->name] = PickleStep\Type::UNKNOWN;
        $this->pickleStepTypeFromKeyword[Step\KeywordType::CONTEXT->name] = PickleStep\Type::CONTEXT;
        $this->pickleStepTypeFromKeyword[Step\KeywordType::ACTION->name] = PickleStep\Type::ACTION;
        $this->pickleStepTypeFromKeyword[Step\KeywordType::OUTCOME->name] = PickleStep\Type::OUTCOME;
        $this->pickleStepTypeFromKeyword[Step\KeywordType::CONJUNCTION->name] = null;
    }

    /**
     * @return Generator<Pickle>
     */
    public function compile(GherkinDocument $gherkinDocument, string $uri): Generator
    {
        if (!$gherkinDocument->feature) {
            return;
        }

        $feature = $gherkinDocument->feature;
        $language = $feature->language;

        yield from $this->compileFeature($feature, $language, $uri);
    }

    /**
     * @return Generator<Pickle>
     */
    private function compileFeature(Feature $feature, string $language, string $uri): Generator
    {
        $tags = $feature->tags;
        $featureBackgroundSteps = [];

        foreach ($feature->children as $featureChild) {
            if ($featureChild->background) {
                $featureBackgroundSteps = [...$featureBackgroundSteps, ...$featureChild->background->steps];
            } elseif ($featureChild->rule) {
                yield from $this->compileRule($featureChild->rule, $tags, $featureBackgroundSteps, $language, $uri);
            } elseif ($featureChild->scenario) {
                if (!$featureChild->scenario->examples) {
                    yield from $this->compileScenario($featureChild->scenario, $tags, $featureBackgroundSteps, $language, $uri);
                } else {
                    yield from $this->compileScenarioOutline($featureChild->scenario, $tags, $featureBackgroundSteps, $language, $uri);
                }
            }
        }
    }

    /**
     * @param list<Tag> $parentTags
     * @param list<Step> $featureBackgroundSteps
     *
     * @return Generator<Pickle>
     */
    private function compileRule(Rule $rule, array $parentTags, array $featureBackgroundSteps, string $language, string $uri): Generator
    {
        $ruleBackgroundSteps = $featureBackgroundSteps;
        $ruleTags = [...$parentTags, ...$rule->tags];

        foreach ($rule->children as $ruleChild) {
            if ($ruleChild->background) {
                $ruleBackgroundSteps = [...$ruleBackgroundSteps, ...$ruleChild->background->steps];
            } elseif ($ruleChild->scenario && $ruleChild->scenario->examples) {
                yield from $this->compileScenarioOutline($ruleChild->scenario, $ruleTags, $ruleBackgroundSteps, $language, $uri);
            } elseif ($ruleChild->scenario) {
                yield from $this->compileScenario($ruleChild->scenario, $ruleTags, $ruleBackgroundSteps, $language, $uri);
            }
        }
    }

    /**
     * @param list<Tag> $parentTags
     * @param list<Step> $backgroundSteps
     *
     * @return Generator<Pickle>
     */
    private function compileScenario(Scenario $scenario, array $parentTags, array $backgroundSteps, string $language, string $uri): Generator
    {
        $steps = [
            ...($scenario->steps ? $this->pickleSteps($backgroundSteps) : []),
            ...array_map(fn ($s) => $this->pickleStep($s), $scenario->steps),
        ];

        $tags = [...$parentTags, ...$scenario->tags];
        $this->lastKeywordType = Step\KeywordType::UNKNOWN;

        yield new Pickle(
            id: $this->idGenerator->newId(),
            uri: $uri,
            name: $scenario->name,
            language: $language,
            steps: $steps,
            tags: $this->pickleTags($tags),
            astNodeIds: [$scenario->id],
        );
    }

    /**
     * @param list<Tag> $featureTags
     * @param list<Step> $backgroundSteps
     *
     * @return Generator<Pickle>
     */
    private function compileScenarioOutline(Scenario $scenario, array $featureTags, array $backgroundSteps, string $language, string $uri): Generator
    {
        foreach ($scenario->examples as $examples) {
            if (!$examples->tableHeader) {
                continue;
            }

            $variableCells = $examples->tableHeader->cells;
            foreach ($examples->tableBody as $valuesRow) {
                $valueCells = $valuesRow->cells;

                $steps = [
                    ...($scenario->steps ? $this->pickleSteps($backgroundSteps) : []),
                    ...array_map(fn ($s) => $this->pickleStep($s, $variableCells, $valuesRow), $scenario->steps),
                ];

                $tags = [...$featureTags, ...$scenario->tags, ...$examples->tags];

                $sourceIds = [$scenario->id, $valuesRow->id];

                yield new Pickle(
                    id: $this->idGenerator->newId(),
                    uri: $uri,
                    name: $this->interpolate($scenario->name, $variableCells, $valueCells),
                    language: $language,
                    steps: $steps,
                    tags: $this->pickleTags($tags),
                    astNodeIds: $sourceIds,
                );
            }
        }
    }

    /**
     * @param list<Step> $steps
     * @return list<PickleStep>
     */
    private function pickleSteps(array $steps): array
    {
        return array_map(fn ($s) => $this->pickleStep($s), $steps);
    }

    /**
     * @param list<TableCell> $variableCells
     */
    private function pickleStep(Step $step, array $variableCells = [], ?TableRow $valuesRow = null): PickleStep
    {
        $valueCells = $valuesRow?->cells ?? [];
        $stepText = $this->interpolate($step->text, $variableCells, $valueCells);

        $astNodeIds = $valuesRow ? [$step->id, $valuesRow->id] : [$step->id];

        if ($step->dataTable) {
            $argument = new PickleStepArgument(dataTable: $this->pickleDataTable($step->dataTable, $variableCells, $valueCells));
        } elseif ($step->docString) {
            $argument = new PickleStepArgument(docString: $this->pickleDocString($step->docString, $variableCells, $valueCells));
        } else {
            $argument = null;
        }

        $this->lastKeywordType =
            $step->keywordType === Step\KeywordType::CONJUNCTION
            ? $this->lastKeywordType
            : ($step->keywordType ?? Step\KeywordType::UNKNOWN)
        ;

        return new PickleStep(
            argument: $argument,
            astNodeIds: $astNodeIds,
            id: $this->idGenerator->newId(),
            type: $this->pickleStepTypeFromKeyword[$this->lastKeywordType->name],
            text: $stepText,
        );
    }

    /**
     * @param list<TableCell> $variableCells
     * @param list<TableCell> $valueCells
     */
    private function interpolate(string $name, array $variableCells, array $valueCells): string
    {
        $variables = array_map(fn ($c) => '<'.$c->value.'>', $variableCells);
        $values = array_map(fn ($c) => $c->value, $valueCells);

        $replacements = array_combine($variables, $values);

        return StringUtils::replace($name, $replacements);
    }

    /**
     * @param list<TableCell> $variableCells
     * @param list<TableCell> $valueCells
     */
    private function pickleDataTable(DataTable $dataTable, array $variableCells, array $valueCells): PickleTable
    {
        return new PickleTable(
            rows: array_map(
                fn ($r) => new PickleTableRow(
                    cells: array_map(
                        fn ($c) => new PickleTableCell(
                            $this->interpolate($c->value, $variableCells, $valueCells),
                        ),
                        $r->cells,
                    ),
                ),
                $dataTable->rows,
            ),
        );
    }

    /**
     * @param list<TableCell> $variableCells
     * @param list<TableCell> $valueCells
     */
    private function pickleDocString(DocString $docstring, array $variableCells, array $valueCells): PickleDocString
    {
        return new PickleDocString(
            mediaType: $docstring->mediaType ? $this->interpolate($docstring->mediaType, $variableCells, $valueCells) : null,
            content: $this->interpolate($docstring->content, $variableCells, $valueCells),
        );
    }

    /**
     * @param list<Tag> $tags
     * @return list<PickleTag>
     */
    private function pickleTags(array $tags): array
    {
        return array_map(fn ($t) => $this->pickleTag($t), $tags);
    }

    private function pickleTag(Tag $tag): PickleTag
    {
        return new PickleTag($tag->name, $tag->id);
    }
}

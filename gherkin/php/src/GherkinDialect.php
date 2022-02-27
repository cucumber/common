<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

/**
 * @psalm-type Dialect = array{
 *     feature: non-empty-list<non-empty-string>,
 *     background: non-empty-list<non-empty-string>,
 *     scenario: non-empty-list<non-empty-string>,
 *     scenarioOutline: non-empty-list<non-empty-string>,
 *     examples: non-empty-list<non-empty-string>,
 *     rule: non-empty-list<non-empty-string>,
 *     given: non-empty-list<non-empty-string>,
 *     when: non-empty-list<non-empty-string>,
 *     then: non-empty-list<non-empty-string>,
 *     and: non-empty-list<non-empty-string>,
 *     but: non-empty-list<non-empty-string>,
 * } $data
 */
final class GherkinDialect
{
    /**
     * @param Dialect $dialect
     */
    public function __construct(
        private readonly string $language,
        private readonly array $dialect,
    ) {
    }

    public function getLanguage(): string
    {
        return $this->language;
    }

    /** @return non-empty-list<non-empty-string> */
    public function getFeatureKeywords(): array
    {
        return $this->dialect['feature'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getBackgroundKeywords(): array
    {
        return $this->dialect['background'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getScenarioKeywords(): array
    {
        return $this->dialect['scenario'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getScenarioOutlineKeywords(): array
    {
        return $this->dialect['scenarioOutline'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getRuleKeywords(): array
    {
        return $this->dialect['rule'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getGivenKeywords(): array
    {
        return $this->dialect['given'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getWhenKeywords(): array
    {
        return $this->dialect['when'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getThenKeywords(): array
    {
        return $this->dialect['then'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getAndKeywords(): array
    {
        return $this->dialect['and'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getButKeywords(): array
    {
        return $this->dialect['but'];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getStepKeywords(): array
    {
        return [
            ...$this->getGivenKeywords(),
            ...$this->getWhenKeywords(),
            ...$this->getThenKeywords(),
            ...$this->getAndKeywords(),
            ...$this->getButKeywords(),
        ];
    }

    /** @return non-empty-list<non-empty-string> */
    public function getExamplesKeywords(): array
    {
        return $this->dialect['examples'];
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class GherkinDialectTest extends TestCase
{
    private GherkinDialect $dialect;

    public function setUp(): void
    {
        $data = [
            'feature' => ['F1', 'F2', 'F3'],
            'background' => ['B1', 'B2', 'B3'],
            'scenario' => ['S1', 'S2', 'S3'],
            'scenarioOutline' => ['SO1', 'SO2', 'SO3'],
            'rule' => ['R1', 'R2', 'R3'],
            'examples' => ['E1', 'E2', 'E3'],
            'given' => ['G1', 'G2', 'G3'],
            'when' => ['W1', 'W2', 'W3'],
            'then' => ['T1', 'T2', 'T3'],
            'and' => ['A1', 'A2', 'A3'],
            'but' => ['B1', 'B2', 'B3'],
        ];

        $this->dialect = new GherkinDialect('en', $data);
    }

    public function testItReturnsItsLanguage(): void
    {
        self::assertSame('en', $this->dialect->getLanguage());
    }

    public function testItReturnsTheFeatureKeywords(): void
    {
        self::assertSame(['F1', 'F2', 'F3'], $this->dialect->getFeatureKeywords());
    }

    public function testItReturnsTheScenarioKeywords(): void
    {
        self::assertSame(['S1', 'S2', 'S3'], $this->dialect->getScenarioKeywords());
    }

    public function testItReturnsTheScenarioOutlineKeywords(): void
    {
        self::assertSame(['SO1', 'SO2', 'SO3'], $this->dialect->getScenarioOutlineKeywords());
    }

    public function testItReturnsTheRuleKeywords(): void
    {
        self::assertSame(['R1', 'R2', 'R3'], $this->dialect->getRuleKeywords());
    }

    public function testItReturnsTheExamplesKeywords(): void
    {
        self::assertSame(['E1', 'E2', 'E3'], $this->dialect->getExamplesKeywords());
    }

    public function testItReturnsTheBackgroundKeywords(): void
    {
        self::assertSame(['B1', 'B2', 'B3'], $this->dialect->getBackgroundKeywords());
    }

    public function testItReturnsTheGivenKeywords(): void
    {
        self::assertSame(['G1', 'G2', 'G3'], $this->dialect->getGivenKeywords());
    }

    public function testItReturnsTheWhenKeywords(): void
    {
        self::assertSame(['W1', 'W2', 'W3'], $this->dialect->getWhenKeywords());
    }

    public function testItReturnsTheThenKeywords(): void
    {
        self::assertSame(['T1', 'T2', 'T3'], $this->dialect->getThenKeywords());
    }

    public function testItReturnsTheAndKeywords(): void
    {
        self::assertSame(['A1', 'A2', 'A3'], $this->dialect->getAndKeywords());
    }

    public function testItReturnsTheButKeywords(): void
    {
        self::assertSame(['B1', 'B2', 'B3'], $this->dialect->getButKeywords());
    }

    public function testItReturnsTheMergedStepKeywords(): void
    {
        $expected = [
            'G1', 'G2', 'G3',
            'W1', 'W2', 'W3',
            'T1', 'T2', 'T3',
            'A1', 'A2', 'A3',
            'B1', 'B2', 'B3',
        ];
        self::assertSame($expected, $this->dialect->getStepKeywords());
    }
}

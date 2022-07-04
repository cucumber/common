<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class GherkinDialectProviderTest extends TestCase
{
    private GherkinDialectProvider $dialectProvider;

    public function setUp(): void
    {
        $this->dialectProvider = new GherkinDialectProvider();
    }

    public function testItCanListLanguages(): void
    {
        $languages = $this->dialectProvider->getLanguages();

        self::assertTrue(count($languages) > 1);
        self::assertContains('en', $languages);
    }

    /** @psalm-suppress RedundantCondition  */
    public function testItCanProvideADialectForKnownLanguage(): void
    {
        $dialect = $this->dialectProvider->getDialect('de', new Location(1, 1));

        self::assertInstanceOf(GherkinDialect::class, $dialect);
    }

    public function testItThrowsAnExceptionWithLocationIfLanguageIsNotFound(): void
    {
        $location = new Location(1, 1);

        $this->expectExceptionObject(new ParserException\NoSuchLanguageException('xx', $location));

        $this->dialectProvider->getDialect('xx', $location);
    }

    /** @psalm-suppress RedundantCondition  */
    public function testItGetsADefaultDialectFromConstructorLanguage(): void
    {
        $this->dialectProvider = new GherkinDialectProvider('fr');

        $dialect = $this->dialectProvider->getDefaultDialect();

        self::assertInstanceOf(GherkinDialect::class, $dialect);
        self::assertSame('fr', $dialect->getLanguage());
    }
}

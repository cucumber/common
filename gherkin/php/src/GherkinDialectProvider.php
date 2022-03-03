<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\ParserException\NoSuchLanguageException;
use JsonException;
use RuntimeException;

/**
 * @psalm-import-type Dialect from GherkinDialect
 */
final class GherkinDialectProvider
{
    /**
     * @var non-empty-array<non-empty-string, Dialect>
     */
    private readonly array $DIALECTS;

    public const JSON_PATH = __DIR__ . '/../resources/gherkin-languages.json';

    /** @param non-empty-string $defaultDialectName */
    public function __construct(
        private readonly string $defaultDialectName = 'en',
    ) {
        try {
            /**
             * Here we force the type checker to assume the decoded JSON has the correct
             * structure, rather than validating it. This is safe because it's not dynamic
             *
             * @var non-empty-array<non-empty-string, Dialect> $data
             */
            $data = json_decode(file_get_contents(self::JSON_PATH), true, flags: JSON_THROW_ON_ERROR);
            $this->DIALECTS = $data;
        } catch (JsonException $e) {
            throw new RuntimeException("Unable to parse " . self::JSON_PATH, previous: $e);
        }
    }

    /**
     * @return non-empty-list<non-empty-string>
     */
    public function getLanguages(): array
    {
        return array_keys($this->DIALECTS);
    }

    /**
     * @param non-empty-string $language
     */
    public function getDialect(string $language, ?Location $location): GherkinDialect
    {
        if (!isset($this->DIALECTS[$language])) {
            throw new NoSuchLanguageException($language, $location);
        }

        return new GherkinDialect($language, $this->DIALECTS[$language]);
    }

    public function getDefaultDialect(): GherkinDialect
    {
        return $this->getDialect($this->defaultDialectName, null);
    }
}

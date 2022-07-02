<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Messages\Step\KeywordType;

final class Token
{
    private const EOF_VALUE = 'EOF';
    public ?TokenMatch $match = null;

    public function __construct(
        public readonly ?GherkinLine $line,
        public readonly Location $location,
    ) {
    }

    /**
     * @psalm-assert-if-true null $this->line
     */
    public function isEof(): bool
    {
        return null === $this->line;
    }

    public function getLocation(): Location
    {
        return $this->match ? $this->match->location : $this->location;
    }

    public function getTokenValue(): string
    {
        return $this->isEof() ? self::EOF_VALUE : $this->line->getLineText(-1);
    }

    /**
     * @param list<GherkinLineSpan> $items
     */
    public function match(
        TokenType $matchedType,
        GherkinDialect $gherkinDialect,
        int $indent,
        string $keyword,
        KeywordType|null $keywordType,
        string $text,
        array $items,
    ): void {
        $this->match = new TokenMatch(
            $matchedType,
            $gherkinDialect,
            $indent,
            $keyword,
            $keywordType,
            $text,
            $items,
            new Location($this->location->line, $indent + 1),
        );
    }
}

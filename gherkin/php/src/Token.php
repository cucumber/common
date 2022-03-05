<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;

final class Token
{
    private const EOF_VALUE = 'EOF';
    public ?TokenMatch $match = null;

    public function __construct(
        public readonly ?GherkinLine $line,
        /**
         * Public because the token matcher adds indent to columns
         */
        public Location $location,
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
        return $this->location;
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
        string $text,
        array $items,
    ): void {
        $this->location = new Location($this->location->line, $indent + 1);

        $this->match = new TokenMatch(
            $matchedType,
            $gherkinDialect,
            $indent,
            $keyword,
            $text,
            $items,
            new Location($this->location->line, $indent + 1),
        );
    }
}

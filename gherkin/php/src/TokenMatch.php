<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;

final class TokenMatch
{
    /**
     * @param list<GherkinLineSpan> $items
     */
    public function __construct(
        public readonly TokenType $tokenType,
        public readonly GherkinDialect $gherkinDialect,
        public readonly int $indent,
        public readonly string $keyword,
        public readonly string $text,
        public readonly array $items,
        public readonly Location $location,
    ) {
    }
}

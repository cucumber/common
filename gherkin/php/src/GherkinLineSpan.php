<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class GherkinLineSpan
{
    public function __construct(
        public readonly int $column,
        public readonly string $text,
    ) {
    }
}

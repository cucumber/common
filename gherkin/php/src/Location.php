<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class Location
{
    public function __construct(
        public readonly int $line,
        public readonly int $column,
    ) {
    }

    public function getColumn(): int
    {
        return $this->column;
    }
}

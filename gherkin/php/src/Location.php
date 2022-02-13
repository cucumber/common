<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class Location
{
    public function __construct(
        private readonly int $line,
        private readonly int $column,
    ) {
    }

    public function getLine(): int
    {
        return $this->line;
    }

    public function getColumn(): int
    {
        return $this->column;
    }
}

<?php

namespace Cucumber\Gherkin;

interface GherkinLine
{
    public function indent(): int;

    /**
     * @param int $indentToRemove If -1 no indent is removed
     */
    public function getLineText(int $indentToRemove): string;

    /** @param non-empty-string $keyword */
    public function startsWithTitleKeyword(string $keyword): bool;

    public function getRestTrimmed(int $length): string;

    public function isEmpty(): bool;

    public function startsWith(string $string): bool;

    /** @return list<GherkinLineSpan> */
    public function getTableCells(): array;

    /** @return list<GherkinLineSpan> */
    public function getTags(): array;
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class StringGherkinLine implements GherkinLine
{
    // TODO: set this to 0 when/if we change to 0-indexed columns
    private const OFFSET = 1;
    /**
     * Splits a string around | char, only if it's not preceded by an odd number of \
     */
    private const CELL_PATTERN = '/(?<!\\\\)(?:\\\\{2})*\K\\|/u';
    private readonly int $indent;
    private readonly string $trimmedLineText;

    public function __construct(
        private readonly string $lineText,
        private readonly int $line,
    ) {
        $this->trimmedLineText = StringUtils::trim($this->lineText);
        $this->indent = StringUtils::symbolCount($lineText) - StringUtils::symbolCount(StringUtils::ltrim($lineText));
    }

    public function indent(): int
    {
        return $this->indent;
    }

    public function getLineText(int $indentToRemove): string
    {
        if ($indentToRemove < 0 || $indentToRemove > $this->indent) {
            return $this->trimmedLineText;
        }

        return StringUtils::substring($this->lineText, $indentToRemove);
    }

    /** @param non-empty-string $keyword */
    public function startsWithTitleKeyword(string $keyword): bool
    {
        $textLength = StringUtils::symbolCount($keyword);

        return StringUtils::symbolCount($this->trimmedLineText) > $textLength
            && StringUtils::startsWith($this->trimmedLineText, $keyword)
            && StringUtils::subString(
                $this->trimmedLineText,
                $textLength,
                StringUtils::symbolCount(GherkinLanguageConstants::TITLE_KEYWORD_SEPARATOR),
            ) ===  GherkinLanguageConstants::TITLE_KEYWORD_SEPARATOR;
    }

    public function getRestTrimmed(int $length): string
    {
        return StringUtils::trim(StringUtils::substring($this->trimmedLineText, $length));
    }

    public function isEmpty(): bool
    {
        return StringUtils::symbolCount($this->trimmedLineText) === 0;
    }

    public function startsWith(string $string): bool
    {
        return StringUtils::startsWith($this->trimmedLineText, $string);
    }

    /** @return list<GherkinLineSpan> */
    public function getTableCells(): array
    {
        /**
         * @var list<array{0:string, 1:int}> $splitCells guaranteed by PREG_SPLIT_OFFSET_CAPTURE
         */
        $splitCells = preg_split(self::CELL_PATTERN, $this->lineText, flags: PREG_SPLIT_OFFSET_CAPTURE);

        // Safely remove elements before the first and last separators
        array_shift($splitCells);
        array_pop($splitCells);

        return array_map(
            function ($match) {
                [$cell, $byteOffset] = $match;

                // substr to chop at the byte boundary, then count the chars
                $cellStart = StringUtils::symbolCount(substr($this->lineText, 0, $byteOffset));

                $leftTrimmedCell = StringUtils::ltrimKeepNewLines($cell);
                $cellIndent = StringUtils::symbolCount($cell) - StringUtils::symbolCount($leftTrimmedCell);
                $trimmedCell = StringUtils::rtrimKeepNewLines($leftTrimmedCell);

                // Match \N and then replace based on what X is
                // done this way so that \\n => \n once and isn't then recursively replaced again (or similar)
                $unescaped = preg_replace_callback(
                    '/(\\\\.)/u',
                    function ($groups) {
                        return match ($groups[0]) {
                            '\\n' => "\n",
                            '\\\\' => '\\',
                            '\\|' => '|',
                            default => $groups[0],
                        };
                    },
                    $trimmedCell,
                );

                return new GherkinLineSpan($cellStart + $cellIndent + self::OFFSET, $unescaped);
            },
            $splitCells,
        );
    }

    /** @return list<GherkinLineSpan> */
    public function getTags(): array
    {
        $uncommentedLine = preg_replace('/\s' . preg_quote(GherkinLanguageConstants::COMMENT_PREFIX) . '.*$/u', '', $this->trimmedLineText);

        /**
         * @var list<array{0:string, 1:int}> $elements guaranteed by PREG_SPLIT_OFFSET_CAPTURE
         */
        $elements = preg_split('/' . preg_quote(GherkinLanguageConstants::TAG_PREFIX) . '/u', $uncommentedLine, flags: PREG_SPLIT_OFFSET_CAPTURE);

        // Skip before the first tag prefix
        array_shift($elements);

        return array_values(array_filter(array_map(
            function ($element) {
                $token = StringUtils::rtrim($element[0]);
                $column = $this->indent + $element[1];
                if (StringUtils::symbolCount($token) > 0) {
                    if (preg_match('/\s+/u', $token)) {
                        throw new ParserException("A tag may not contain whitespace", new Location($this->line, $column));
                    }

                    return new GherkinLineSpan($column, GherkinLanguageConstants::TAG_PREFIX . $token);
                }
            },
            $elements,
        )));
    }
}

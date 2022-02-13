<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class StringGherkinLine implements GherkinLine
{
    // TODO: set this to 0 when/if we change to 0-indexed columns
    private const OFFSET = 1;
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
        $lineSpans = [];
        $cellBuilder = '';
        $beforeFirst = true;
        $col = 0;
        $cellStart = 0;
        $escape = false;

        foreach (StringUtils::symbolsList($this->lineText) as $c) {
            if ($escape) {
                switch ($c) {
                    case 'n':
                        $cellBuilder .= "\n";
                        break;
                    case '\\':
                        $cellBuilder .= '\\';
                        break;
                    case '|':
                        $cellBuilder .= '|';
                        break;
                    default:
                        // Invalid escape. We'll just ignore it.
                        $cellBuilder .= "\\";
                        $cellBuilder .= $c;
                        break;
                }
                $escape = false;
            } else {
                if ($c == '\\') {
                    $escape = true;
                } elseif ($c == '|') {
                    if ($beforeFirst) {
                        // Skip the first empty span
                        $beforeFirst = false;
                    } else {
                        $cell = $cellBuilder;
                        $leftTrimmedCell = StringUtils::ltrimKeepNewLines($cell);
                        $cellIndent = StringUtils::symbolCount($cell) - StringUtils::symbolCount($leftTrimmedCell);
                        $lineSpans[] = new GherkinLineSpan($cellStart + $cellIndent + self::OFFSET, StringUtils::rtrimKeepNewLines($leftTrimmedCell));
                    }
                    $cellBuilder = '';
                    $cellStart = $col + 1;
                } else {
                    $cellBuilder .= $c;
                }
            }
            $col++;
        }

        return $lineSpans;
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

        $tags = [];
        foreach ($elements as $element) {
            $token = StringUtils::rtrim($element[0]);
            $column = $this->indent + $element[1];
            if (StringUtils::symbolCount($token) > 0) {
                if (preg_match('/\s+/u', $token)) {
                    throw new ParserException("A tag may not contain whitespace", new Location($this->line, $column));
                }
                $tags[] = new GherkinLineSpan($column, GherkinLanguageConstants::TAG_PREFIX . $token);
            }
        }

        return $tags;
    }
}

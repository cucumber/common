<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Gherkin\Parser\TokenMatcherInterface;

final class TokenMatcher implements TokenMatcherInterface
{
    private const LANGUAGE_PATTERN = "/^\\s*#\\s*language\\s*:\\s*([a-zA-Z\\-_]+)\\s*$/";
    private GherkinDialect $currentDialect;
    private int $indentToRemove = 0;
    private ?string $activeDocStringSeparator = null;

    public function __construct(
        private readonly GherkinDialectProvider $dialectProvider = new GherkinDialectProvider('en'),
    ) {
        $this->reset();
    }

    public function reset(): void
    {
        $this->currentDialect = $this->dialectProvider->getDefaultDialect();
    }

    /**
     * @param list<GherkinLineSpan>|null $items
     */
    private function setTokenMatched(
        Token $token,
        TokenType $matchedType,
        ?string $text = null,
        ?string $keyword = null,
        ?int $indent = null,
        ?array $items = null,
    ): void {
        $matchedIndent = $indent ?? $token->line?->indent() ?? 0;
        $token->match(
            $matchedType,
            $this->currentDialect,
            $matchedIndent,
            $keyword ?? '',
            $text ?? '',
            $items ?? [],
        );
    }

    public function match_EOF(Token $token): bool
    {
        if ($token->isEof()) {
            $this->setTokenMatched($token, TokenType::EOF);

            return true;
        }

        return false;
    }

    public function match_FeatureLine(Token $token): bool
    {
        return $this->matchTitleLine($token, TokenType::FeatureLine, $this->currentDialect->getFeatureKeywords());
    }

    public function match_BackgroundLine(Token $token): bool
    {
        return $this->matchTitleLine($token, TokenType::BackgroundLine, $this->currentDialect->getBackgroundKeywords());
    }

    public function match_ScenarioLine(Token $token): bool
    {
        return $this->matchTitleLine($token, TokenType::ScenarioLine, $this->currentDialect->getScenarioKeywords())
            || $this->matchTitleLine($token, TokenType::ScenarioLine, $this->currentDialect->getScenarioOutlineKeywords());
    }

    public function match_RuleLine(Token $token): bool
    {
        return $this->matchTitleLine($token, TokenType::RuleLine, $this->currentDialect->getRuleKeywords());
    }

    public function match_ExamplesLine(Token $token): bool
    {
        return $this->matchTitleLine($token, TokenType::ExamplesLine, $this->currentDialect->getExamplesKeywords());
    }

    /**
     * @param list<non-empty-string> $keywords
     */
    private function matchTitleLine(Token $token, TokenType $tokenType, array $keywords): bool
    {
        foreach ($keywords as $keyword) {
            if ($token->line?->startsWithTitleKeyword($keyword)) {
                $title = $token->line->getRestTrimmed(StringUtils::symbolCount($keyword) + StringUtils::symbolCount(GherkinLanguageConstants::TITLE_KEYWORD_SEPARATOR));
                $this->setTokenMatched($token, $tokenType, $title, $keyword);

                return true;
            }
        }

        return false;
    }

    public function match_Other(Token $token): bool
    {
        //take the entire line, except removing DocString indents
        $text = $token->line?->getLineText($this->indentToRemove) ?? '';
        $this->setTokenMatched($token, TokenType::Other, $this->unescapeDocString($text), indent: 0);

        return true;
    }

    public function match_Empty(Token $token): bool
    {
        if ($token->line?->isEmpty()) {
            $this->setTokenMatched($token, TokenType::Empty);

            return true;
        }

        return false;
    }

    public function match_StepLine(Token $token): bool
    {
        $keywords = $this->currentDialect->getStepKeywords();
        foreach ($keywords as $keyword) {
            if ($token->line?->startsWith($keyword)) {
                $stepText = $token->line->getRestTrimmed(StringUtils::symbolCount($keyword));
                $this->setTokenMatched($token, TokenType::StepLine, $stepText, $keyword);

                return true;
            }
        }

        return false;
    }

    public function match_TableRow(Token $token): bool
    {
        if ($token->line?->startsWith(GherkinLanguageConstants::TABLE_CELL_SEPARATOR)) {
            $tableCells = $token->line->getTableCells();
            $this->setTokenMatched($token, TokenType::TableRow, items: $tableCells);

            return true;
        }

        return false;
    }

    public function match_Comment(Token $token): bool
    {
        if ($token->line?->startsWith(GherkinLanguageConstants::COMMENT_PREFIX)) {
            $text = $token->line->getLineText(0);
            $this->setTokenMatched($token, TokenType::Comment, $text, indent: 0);

            return true;
        }

        return false;
    }

    public function match_DocStringSeparator(Token $token): bool
    {
        return $this->activeDocStringSeparator === null
            // open
            ? $this->_match_DocStringSeparator($token, GherkinLanguageConstants::DOCSTRING_SEPARATOR, true)
            || $this->_match_DocStringSeparator($token, GherkinLanguageConstants::DOCSTRING_ALTERNATIVE_SEPARATOR, true)
            // close
            : $this->_match_DocStringSeparator($token, $this->activeDocStringSeparator, false);
    }

    private function _match_DocStringSeparator(Token $token, string $separator, bool $isOpen): bool
    {
        if ($token->line?->startsWith($separator)) {
            $mediaType = null;
            if ($isOpen) {
                $mediaType = $token->line->getRestTrimmed(StringUtils::symbolCount($separator));
                $this->activeDocStringSeparator = $separator;
                $this->indentToRemove = $token->line->indent();
            } else {
                $this->activeDocStringSeparator = null;
                $this->indentToRemove = 0;
            }
            $this->setTokenMatched($token, TokenType::DocStringSeparator, $mediaType, $separator);

            return true;
        }

        return false;
    }

    public function match_TagLine(Token $token): bool
    {
        if ($token->line?->startsWith(GherkinLanguageConstants::TAG_PREFIX)) {
            $this->setTokenMatched($token, TokenType::TagLine, items: $token->line->getTags());

            return true;
        }

        return false;
    }

    public function match_Language(Token $token): bool
    {
        if ($token->line && preg_match(self::LANGUAGE_PATTERN, $token->line->getLineText(0), $matches)) {
            /** @var array{0: non-empty-string, 1: non-empty-string} $matches */
            $language = $matches[1];

            $this->setTokenMatched($token, TokenType::Language, $language);

            $this->currentDialect = $this->dialectProvider->getDialect($language, $token->location);

            return true;
        }

        return false;
    }

    private function unescapeDocString(string $text): string
    {
        if ($this->activeDocStringSeparator === GherkinLanguageConstants::DOCSTRING_SEPARATOR) {
            return StringUtils::replace($text, ['\\"\\"\\"' => GherkinLanguageConstants::DOCSTRING_SEPARATOR]);
        }
        if ($this->activeDocStringSeparator === GherkinLanguageConstants::DOCSTRING_ALTERNATIVE_SEPARATOR) {
            return StringUtils::replace($text, ['\\`\\`\\`' => GherkinLanguageConstants::DOCSTRING_ALTERNATIVE_SEPARATOR]);
        }

        return $text;
    }
}

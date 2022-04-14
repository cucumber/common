<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

/**
 * Keeps common string operations in one place using correct unicode functions
 * (and normalises naming with other implementations)
 */
final class StringUtils
{
    private const DEFAULT_ENCODING = 'utf-8';

    // same patterns as the Java implementation
    private const WHITESPACE_PATTERN = "[ \\t\\n\\x0B\\f\\r\\x85\\xA0]+";
    private const WHITESPACE_PATTERN_NO_NEWLINE = "[ \\t\\x0B\\f\\r\\x85\\xA0]+";

    public static function symbolCount(string $string): int
    {
        return mb_strlen($string, self::DEFAULT_ENCODING);
    }

    public static function startsWith(string $string, string $subString): bool
    {
        return 0 === mb_strpos($string, $subString, encoding: self::DEFAULT_ENCODING);
    }

    public static function substring(string $string, int $start, int $length = null): string
    {
        return mb_substr($string, $start, $length ?? PHP_INT_MAX);
    }

    public static function rtrim(string $string): string
    {
        return preg_replace('/' . self::WHITESPACE_PATTERN . '$/u', '', $string);
    }

    public static function rtrimKeepNewLines(string $string): string
    {
        return preg_replace('/' . self::WHITESPACE_PATTERN_NO_NEWLINE . '$/u', '', $string);
    }

    public static function ltrim(string $string): string
    {
        return preg_replace('/^'. self::WHITESPACE_PATTERN . '/u', '', $string);
    }

    public static function ltrimKeepNewLines(string $string): string
    {
        return preg_replace('/^'. self::WHITESPACE_PATTERN_NO_NEWLINE . '/u', '', $string);
    }

    public static function trim(string $string): string
    {
        return self::rtrim(self::ltrim($string));
    }

    /** @param array<string, string> $replacements */
    public static function replace(string $string, array $replacements): string
    {
        $patterns = array_map(fn ($p) => '/' . preg_quote($p) . '/u', array_keys($replacements));

        return preg_replace($patterns, array_values($replacements), $string);
    }

    /** @return array<non-empty-string> */
    public static function symbolsList(string $lineText): array
    {
        /** @var list<non-empty-string> $symbols always for this pattern */
        $symbols = preg_split('//u', $lineText);

        // remove the first and last elements
        array_shift($symbols);
        array_pop($symbols);

        return $symbols;
    }
}

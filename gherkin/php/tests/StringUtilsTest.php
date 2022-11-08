<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class StringUtilsTest extends TestCase
{
    public const APPLE = '🍎';
    public const CUCUMBER = '🥒';
    public const BANANA = '🍌';
    public const WHITESPACE = "\u{00A0}\u{0020}\u{0009}";

    public function testSymbolCount(): void
    {
        self::assertSame(3, StringUtils::symbolCount('🥒🥒🥒'));
    }

    public function testStartsWith(): void
    {
        self::assertFalse(StringUtils::startsWith('🥒 is good', 'bar'));
        self::assertTrue(StringUtils::startsWith('🥒 is good', self::CUCUMBER));
    }

    public function testSubstring(): void
    {
        self::assertSame(self::CUCUMBER . self::CUCUMBER, StringUtils::substring(self::BANANA . self::CUCUMBER . self::CUCUMBER . self::BANANA, 1, 2));
    }

    public function testRtrim(): void
    {
        self::assertSame(self::WHITESPACE . self::CUCUMBER, StringUtils::rtrim(self::WHITESPACE . self::CUCUMBER . self::WHITESPACE));
    }

    public function testRtrimKeepNewlines(): void
    {
        self::assertSame(self::WHITESPACE . self::CUCUMBER . "\n", StringUtils::rtrimKeepNewLines(self::WHITESPACE . self::CUCUMBER . "\n". self::WHITESPACE));
    }

    public function testLtrim(): void
    {
        self::assertSame(self::CUCUMBER . self::WHITESPACE, StringUtils::ltrim(self::WHITESPACE . self::CUCUMBER . self::WHITESPACE));
    }

    public function testLtrimKeepNewlines(): void
    {
        self::assertSame("\n" . self::CUCUMBER . self::WHITESPACE, StringUtils::ltrimKeepNewLines(self::WHITESPACE . "\n" . self::CUCUMBER . self::WHITESPACE));
    }

    public function testTrim(): void
    {
        self::assertSame(self::CUCUMBER, StringUtils::trim(self::WHITESPACE . self::CUCUMBER . self::WHITESPACE));
    }

    public function testSymbolsList(): void
    {
        self::assertSame([self::APPLE,  self::CUCUMBER, self::BANANA], StringUtils::symbolsList(self::APPLE . self::CUCUMBER . self::BANANA));
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class StringGherkinLineTest extends TestCase
{
    public function testIndentIsZeroIfLineIsNotIndented(): void
    {
        $line = new StringGherkinLine('HELLOWORLD', 1);

        self::assertSame(0, $line->indent());
    }

    public function testIndentIsSameAsWhitespaceAtStartOfLine(): void
    {
        $line = new StringGherkinLine('    HELLOWORLD', 1);

        self::assertSame(4, $line->indent());
    }

    public function testItGetsLineTextWithSpecifiedIndentRemoved(): void
    {
        $line = new StringGherkinLine('    HELLOWORLD', 1);

        self::assertSame('  HELLOWORLD', $line->getLineText(2));
    }

    public function testItGetsLineTextWithNoIndentWhenCalledWithNegativeNumber(): void
    {
        $line = new StringGherkinLine('    HELLOWORLD', 1);

        self::assertSame('HELLOWORLD', $line->getLineText(-1));
    }

    public function testItGetsLineTextWithNoIndentWhenCalledWithTooBigIndent(): void
    {
        $line = new StringGherkinLine('  HELLOWORLD', 1);

        self::assertSame('HELLOWORLD', $line->getLineText(100));
    }
    public function testItDoesNotStartsWithKeywordWhenItDoesNot(): void
    {
        $line = new StringGherkinLine('Baz: bar', 1);

        self::assertFalse($line->startsWithTitleKeyword('Foo'));
    }

    public function testItStartsWithKeywordWhenItDoes(): void
    {
        $line = new StringGherkinLine('Foo: bar', 1);

        self::assertTrue($line->startsWithTitleKeyword('Foo'));
    }

    public function testItStartsWithKeywordWhenKeywordIsIndented(): void
    {
        $line = new StringGherkinLine('    Foo: bar', 1);

        self::assertTrue($line->startsWithTitleKeyword('Foo'));
    }

    public function testItGetsRestTrimmed(): void
    {
        $line = new StringGherkinLine('FOO    BAR    ', 1);

        self::assertSame('BAR', $line->getRestTrimmed(4));
    }

    public function testItIsNotEmptyIfItIsNot(): void
    {
        $line = new StringGherkinLine('FOO', 1);

        self::assertFalse($line->isEmpty());
    }

    public function testItIsEmptyIfItIs(): void
    {
        $line = new StringGherkinLine('', 1);

        self::assertTrue($line->isEmpty());
    }

    public function testItIsEmptyIfItIsWhitespace(): void
    {
        $line = new StringGherkinLine('      ', 1);

        self::assertTrue($line->isEmpty());
    }

    public function testItStartsWithString(): void
    {
        $line = new StringGherkinLine('    Foo Bar ', 1);

        self::assertTrue($line->startsWith('Foo'));
    }

    public function testItGetsNoTableCellsIfNoPipes(): void
    {
        $line = new StringGherkinLine(' this has no cells ', 1);

        self::assertSame([], $line->getTableCells());
    }

    public function testItGetsTrimmedTableCells(): void
    {
        $line = new StringGherkinLine('  | one | two | ', 1);

        self::assertEquals([
            new GherkinLineSpan(5, 'one'),
            new GherkinLineSpan(11, 'two'),
        ], $line->getTableCells());
    }

    public function testItGetsTableCellsWithoutBeforeAndAfterText(): void
    {
        $line = new StringGherkinLine('  one | two | three ', 1);

        self::assertEquals([
            new GherkinLineSpan(9, 'two'),
        ], $line->getTableCells());
    }

    public function testItGetsTableCellsWithEscapedSpecialChars(): void
    {
        $line = new StringGherkinLine('| 1\\n2 | \\\\3 | \\| | \\X | \\\\| ', 1);

        self::assertEquals([
            new GherkinLineSpan(3, "1\n2"),
            new GherkinLineSpan(10, '\\3'),
            new GherkinLineSpan(16, '|'),
            new GherkinLineSpan(21, '\\X'), // not unescaped
            new GherkinLineSpan(26, '\\'),
        ], $line->getTableCells());
    }

    public function testItGetsTags(): void
    {
        $line = new StringGherkinLine('  @foo @bar', 1);

        self::assertEquals(
            [
                new GherkinLineSpan(3, '@foo'),
                new GherkinLineSpan(8, '@bar'),
            ],
            $line->getTags(),
        );
    }

    public function testItGetsTagsIgnoringTrailingComments(): void
    {
        $line = new StringGherkinLine('  @foo @bar # a comment', 1);

        self::assertEquals(
            [
                new GherkinLineSpan(3, '@foo'),
                new GherkinLineSpan(8, '@bar'),
            ],
            $line->getTags(),
        );
    }

    public function testItGetsTagsWithoutEmptyOnes(): void
    {
        $line = new StringGherkinLine('  @foo @ @bar', 1);

        self::assertEquals(
            [
                new GherkinLineSpan(3, '@foo'),
                new GherkinLineSpan(10, '@bar'),
            ],
            $line->getTags(),
        );
    }

    public function testItThrowsWhenTagsContainWhitespace(): void
    {
        $line = new StringGherkinLine('  @foo baz @bar', 1);

        $this->expectException(ParserException::class);
        $line->getTags();
    }
}

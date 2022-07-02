<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Messages\Step\KeywordType;
use PHPUnit\Framework\TestCase;

final class TokenMatchTest extends TestCase
{
    public function testItContainsFields(): void
    {
        $match = new TokenMatch(
            TokenType::Other,
            (new GherkinDialectProvider())->getDefaultDialect(),
            1,
            'keyword',
            KeywordType::UNKNOWN,
            'text',
            [new GherkinLineSpan(1, 'foo')],
            new Location(100, 200),
        );

        self::assertSame(TokenType::Other, $match->tokenType);
        self::assertEquals((new GherkinDialectProvider())->getDefaultDialect(), $match->gherkinDialect);
        self::assertSame(1, $match->indent);
        self::assertSame('keyword', $match->keyword);
        self::assertSame(KeywordType::UNKNOWN, $match->keywordType);
        self::assertSame('text', $match->text);
        self::assertEquals([new GherkinLineSpan(1, 'foo')], $match->items);
        self::assertEquals(new Location(100, 200), $match->location);
    }
}

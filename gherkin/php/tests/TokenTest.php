<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Messages\Step\KeywordType;
use PHPUnit\Framework\TestCase;

final class TokenTest extends TestCase
{
    public function testItHasALocation(): void
    {
        $token = new Token(null, new Location(1, 2));

        $this->assertEquals(new Location(1, 2), $token->getLocation());
    }

    public function testItIsEofIfItHasNoLine(): void
    {
        $token = new Token(null, new Location(1, 2));

        self::assertTrue($token->isEof());
    }

    public function testItIsNotEofIfItHasALine(): void
    {
        $token = new Token($this->createMock(GherkinLine::class), new Location(1, 2));

        self::assertFalse($token->isEof());
    }

    public function testItsValueIsEofIfItIsEof(): void
    {
        $token = new Token(null, new Location(1, 2));

        self::assertSame('EOF', $token->getTokenValue());
    }

    public function testItsValueComesFromTheGherkinLineIfItIsNotEof(): void
    {
        $line = $this->createMock(GherkinLine::class);
        $line->method('getLineText')->with(-1)->willReturn('TOKENVALUE');

        $token1 = new Token($line, new Location(1, 2));
        $token = $token1;

        self::assertSame('TOKENVALUE', $token->getTokenValue());
    }

    public function testItPopulatesMatchFieldsWhenMatched(): void
    {
        $line = $this->createMock(GherkinLine::class);
        $line->method('getLineText')->with(-1)->willReturn('TOKENVALUE');

        $token1 = new Token($line, new Location(1, 2));
        $token = $token1;

        $token->match(
            TokenType::Other,
            (new GherkinDialectProvider())->getDefaultDialect(),
            1,
            'keyword',
            KeywordType::UNKNOWN,
            'text',
            [new GherkinLineSpan(1, 'foo')],
        );

        self::assertSame(TokenType::Other, $token->match?->tokenType);
        self::assertEquals((new GherkinDialectProvider())->getDefaultDialect(), $token->match?->gherkinDialect);
        self::assertSame(1, $token->match?->indent);
        self::assertSame('keyword', $token->match?->keyword);
        self::assertSame(KeywordType::UNKNOWN, $token->match?->keywordType);
        self::assertSame('text', $token->match?->text);
        self::assertEquals([new GherkinLineSpan(1, 'foo')], $token->match?->items);
    }

    public function testItPopulatesMatchedLocationWithIndentColumnWhenMatched(): void
    {
        $line = $this->createMock(GherkinLine::class);
        $line->method('getLineText')->with(-1)->willReturn('TOKENVALUE');

        $token1 = new Token($line, new Location(1, 100));
        $token = $token1;

        $token->match(
            TokenType::Other,
            (new GherkinDialectProvider())->getDefaultDialect(),
            1,
            'keyword',
            KeywordType::UNKNOWN,
            'text',
            [new GherkinLineSpan(1, 'foo')],
        );

        self::assertEquals(new Location(1, 2), $token->match?->location);
    }
}

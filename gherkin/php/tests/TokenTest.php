<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

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

        $token = new Token($line, new Location(1, 2));

        self::assertSame('TOKENVALUE', $token->getTokenValue());
    }
}

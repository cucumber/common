<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class StringTokenScannerTest extends TestCase
{
    public function testItFindsEofForEmptyStream(): void
    {
        $stream = '';

        $scanner = new StringTokenScanner($stream);
        $token = $scanner->read();

        self::assertTrue($token->isEof());
    }

    public function testItFindsOneTokenPerLineForPopulatedStream(): void
    {
        $contents = "FOO\nBAR\r\nBAZ\n";

        $scanner = new StringTokenScanner($contents);

        $token = $scanner->read();
        self::assertSame('FOO', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('BAR', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('BAZ', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('EOF', $token->getTokenValue());
        self::assertTrue($token->isEof());
    }

    public function testItFindsEmptyLines(): void
    {
        $contents = "FOO\n\nBAR\n";

        $scanner = new StringTokenScanner($contents);

        $token = $scanner->read();
        self::assertSame('FOO', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('BAR', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('EOF', $token->getTokenValue());
        self::assertTrue($token->isEof());
    }
}

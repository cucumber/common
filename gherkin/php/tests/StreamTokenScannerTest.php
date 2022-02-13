<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class StreamTokenScannerTest extends TestCase
{
    public function testItFindsEofForEmptyStream(): void
    {
        // empty stream
        $stream = fopen('php://memory', 'r');

        $scanner = new StreamTokenScanner($stream);
        $token = $scanner->read();

        self::assertTrue($token->isEof());
    }

    public function testItFindsOneTokenPerLineForPopulatedStream(): void
    {
        $contents = <<<DOCUMENT
        FOO
        BAR
        DOCUMENT;

        $stream = fopen('php://memory', 'rw');
        fwrite($stream, $contents);
        rewind($stream);
        $scanner = new StreamTokenScanner($stream);

        $token = $scanner->read();
        self::assertSame('FOO', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('BAR', $token->getTokenValue());

        $token = $scanner->read();
        self::assertSame('EOF', $token->getTokenValue());
        self::assertTrue($token->isEof());
    }
}

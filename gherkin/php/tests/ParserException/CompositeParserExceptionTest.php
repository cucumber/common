<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use PHPUnit\Framework\TestCase;

final class CompositeParserExceptionTest extends TestCase
{
    public function testMessageContainsAllTheChildMessages(): void
    {
        $compositeParserException = new CompositeParserException([
            new class ('Message 1', null) extends ParserException {},
            new class ('Message 2', null) extends ParserException {},
        ]);

        $message = $compositeParserException->getMessage();

        self::assertStringContainsString('Message 1', $message);
        self::assertStringContainsString('Message 2', $message);
    }
}

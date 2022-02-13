<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\GherkinLine;
use Cucumber\Gherkin\Location;
use Cucumber\Gherkin\Token;
use PHPUnit\Framework\TestCase;

final class UnexpectedTokenExceptionTest extends TestCase
{
    public function testMessageSpecifiesWhichTokenWasUnexpected(): void
    {
        $line = $this->createMock(GherkinLine::class);
        $line->method('getLineText')->willReturn('Baz');

        $exception = new UnexpectedTokenException(
            new Token($line, new Location(10, 10)),
            ['Foo', 'Bar'],
            'stateComment'
        );

        $message = "(10:10): expected: Foo,Bar, got 'Baz'";

        self::assertSame($message, $exception->getMessage());
    }
}

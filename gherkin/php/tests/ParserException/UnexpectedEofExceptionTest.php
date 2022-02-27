<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\Location;
use Cucumber\Gherkin\Token;
use PHPUnit\Framework\TestCase;

final class UnexpectedEofExceptionTest extends TestCase
{
    public function testItHasDetailedErrorMessage(): void
    {
        $exception = new UnexpectedEofException(
            new Token(null, new Location(1, 1)),
            ['ExpectedToken1', 'ExpectedToken2'],
            'StateComment',
        );

        $message = $exception->getMessage();

        $expectedMessage = '(1:1): unexpected end of file, expected: ExpectedToken1, ExpectedToken2';
        self::assertSame($expectedMessage, $message);
    }
}

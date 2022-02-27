<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\Location;
use PHPUnit\Framework\TestCase;

final class NoSuchLanguageExceptionTest extends TestCase
{
    public function testItHasSensibleMessage(): void
    {
        $exception = new NoSuchLanguageException('en', new Location(1, 2));

        self::assertSame('(1:2): Language not supported: en', $exception->getMessage());
    }
}

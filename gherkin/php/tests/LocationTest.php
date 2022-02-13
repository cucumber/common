<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class LocationText extends TestCase
{
    public function testItHasIntLineAndColumn(): void
    {
        $location = new Location(100, 200);

        self::assertSame(100, $location->getLine());
        self::assertSame(200, $location->getColumn());
    }
}

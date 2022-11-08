<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class GherkinLineSpanTest extends TestCase
{
    public function testItHasColumnAndText(): void
    {
        $span = new GherkinLineSpan(20, 'something');

        self::assertSame(20, $span->column);
        self::assertSame('something', $span->text);
    }
}

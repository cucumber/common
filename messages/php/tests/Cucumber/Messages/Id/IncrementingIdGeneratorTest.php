<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use PHPUnit\Framework\TestCase;

final class IncrementingIdGeneratorTest extends TestCase
{
    public function testItIncrementsFromZero(): void
    {
        $idGenerator = new IncrementingIdGenerator();

        self::assertSame('0', $idGenerator->newId());
        self::assertSame('1', $idGenerator->newId());
        self::assertSame('2', $idGenerator->newId());
        self::assertSame('3', $idGenerator->newId());
    }
}

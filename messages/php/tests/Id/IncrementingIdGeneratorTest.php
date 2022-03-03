<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use PHPUnit\Framework\TestCase;

final class IncrementingIdGeneratorTest extends TestCase
{
    use IdGeneratorTestTrait;

    public function setUp(): void
    {
        $this->idGenerator = new IncrementingIdGenerator();
    }

    public function testItIncrementsFromZero(): void
    {
        self::assertSame('0', $this->idGenerator->newId());
        self::assertSame('1', $this->idGenerator->newId());
        self::assertSame('2', $this->idGenerator->newId());
        self::assertSame('3', $this->idGenerator->newId());
    }
}

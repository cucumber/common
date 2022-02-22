<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use PHPUnit\Framework\TestCase;
use Ramsey\Uuid\Uuid;

final class UuidIdGeneratorTest extends TestCase
{
    use IdGeneratorTestTrait;

    public function setUp(): void
    {
        $this->idGenerator = new UuidIdGenerator();
    }

    public function testItGeneratesUuids(): void
    {
        self::assertTrue(Uuid::isValid($this->idGenerator->newId()));
    }
}

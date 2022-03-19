<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use PHPUnit\Framework\TestCase;
use Ramsey\Uuid\Rfc4122\FieldsInterface;
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
        $uuid = $this->idGenerator->newId();

        self::assertTrue(Uuid::isValid($uuid));
    }

    public function testItGeneratesV4Uuids(): void
    {
        $uuid = $this->idGenerator->newId();

        $fields = (Uuid::fromString($uuid))->getFields();

        self::assertInstanceOf(FieldsInterface::class, $fields);
        self::assertSame(4, $fields->getVersion());
    }
}

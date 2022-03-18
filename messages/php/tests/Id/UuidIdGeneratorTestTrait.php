<?php

namespace Cucumber\Messages\Id;

use Ramsey\Uuid\Rfc4122\FieldsInterface;
use Ramsey\Uuid\Uuid;

trait UuidIdGeneratorTestTrait
{
    use IdGeneratorTestTrait;

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

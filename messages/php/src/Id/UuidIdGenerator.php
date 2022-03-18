<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use Ramsey\Uuid\Uuid;

final class UuidIdGenerator implements IdGenerator
{
    public function newId(): string
    {
        // defer to ramsey/uuid if it is present
        if (class_exists(Uuid::class)) {
            return Uuid::uuid4()->toString();
        } else {
            return (new FallbackUuidGenerator())->newId();
        }
    }
}

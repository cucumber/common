<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use Ramsey\Uuid\Uuid;

final class UuidIdGenerator implements IdGenerator
{
    public function newId(): string
    {
        return Uuid::uuid4()->toString();
    }
}

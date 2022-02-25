<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

final class IncrementingIdGenerator implements IdGenerator
{
    private int $next = 0;

    public function newId(): string
    {
        return (string) $this->next++;
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

use PHPUnit\Framework\TestCase;

final class FallbackUuidGeneratorTest extends TestCase
{
    use UuidIdGeneratorTestTrait;

    public function setUp(): void
    {
        $this->idGenerator = new FallbackUuidGenerator();
    }
}

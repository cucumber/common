<?php

namespace Cucumber\Messages\Id;

trait IdGeneratorTestTrait
{
    private IdGenerator $idGenerator;

    public function testItDoesNotGenerateEmptyIds(): void
    {
        self::assertNotEquals('', $this->idGenerator->newId());
    }

    public function testItDoesNotRepeatIds(): void
    {
        $id1 = $this->idGenerator->newId();
        $id2 = $this->idGenerator->newId();

        self::assertNotEquals($id1, $id2);
    }
}

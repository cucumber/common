<?php

namespace Cucumber\Messages\Id;

interface IdGenerator
{
    public function newId(): string;
}

<?php declare(strict_types=1);

namespace Cucumber\Gherkin;

final class Token
{
    public function isEof() : bool
    {
        return true;
    }

    public function detach() : void
    {

    }
}

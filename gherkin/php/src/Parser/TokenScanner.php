<?php

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\Token;

interface TokenScanner
{
    public function read(): Token;
}

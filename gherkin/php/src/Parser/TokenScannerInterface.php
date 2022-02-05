<?php declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\Token;

interface TokenScannerInterface
{
    public function read() : Token;
}

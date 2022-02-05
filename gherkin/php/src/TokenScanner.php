<?php declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenScannerInterface;

final class TokenScanner implements TokenScannerInterface
{
    public function __construct(
        private string $body
    )
    {
    }

    public function read(): Token
    {
        return new Token();
    }
}

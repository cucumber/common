<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenScanner;

/**
 * The scanner reads a gherkin doc (typically read from a .feature file) and creates a token
 * for each line. The tokens are passed to the parser, which outputs an AST (Abstract Syntax Tree).
 *
 * If the scanner sees a # language header, it will reconfigure itself dynamically to look for
 * Gherkin keywords for the associated language. The keywords are defined in gherkin-languages.json.
 */
final class StreamTokenScanner implements TokenScanner
{
    private int $lineNumber = 0;

    /**
     * @param resource $source File handle
     */
    public function __construct(
        private readonly mixed $source
    ) {
    }

    public function read(): Token
    {
        $line = fgets($this->source);

        $location = new Location(++$this->lineNumber, 0);

        return ($line === false) ?
            new Token(null, $location) :
            new Token(new StringGherkinLine(rtrim($line, "\r\n"), $this->lineNumber), $location);
    }
}

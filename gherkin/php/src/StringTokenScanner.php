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
final class StringTokenScanner implements TokenScanner
{
    private int $lineNumber = 0;

    /** @var list<string> */
    private array $lines;

    public function __construct(string $source)
    {
        $this->lines = explode("\n", $source);
    }

    public function read(): Token
    {
        $line = array_shift($this->lines);
        $location = new Location(++$this->lineNumber, 0);

        return ($line === null || ($line === '' && count($this->lines) === 0))
            ? new Token(null, $location)
            : new Token(new StringGherkinLine(rtrim($line, "\r"), $this->lineNumber), $location);
    }
}

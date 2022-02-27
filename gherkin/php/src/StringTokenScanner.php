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
    private const FIRST_LINE_PATTERN = '/^(?<line>.*?)\\r?\\n(?<tail>.*)$/us';

    private int $lineNumber = 0;

    public function __construct(
        private string $source,
    ) {
    }

    public function read(): Token
    {
        if (preg_match(self::FIRST_LINE_PATTERN, $this->source, $matches)) {
            $line = $matches['line'];
            $this->source = $matches['tail'];
        } else { // it did not contain a line break
            $line = $this->source;
            $this->source = '';
        }

        $location = new Location(++$this->lineNumber, 0);

        return new Token(
            ($line === '' && $this->source === '') ? null : new StringGherkinLine($line, $this->lineNumber),
            $location,
        );
    }
}

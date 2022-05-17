<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\Location;
use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;

final class UnexpectedTokenException extends ParserException
{
    /**
     * @param list<string> $expectedTokenTypes
     */
    public function __construct(
        public readonly Token $receivedToken,
        public readonly array $expectedTokenTypes,
        public readonly string $stateComment,
    ) {
        $message = sprintf(
            "expected: %s, got '%s'",
            join(', ', $this->expectedTokenTypes),
            trim($this->receivedToken->getTokenValue()),
        );

        $location = ($receivedToken->location->column > 1)
            ? $receivedToken->location
            : new Location($receivedToken->location->line, (int) $receivedToken->line?->indent() + 1);

        parent::__construct($message, $location);
    }
}

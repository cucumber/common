<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;

final class UnexpectedTokenException extends ParserException
{
    public function __construct(
        public readonly Token $receivedToken,
        /**
         * @var list<string>
         */
        public readonly array $expectedTokenTypes,
        public readonly string $stateComment,
    ) {
        $message = sprintf(
            "expected: %s, got '%s'",
            join(',', $this->expectedTokenTypes),
            trim($this->receivedToken->getTokenValue()),
        );

        parent::__construct($message, $this->receivedToken->getLocation());
    }
}

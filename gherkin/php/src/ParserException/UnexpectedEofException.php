<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;

final class UnexpectedEofException extends ParserException
{
    public function __construct(
        public readonly Token $receivedToken,
        /**
         * @var non-empty-list<string>
         */
        public readonly array $expectedTokenTypes,
        public readonly string $stateComment,
    ) {
        $message = sprintf(
            "unexpected end of file, expected: %s",
            join(', ', $expectedTokenTypes),
        );

        parent::__construct($message, $receivedToken->getLocation());
    }
}

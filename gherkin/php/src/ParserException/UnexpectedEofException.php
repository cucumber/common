<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;

final class UnexpectedEofException extends ParserException
{
    /**
     * @param non-empty-list<string> $expectedTokenTypes
     */
    public function __construct(
        public readonly Token $receivedToken,
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

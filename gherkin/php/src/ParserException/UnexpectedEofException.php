<?php declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;

final class UnexpectedEofException extends ParserException
{
    public function __construct(
        public readonly Token $token,
        /**
         * @var list<string>
         */
        public readonly array $expectedTokens,
        public readonly string $stateComment,
    )
    {
    }
}

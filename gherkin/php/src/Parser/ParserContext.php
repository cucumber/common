<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;
use Cucumber\Gherkin\TokenMatcher;

final class ParserContext
{
    /**
     * @param list<Token> $tokenQueue
     * @param list<ParserException> $errors
     */
    public function __construct(
        public readonly TokenScanner $tokenScanner,
        public readonly TokenMatcher $tokenMatcher,
        public array $tokenQueue,
        public array $errors,
    ) {
    }
}

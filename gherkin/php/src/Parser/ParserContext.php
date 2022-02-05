<?php declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;
use Cucumber\Gherkin\TokenMatcher;

final class ParserContext
{
    public function __construct(
        public readonly TokenScannerInterface $tokenScanner,
        public readonly TokenMatcher $tokenMatcher,

        /**
         * @var list<Token>
         */
        public array $tokenQueue,

        /**
         * @var list<ParserException>
         */
        public array $errors,
    )
    {
    }
}

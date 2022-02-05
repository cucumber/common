<?php declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;

final class CompositeParserException extends ParserException
{
    public function __construct(
        /**
         * @var list<ParserException>
         */
        public array $errors,
    )
    {
    }
}

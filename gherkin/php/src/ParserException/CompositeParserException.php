<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Exception;

final class CompositeParserException extends ParserException
{
    public function __construct(
        /**
         * @var non-empty-list<ParserException>
         */
        public readonly array $errors,
    ) {
        $message = "Parser errors:\n" . join("\n", array_map(fn ($e) => $e->getMessage(), $errors));

        parent::__construct($message, null);
    }
}

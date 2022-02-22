<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\ParserException;
use Exception;

final class CompositeParserException extends ParserException
{
    /**
     * @param non-empty-list<ParserException> $errors
     */
    public function __construct(
        public readonly array $errors,
    ) {
        $message = "Parser errors:\n" . join("\n", array_map(fn ($e) => $e->getMessage(), $errors));

        parent::__construct($message, null);
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\ParserException;

use Cucumber\Gherkin\Location;
use Cucumber\Gherkin\ParserException;

final class NoSuchLanguageException extends ParserException
{
    public function __construct(string $language, ?Location $location)
    {
        parent::__construct('Language not supported: ' . $language, $location);
    }
}

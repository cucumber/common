<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

class ParserException extends \Exception
{
    public function __construct(string $message, ?Location $location)
    {
        $location ??= new Location(-1, -1);
        $message = sprintf("(%s:%s): %s", $location->getLine(), $location->getColumn(), $message);

        parent::__construct($message);
    }
}

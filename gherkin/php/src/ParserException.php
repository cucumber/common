<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

class ParserException extends \Exception
{
    public Location $location;

    public function __construct(string $message, ?Location $location)
    {
        $this->location = $location ?? new Location(-1, -1);
        $message = sprintf(
            "(%s:%s): %s",
            $this->location->line,
            $this->location->column,
            $message,
        );

        parent::__construct($message);
    }
}

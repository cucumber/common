<?php

declare(strict_types=1);

namespace Cucumber\Messages\Streams;

use Cucumber\Messages\Envelope;

interface StreamReader
{
    /**
     * @return iterable<Envelope>
     */
    public function envelopes(): iterable;
}

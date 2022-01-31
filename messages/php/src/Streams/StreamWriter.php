<?php

declare(strict_types=1);

namespace Cucumber\Messages\Streams;

use Cucumber\Messages\Envelope;

interface StreamWriter
{
    /**
     * @param iterable<Envelope> $envelopes
     */
    public function writeEnvelopes(iterable $envelopes): void;
}

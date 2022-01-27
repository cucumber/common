<?php

declare(strict_types=1);

namespace Cucumber\Messages\Streams\NdJson;

use Cucumber\Messages\Envelope;
use Cucumber\Messages\Streams\StreamWriter;
use Cucumber\Messages\Streams\WithFileHandleTrait;

final class NdJsonStreamWriter implements StreamWriter
{
    use WithFileHandleTrait;

    /**
     * @param iterable<Envelope> $envelopes
     */
    public function writeEnvelopes(iterable $envelopes): void
    {
        foreach ($envelopes as $envelope) {
            fputs($this->fileHandle, $envelope->asJson() . "\n");
        }
    }
}

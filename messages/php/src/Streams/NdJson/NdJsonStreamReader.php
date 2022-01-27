<?php

declare(strict_types=1);

namespace Cucumber\Messages\Streams\NdJson;

use Cucumber\Messages\Envelope;
use Cucumber\Messages\Streams\StreamReader;
use Cucumber\Messages\Streams\WithFileHandleTrait;
use Generator;

final class NdJsonStreamReader implements StreamReader
{
    use WithFileHandleTrait;

    /**
     * @return Generator<Envelope>
     */
    public function envelopes(): Generator
    {
        while (!feof($this->fileHandle) && ($line = fgets($this->fileHandle))) {
            yield Envelope::fromJson($line);
        }
    }
}

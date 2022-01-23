<?php declare(strict_types=1);

namespace Cucumber\Messages\Streams;

use Cucumber\Messages\Envelope;
use Generator;

final class NdJsonStreamReader implements StreamReader
{
    use WithFileHandleTrait;

    /**
     * @return Generator<int, Envelope>
     */
    public function envelopes() : Generator
    {
        while (!feof($this->fileHandle) && ($line = fgets($this->fileHandle))) {
            yield Envelope::fromJson($line);
        }
    }
}

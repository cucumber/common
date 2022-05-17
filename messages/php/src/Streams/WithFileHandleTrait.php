<?php

declare(strict_types=1);

namespace Cucumber\Messages\Streams;

/**
 * @internal
 */
trait WithFileHandleTrait
{
    /**
     * @param resource $fileHandle
     */
    private function __construct(
        private mixed $fileHandle,
    ) {
    }

    /**
     * @param resource $fileHandle
     */
    public static function fromFileHandle($fileHandle): self
    {
        return new self($fileHandle);
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Messages\Envelope;
use Cucumber\Messages\Source;
use Cucumber\Messages\Source\MediaType;
use Generator;

final class GherkinParser
{
    public function __construct(
        private readonly bool $predictableIds = false,
        private readonly bool $includeSource = true,
        private readonly bool $includeGherkinDocument = true,
        private readonly bool $includePickles = true,
    ) {
    }

    /**
     * @param iterable<string> $paths
     *
     * @return Generator<Envelope>
     */
    public function parse(iterable $paths): Generator
    {
        foreach ($paths as $path) {
            $source = new Source(
                $path,
                file_get_contents($path),
                MediaType::TEXT_X_CUCUMBER_GHERKIN_PLAIN
            );

            if ($this->includeSource) {
                yield new Envelope(source: $source);
            }
        }
    }
}

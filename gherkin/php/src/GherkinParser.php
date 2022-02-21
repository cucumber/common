<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Messages\Envelope;
use Cucumber\Messages\GherkinDocument;
use Cucumber\Messages\Id\IncrementingIdGenerator;
use Cucumber\Messages\Source;
use Cucumber\Messages\Source\MediaType;
use Generator;

final class GherkinParser
{
    private PickleCompiler $pickleCompiler;

    public function __construct(
        private readonly bool $predictableIds = false,
        private readonly bool $includeSource = true,
        private readonly bool $includeGherkinDocument = true,
        private readonly bool $includePickles = true,
        private readonly IdGenerator $idGenerator = new IncrementingIdGenerator(),
    ) {
        $this->pickleCompiler = new PickleCompiler($this->idGenerator);
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

            $gherkinDocument = $this->parseGherkinDocument($source);

            if ($this->includeGherkinDocument) {
                yield new Envelope(gherkinDocument: $gherkinDocument);
            }

            if ($this->includePickles) {
                foreach ($this->pickleCompiler->compile($gherkinDocument, $source->uri) as $pickle) {
                    yield new Envelope(pickle: $pickle);
                }
            }
        }
    }

    private function parseGherkinDocument(Source $source): GherkinDocument
    {
        $builder = new GherkinDocumentBuilder($source->uri, $this->idGenerator);
        $parser = new Parser($builder);

        return $parser->parse(
            $source->uri,
            new StringTokenScanner($source->data),
            new TokenMatcher()
        );
    }
}

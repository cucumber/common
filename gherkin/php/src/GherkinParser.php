<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\ParserException\CompositeParserException;
use Cucumber\Messages\Envelope;
use Cucumber\Messages\GherkinDocument;
use Cucumber\Messages\Id\IdGenerator;
use Cucumber\Messages\Id\IncrementingIdGenerator;
use Cucumber\Messages\Id\UuidIdGenerator;
use Cucumber\Messages\Location as MessageLocation;
use Cucumber\Messages\ParseError;
use Cucumber\Messages\Source;
use Cucumber\Messages\SourceReference;
use Generator;

/**
 * Parses a Gherkin document (or list of Source envelopes) and emits Cucumber Messages envelopes
 */
final class GherkinParser
{
    private readonly PickleCompiler $pickleCompiler;
    private readonly IdGenerator $idGenerator;

    /**
     * @param bool $predictableIds Ignored if IdGenerator is provided
     */
    public function __construct(
        private readonly bool $predictableIds = false,
        private readonly bool $includeSource = true,
        private readonly bool $includeGherkinDocument = true,
        private readonly bool $includePickles = true,
        ?IdGenerator $idGenerator = null,
    ) {
        $this->idGenerator = $idGenerator ?? ($this->predictableIds ? new IncrementingIdGenerator() : new UuidIdGenerator());
        $this->pickleCompiler = new PickleCompiler($this->idGenerator);
    }

    /**
     * Parse a single string of Gherkin (with its URI)
     *
     * @return Generator<Envelope>
     */
    public function parseString(string $uri, string $data): Generator
    {
        yield from $this->parse([
            new Source(uri: $uri, data: $data),
        ]);
    }

    /**
     * @param iterable<Source> $sources
     *
     * @return Generator<Envelope>
     */
    public function parse(iterable $sources): Generator
    {
        foreach ($sources as $source) {
            if (!$source instanceof Source) {
                throw new \InvalidArgumentException('Can only parse Source objects');
            }

            if ($this->includeSource) {
                yield new Envelope(source: $source);
            }

            try {
                $gherkinDocument = $this->parseGherkinDocument($source);

                if ($this->includeGherkinDocument) {
                    yield new Envelope(gherkinDocument: $gherkinDocument);
                }

                if ($this->includePickles) {
                    foreach ($this->pickleCompiler->compile($gherkinDocument, $source->uri) as $pickle) {
                        yield new Envelope(pickle: $pickle);
                    }
                }
            } catch (CompositeParserException $composite) {
                foreach ($composite->errors as $error) {
                    yield $this->createParseError($error, $source->uri);
                }
            } catch (ParserException $error) {
                yield $this->createParseError($error, $source->uri);
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
            new TokenMatcher(),
        );
    }

    private function createParseError(ParserException $error, string $uri): Envelope
    {
        $ref = new SourceReference(
            uri: $uri,
            location: new MessageLocation(
                line: $error->location->line,
                column: $error->location->column === 0 ? null : $error->location->column,
            ),
        );

        return new Envelope(parseError: new ParseError($ref, $error->getMessage()));
    }
}

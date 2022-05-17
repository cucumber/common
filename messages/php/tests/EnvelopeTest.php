<?php

use Cucumber\Messages\Envelope;
use Cucumber\Messages\Feature;
use Cucumber\Messages\GherkinDocument;
use Cucumber\Messages\Location;
use PHPUnit\Framework\TestCase;

class EnvelopeTest extends TestCase
{
    public function testItCanBeConstructedWithDefaultProperties(): void
    {
        $envelope = new Envelope();

        self::assertNull($envelope->gherkinDocument);
    }

    public function testItCanBeConstructedWithASubsetOfProperties(): void
    {
        $envelope = new Envelope(
            gherkinDocument: new GherkinDocument(
                feature: new Feature(
                    location: new Location(
                        line: 21
                    )
                )
            )
        );

        self::assertSame(
            21,
            $envelope->gherkinDocument?->feature?->location?->line
        );
    }
}

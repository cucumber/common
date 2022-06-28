<?php

use Cucumber\Messages\Envelope;
use Cucumber\Messages\Streams\NdJson\NdJsonStreamReader;
use Cucumber\Messages\Streams\NdJson\NdJsonStreamWriter;
use PHPUnit\Framework\TestCase;

class AcceptanceTest extends TestCase
{
    /** @dataProvider provideJsonLines */
    public function testAllNdJsonSurvivesDecodingThenEncoding(string $json): void
    {
        $envelope = Envelope::fromJson($json);
        $newJson = $envelope->asJson();

        self::assertJsonStringEqualsJsonString($json, $newJson);
    }

    /** @dataProvider provideNdJsonFilenames */
    public function testAllFileStreamsSurviveDecodingThenEncoding(string $filename): void
    {
        $sourceHandle = fopen($filename, 'r');
        $destHandle = fopen('php://memory', 'w');

        $reader = NdJsonStreamReader::fromFileHandle($sourceHandle);
        $writer = NdJsonStreamWriter::fromFileHandle($destHandle);

        $writer->writeEnvelopes($reader->envelopes());

        rewind($sourceHandle);
        rewind($destHandle);

        while (!feof($sourceHandle)) {
            $sourceLine = fgets($sourceHandle);
            $destLine = fgets($destHandle);

            if (!$sourceLine && !$destLine) {
                break;
            }

            self::assertJsonStringEqualsJsonString($sourceLine, $destLine);
        }

        // we exhausted source so dest should also be at end
        self::assertTrue(feof($destHandle));
    }

    /**
     * @return Generator<string, array{0: string}>
     */
    public function provideJsonLines(): Generator
    {
        foreach ($this->getSampleFiles() as $filename) {
            foreach (file($filename) ?: [] as $lineNumber => $line) {
                // key is provided for better error messages
                $key = realpath($filename) . ':' . $lineNumber;
                yield $key => [$line];
            }
        }
    }

    /**
     * @return Generator<string, array{0: string}>
     */
    public function provideNdJsonFilenames(): Generator
    {
        foreach ($this->getSampleFiles() as $filename) {
            yield $filename => [$filename];
        }
    }

    /**
     * @return list<string>
     */
    private function getSampleFiles(): array
    {
        return glob(__DIR__ . '/../../../node_modules/@cucumber/compatibility-kit/features/**/*.ndjson') ?: [];
    }
}

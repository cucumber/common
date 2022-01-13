<?php

use Cucumber\Messages\Envelope;
use PHPUnit\Framework\TestCase;

class AcceptanceTest extends TestCase
{
    /** @dataProvider provideJson */
    public function testAllNdJsonSurvivesDecodingThenEncoding(string $json) : void
    {
       $envelope = Envelope::fromJson($json);
       $newJson = $envelope->asJson();

       self::assertJsonStringEqualsJsonString($json, $newJson);
    }

    /**
     * @return Generator<string, list<string>>
     */
    public function provideJson() : Generator
    {
        $filePattern = __DIR__ . '/../../../compatibility-kit/javascript/features/**/*.ndjson';
        foreach (glob($filePattern) as $filename) {
            foreach(file($filename) ?: [] as $lineNumber => $line) {
                // key is provided for better error messages
                $key = realpath($filename) . ':' . $lineNumber;
                yield $key => [$line];
            }
        }
    }
}

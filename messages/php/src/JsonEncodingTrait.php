<?php

declare(strict_types=1);

namespace Cucumber\Messages;

use Cucumber\Messages\DecodingException\MalformedJsonException;
use Cucumber\Messages\DecodingException\UnexpectedDecodingException;
use Cucumber\Messages\DecodingException\SchemaViolationException;
use JsonSerializable;

/**
 * @internal
 *
 * @psalm-require-implements JsonSerializable
 */
trait JsonEncodingTrait
{
    /**
     * Creates this type of message from an appropriate JSON string
     *
     * @throws DecodingException
     */
    public static function fromJson(string $json): self
    {
        try {
            $data = json_decode($json, true, flags: JSON_THROW_ON_ERROR);
        } catch (\Throwable $t) {
            throw new MalformedJsonException('Provided string is not valid JSON', previous: $t);
        }

        if (!is_array($data)) {
            throw new SchemaViolationException('Provided JSON did not decode as an array');
        }

        try {
            return self::fromArray($data);
        } catch (\Throwable $t) {
            throw new UnexpectedDecodingException('Unexpected decoding error: "'.$t->getMessage().'"', previous: $t);
        }
    }

    /**
     * Serialise the message into a JSON string
     */
    public function asJson(): string
    {
        return json_encode($this, JSON_THROW_ON_ERROR);
    }

    /**
     * Ensures the JSON serialized version does not contain null fields
     *
     * @internal Use asJson()
     *
     * @see https://www.php.net/manual/en/jsonserializable.jsonserialize.php
     */
    public function jsonSerialize(): array
    {
        return array_filter(
            (array)$this,
            fn (mixed $x) => !is_null($x)
        );
    }
}

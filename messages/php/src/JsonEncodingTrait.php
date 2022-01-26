<?php declare(strict_types=1);

namespace Cucumber\Messages;

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
    public static function fromJson(string $json) : self
    {
        try {
            $data = json_decode($json, true, flags: JSON_THROW_ON_ERROR);
        }
        catch(\Throwable $t) {
            throw new UnknownDecodingException('Unknown decoding error', previous: $t);
        }

        if (!is_array($data)) {
            throw new SchemaViolationException('Provided JSON did not decode as an array');
        }

        return self::fromArray($data);
    }

    /**
     * Serialise the message into a JSON string
     */
    public function asJson() : string
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
            fn(mixed $x) => !is_null($x)
        );
    }
}

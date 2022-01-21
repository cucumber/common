<?php

namespace Cucumber\Messages;

trait JsonEncodingTrait
{
    /**
     * @throws DecodingException
     */
    public static function fromJson(string $json) : self
    {
        try {
            $data = json_decode($json, true, JSON_THROW_ON_ERROR);
        }
        catch(\Throwable $t) {
            throw new UnknownDecodingException('Unknown decoding error', previous: $t);
        }

        if (!is_array($data)) {
            throw new SchemaViolationException('Provided JSON did not decode as an array');
        }

        return self::fromArray($data);
    }

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

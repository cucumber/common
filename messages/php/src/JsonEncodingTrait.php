<?php

namespace Cucumber\Messages;

trait JsonEncodingTrait
{
    public static function fromJson(string $json) : self
    {
        $data = json_decode($json, true, JSON_THROW_ON_ERROR);
        assert(is_array($data));

        return self::fromArray($data);
    }

    public function asJson() : string
    {
        return json_encode($this);
    }

    /**
     * Ensures the JSON serialized version does not contain null fields
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

<?php

declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use JsonSerializable;
use Cucumber\Messages\DecodingException\SchemaViolationException;

/**
 * Represents the Location message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 * Points to a line and a column in a text file */
final class Location implements JsonSerializable
{
    use JsonEncodingTrait;

    public function __construct(
        public readonly int $line = 0,
        public readonly ?int $column = null,
    ) {
    }

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr): self
    {
        self::ensureLine($arr);
        self::ensureColumn($arr);

        return new self(
            (int) $arr['line'],
            isset($arr['column']) ? (int) $arr['column'] : null,
        );
    }

    /**
     * @psalm-assert array{line: string|int|bool} $arr
     */
    private static function ensureLine(array $arr): void
    {
        if (!array_key_exists('line', $arr)) {
            throw new SchemaViolationException('Property \'line\' is required but was not found');
        }
        if (array_key_exists('line', $arr) && is_array($arr['line'])) {
            throw new SchemaViolationException('Property \'line\' was array');
        }
    }

    /**
     * @psalm-assert array{column?: string|int|bool} $arr
     */
    private static function ensureColumn(array $arr): void
    {
        if (array_key_exists('column', $arr) && is_array($arr['column'])) {
            throw new SchemaViolationException('Property \'column\' was array');
        }
    }
}

<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the Location message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 * Points to a line and a column in a text file */
final class Location implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly int $line,

        public readonly ?int $column,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureLine($arr);

        return new self(
            (int) $arr['line'],
            isset($arr['column']) ? (int) $arr['column'] : null,
        );
    }

    /**
     * Check that the type of 'line' matches expectations
     *
     * @psalm-assert array{line: mixed} $arr
     */
    private static function ensureLine(array $arr): void
    {
        if (!array_key_exists('line', $arr)) {
            throw new SchemaViolationException('Property \'line\' is required but was not found');
        }
    }
}

<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the DataTable message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class DataTable implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly Location $location,

        /**
         * @param list<TableRow> $rows
         */
        public readonly array $rows,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureLocation($arr);
        self::ensureRows($arr);

        return new self(
            Location::fromArray($arr['location']),
            array_map(fn(array $member) => TableRow::fromArray($member) , $arr['rows']),
        );
    }

    /**
     * @psalm-assert array{location: array} $arr
     */
    private static function ensureLocation(array $arr): void
    {
        if (!array_key_exists('location', $arr)) {
            throw new SchemaViolationException('Property \'location\' is required but was not found');
        }
        if (array_key_exists('location', $arr) && !is_array($arr['location'])) {
            throw new SchemaViolationException('Property \'location\' was not array');
        }
    }

    /**
     * @psalm-assert array{rows: array} $arr
     */
    private static function ensureRows(array $arr): void
    {
        if (!array_key_exists('rows', $arr)) {
            throw new SchemaViolationException('Property \'rows\' is required but was not found');
        }
        if (array_key_exists('rows', $arr) && !is_array($arr['rows'])) {
            throw new SchemaViolationException('Property \'rows\' was not array');
        }
    }
}

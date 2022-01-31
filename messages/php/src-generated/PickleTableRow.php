<?php

declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use JsonSerializable;
use Cucumber\Messages\DecodingException\SchemaViolationException;

/**
 * Represents the PickleTableRow message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class PickleTableRow implements JsonSerializable
{
    use JsonEncodingTrait;

    public function __construct(
        /**
         * @param list<PickleTableCell> $cells
         */
        public readonly array $cells = [],
    ) {
    }

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr): self
    {
        self::ensureCells($arr);

        return new self(
            array_map(fn (array $member) => PickleTableCell::fromArray($member), $arr['cells']),
        );
    }

    /**
     * @psalm-assert array{cells: array} $arr
     */
    private static function ensureCells(array $arr): void
    {
        if (!array_key_exists('cells', $arr)) {
            throw new SchemaViolationException('Property \'cells\' is required but was not found');
        }
        if (array_key_exists('cells', $arr) && !is_array($arr['cells'])) {
            throw new SchemaViolationException('Property \'cells\' was not array');
        }
    }
}
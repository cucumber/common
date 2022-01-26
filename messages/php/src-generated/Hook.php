<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the Hook message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class Hook implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly string $id,

        public readonly SourceReference $sourceReference,

        public readonly ?string $tagExpression,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureId($arr);
        self::ensureSourceReference($arr);
        self::ensureTagExpression($arr);

        return new self(
            (string) $arr['id'],
            SourceReference::fromArray($arr['sourceReference']),
            isset($arr['tagExpression']) ? (string) $arr['tagExpression'] : null,
        );
    }

    /**
     * @psalm-assert array{id: string|int|bool} $arr
     */
    private static function ensureId(array $arr): void
    {
        if (!array_key_exists('id', $arr)) {
            throw new SchemaViolationException('Property \'id\' is required but was not found');
        }
        if (array_key_exists('id', $arr) && is_array($arr['id'])) {
            throw new SchemaViolationException('Property \'id\' was array');
        }
    }

    /**
     * @psalm-assert array{sourceReference: array} $arr
     */
    private static function ensureSourceReference(array $arr): void
    {
        if (!array_key_exists('sourceReference', $arr)) {
            throw new SchemaViolationException('Property \'sourceReference\' is required but was not found');
        }
        if (array_key_exists('sourceReference', $arr) && !is_array($arr['sourceReference'])) {
            throw new SchemaViolationException('Property \'sourceReference\' was not array');
        }
    }

    /**
     * @psalm-assert array{tagExpression: string|int|bool} $arr
     */
    private static function ensureTagExpression(array $arr): void
    {
        if (array_key_exists('tagExpression', $arr) && is_array($arr['tagExpression'])) {
            throw new SchemaViolationException('Property \'tagExpression\' was array');
        }
    }
}

<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the JavaMethod message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class JavaMethod implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly string $className,

        public readonly string $methodName,

        /**
         * @param list<string> $methodParameterTypes
         */
        public readonly array $methodParameterTypes,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureClassName($arr);
        self::ensureMethodName($arr);
        self::ensureMethodParameterTypes($arr);

        return new self(
            (string) $arr['className'],
            (string) $arr['methodName'],
            array_map(fn(mixed $member) => (string) $member , $arr['methodParameterTypes']),
        );
    }

    /**
     * @psalm-assert array{className: string|int|bool} $arr
     */
    private static function ensureClassName(array $arr): void
    {
        if (!array_key_exists('className', $arr)) {
            throw new SchemaViolationException('Property \'className\' is required but was not found');
        }
        if (array_key_exists('className', $arr) && is_array($arr['className'])) {
            throw new SchemaViolationException('Property \'className\' was array');
        }
    }

    /**
     * @psalm-assert array{methodName: string|int|bool} $arr
     */
    private static function ensureMethodName(array $arr): void
    {
        if (!array_key_exists('methodName', $arr)) {
            throw new SchemaViolationException('Property \'methodName\' is required but was not found');
        }
        if (array_key_exists('methodName', $arr) && is_array($arr['methodName'])) {
            throw new SchemaViolationException('Property \'methodName\' was array');
        }
    }

    /**
     * @psalm-assert array{methodParameterTypes: array} $arr
     */
    private static function ensureMethodParameterTypes(array $arr): void
    {
        if (!array_key_exists('methodParameterTypes', $arr)) {
            throw new SchemaViolationException('Property \'methodParameterTypes\' is required but was not found');
        }
        if (array_key_exists('methodParameterTypes', $arr) && !is_array($arr['methodParameterTypes'])) {
            throw new SchemaViolationException('Property \'methodParameterTypes\' was not array');
        }
    }
}

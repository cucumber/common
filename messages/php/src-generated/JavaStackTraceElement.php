<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the JavaStackTraceElement message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class JavaStackTraceElement implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly string $className,

        public readonly string $fileName,

        public readonly string $methodName,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureClassName($arr);
        self::ensureFileName($arr);
        self::ensureMethodName($arr);

        return new self(
            (string) $arr['className'],
            (string) $arr['fileName'],
            (string) $arr['methodName'],
        );
    }

    /**
     * Check that the type of 'className' matches expectations
     *
     * @psalm-assert array{className: mixed} $arr
     */
    private static function ensureClassName(array $arr): void
    {
        if (!array_key_exists('className', $arr)) {
            throw new SchemaViolationException('Property \'className\' is required but was not found');
        }
    }

    /**
     * Check that the type of 'fileName' matches expectations
     *
     * @psalm-assert array{fileName: mixed} $arr
     */
    private static function ensureFileName(array $arr): void
    {
        if (!array_key_exists('fileName', $arr)) {
            throw new SchemaViolationException('Property \'fileName\' is required but was not found');
        }
    }

    /**
     * Check that the type of 'methodName' matches expectations
     *
     * @psalm-assert array{methodName: mixed} $arr
     */
    private static function ensureMethodName(array $arr): void
    {
        if (!array_key_exists('methodName', $arr)) {
            throw new SchemaViolationException('Property \'methodName\' is required but was not found');
        }
    }
}

<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the Background message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class Background implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        /**
         * The location of the `Background` keyword
         */
        public readonly Location $location,

        public readonly string $keyword,

        public readonly string $name,

        public readonly string $description,

        /**
         * @param list<Step> $steps
         */
        public readonly array $steps,

        public readonly string $id,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureLocation($arr);
        self::ensureKeyword($arr);
        self::ensureName($arr);
        self::ensureDescription($arr);
        self::ensureSteps($arr);
        self::ensureId($arr);

        return new self(
            Location::fromArray($arr['location']),
            (string) $arr['keyword'],
            (string) $arr['name'],
            (string) $arr['description'],
            array_map(fn(array $member) => Step::fromArray($member) , $arr['steps']),
            (string) $arr['id'],
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
     * @psalm-assert array{keyword: string|int|bool} $arr
     */
    private static function ensureKeyword(array $arr): void
    {
        if (!array_key_exists('keyword', $arr)) {
            throw new SchemaViolationException('Property \'keyword\' is required but was not found');
        }
        if (array_key_exists('keyword', $arr) && is_array($arr['keyword'])) {
            throw new SchemaViolationException('Property \'keyword\' was array');
        }
    }

    /**
     * @psalm-assert array{name: string|int|bool} $arr
     */
    private static function ensureName(array $arr): void
    {
        if (!array_key_exists('name', $arr)) {
            throw new SchemaViolationException('Property \'name\' is required but was not found');
        }
        if (array_key_exists('name', $arr) && is_array($arr['name'])) {
            throw new SchemaViolationException('Property \'name\' was array');
        }
    }

    /**
     * @psalm-assert array{description: string|int|bool} $arr
     */
    private static function ensureDescription(array $arr): void
    {
        if (!array_key_exists('description', $arr)) {
            throw new SchemaViolationException('Property \'description\' is required but was not found');
        }
        if (array_key_exists('description', $arr) && is_array($arr['description'])) {
            throw new SchemaViolationException('Property \'description\' was array');
        }
    }

    /**
     * @psalm-assert array{steps: array} $arr
     */
    private static function ensureSteps(array $arr): void
    {
        if (!array_key_exists('steps', $arr)) {
            throw new SchemaViolationException('Property \'steps\' is required but was not found');
        }
        if (array_key_exists('steps', $arr) && !is_array($arr['steps'])) {
            throw new SchemaViolationException('Property \'steps\' was not array');
        }
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
}

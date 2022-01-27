<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;
use Cucumber\Messages\DecodingException\SchemaViolationException;


/**
 * Represents the Examples message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class Examples implements JsonSerializable
{
    use JsonEncodingTrait;

    public function __construct(

        /**
         * The location of the `Examples` keyword
         */
        public readonly Location $location = new Location(),

        /**
         * @param list<Tag> $tags
         */
        public readonly array $tags = [],

        public readonly string $keyword = '',

        public readonly string $name = '',

        public readonly string $description = '',

        public readonly ?TableRow $tableHeader = null,

        /**
         * @param list<TableRow> $tableBody
         */
        public readonly array $tableBody = [],

        public readonly string $id = '',

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureLocation($arr);
        self::ensureTags($arr);
        self::ensureKeyword($arr);
        self::ensureName($arr);
        self::ensureDescription($arr);
        self::ensureTableHeader($arr);
        self::ensureTableBody($arr);
        self::ensureId($arr);

        return new self(
            Location::fromArray($arr['location']),
            array_map(fn(array $member) => Tag::fromArray($member) , $arr['tags']),
            (string) $arr['keyword'],
            (string) $arr['name'],
            (string) $arr['description'],
            isset($arr['tableHeader']) ? TableRow::fromArray($arr['tableHeader']) : null,
            array_map(fn(array $member) => TableRow::fromArray($member) , $arr['tableBody']),
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
     * @psalm-assert array{tags: array} $arr
     */
    private static function ensureTags(array $arr): void
    {
        if (!array_key_exists('tags', $arr)) {
            throw new SchemaViolationException('Property \'tags\' is required but was not found');
        }
        if (array_key_exists('tags', $arr) && !is_array($arr['tags'])) {
            throw new SchemaViolationException('Property \'tags\' was not array');
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
     * @psalm-assert array{tableHeader?: array} $arr
     */
    private static function ensureTableHeader(array $arr): void
    {
        if (array_key_exists('tableHeader', $arr) && !is_array($arr['tableHeader'])) {
            throw new SchemaViolationException('Property \'tableHeader\' was not array');
        }
    }

    /**
     * @psalm-assert array{tableBody: array} $arr
     */
    private static function ensureTableBody(array $arr): void
    {
        if (!array_key_exists('tableBody', $arr)) {
            throw new SchemaViolationException('Property \'tableBody\' is required but was not found');
        }
        if (array_key_exists('tableBody', $arr) && !is_array($arr['tableBody'])) {
            throw new SchemaViolationException('Property \'tableBody\' was not array');
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

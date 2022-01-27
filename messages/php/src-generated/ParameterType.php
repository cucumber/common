<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;
use Cucumber\Messages\DecodingException\SchemaViolationException;


/**
 * Represents the ParameterType message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class ParameterType implements JsonSerializable
{
    use JsonEncodingTrait;

    public function __construct(

        /**
         * The name is unique, so we don't need an id.
         */
        public readonly string $name = '',

        /**
         * @param list<string> $regularExpressions
         */
        public readonly array $regularExpressions = [],

        public readonly bool $preferForRegularExpressionMatch = false,

        public readonly bool $useForSnippets = false,

        public readonly string $id = '',

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureName($arr);
        self::ensureRegularExpressions($arr);
        self::ensurePreferForRegularExpressionMatch($arr);
        self::ensureUseForSnippets($arr);
        self::ensureId($arr);

        return new self(
            (string) $arr['name'],
            array_map(fn(mixed $member) => (string) $member , $arr['regularExpressions']),
            (bool) $arr['preferForRegularExpressionMatch'],
            (bool) $arr['useForSnippets'],
            (string) $arr['id'],
        );
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
     * @psalm-assert array{regularExpressions: array} $arr
     */
    private static function ensureRegularExpressions(array $arr): void
    {
        if (!array_key_exists('regularExpressions', $arr)) {
            throw new SchemaViolationException('Property \'regularExpressions\' is required but was not found');
        }
        if (array_key_exists('regularExpressions', $arr) && !is_array($arr['regularExpressions'])) {
            throw new SchemaViolationException('Property \'regularExpressions\' was not array');
        }
    }

    /**
     * @psalm-assert array{preferForRegularExpressionMatch: string|int|bool} $arr
     */
    private static function ensurePreferForRegularExpressionMatch(array $arr): void
    {
        if (!array_key_exists('preferForRegularExpressionMatch', $arr)) {
            throw new SchemaViolationException('Property \'preferForRegularExpressionMatch\' is required but was not found');
        }
        if (array_key_exists('preferForRegularExpressionMatch', $arr) && is_array($arr['preferForRegularExpressionMatch'])) {
            throw new SchemaViolationException('Property \'preferForRegularExpressionMatch\' was array');
        }
    }

    /**
     * @psalm-assert array{useForSnippets: string|int|bool} $arr
     */
    private static function ensureUseForSnippets(array $arr): void
    {
        if (!array_key_exists('useForSnippets', $arr)) {
            throw new SchemaViolationException('Property \'useForSnippets\' is required but was not found');
        }
        if (array_key_exists('useForSnippets', $arr) && is_array($arr['useForSnippets'])) {
            throw new SchemaViolationException('Property \'useForSnippets\' was array');
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

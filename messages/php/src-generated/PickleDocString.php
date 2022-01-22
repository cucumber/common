<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the PickleDocString message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class PickleDocString implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly ?string $mediaType,

        public readonly string $content,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureContent($arr);

        return new self(
            isset($arr['mediaType']) ? (string) $arr['mediaType'] : null,
            (string) $arr['content'],
        );
    }

    /**
     * Check that the type of 'content' matches expectations
     *
     * @psalm-assert array{content: mixed} $arr
     */
    private static function ensureContent(array $arr): void
    {
        if (!array_key_exists('content', $arr)) {
            throw new SchemaViolationException('Property \'content\' is required but was not found');
        }
    }
}

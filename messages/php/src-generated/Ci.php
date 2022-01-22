<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the Ci message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 * CI environment */
final class Ci implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        /**
         * Name of the CI product, e.g. "Jenkins", "CircleCI" etc.
         */
        public readonly string $name,

        /**
         * Link to the build
         */
        public readonly ?string $url,

        /**
         * The build number. Some CI servers use non-numeric build numbers, which is why this is a string
         */
        public readonly ?string $buildNumber,

        public readonly ?Git $git,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureName($arr);
        self::ensureGit($arr);

        return new self(
            (string) $arr['name'],
            isset($arr['url']) ? (string) $arr['url'] : null,
            isset($arr['buildNumber']) ? (string) $arr['buildNumber'] : null,
            isset($arr['git']) ? Git::fromArray($arr['git']) : null,
        );
    }

    /**
     * Check that the type of 'name' matches expectations
     *
     * @psalm-assert array{name: mixed} $arr
     */
    private static function ensureName(array $arr): void
    {
        if (!array_key_exists('name', $arr)) {
            throw new SchemaViolationException('Property \'name\' is required but was not found');
        }
    }

    /**
     * Check that the type of 'git' matches expectations
     *
     * @psalm-assert array{git?: array} $arr
     */
    private static function ensureGit(array $arr): void
    {
        if (array_key_exists('git', $arr) && !is_array($arr['git'])) {
            throw new SchemaViolationException('Property \'git\' was not array');
        }
    }
}

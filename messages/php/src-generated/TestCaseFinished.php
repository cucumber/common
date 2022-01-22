<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the TestCaseFinished message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class TestCaseFinished implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly string $testCaseStartedId,

        public readonly Timestamp $timestamp,

        public readonly bool $willBeRetried,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureTestCaseStartedId($arr);
        self::ensureTimestamp($arr);
        self::ensureWillBeRetried($arr);

        return new self(
            (string) $arr['testCaseStartedId'],
            Timestamp::fromArray($arr['timestamp']),
            (bool) $arr['willBeRetried'],
        );
    }

    /**
     * Check that the type of 'testCaseStartedId' matches expectations
     *
     * @psalm-assert array{testCaseStartedId: mixed} $arr
     */
    private static function ensureTestCaseStartedId(array $arr): void
    {
        if (!array_key_exists('testCaseStartedId', $arr)) {
            throw new SchemaViolationException('Property \'testCaseStartedId\' is required but was not found');
        }
    }

    /**
     * Check that the type of 'timestamp' matches expectations
     *
     * @psalm-assert array{timestamp: array} $arr
     */
    private static function ensureTimestamp(array $arr): void
    {
        if (!array_key_exists('timestamp', $arr)) {
            throw new SchemaViolationException('Property \'timestamp\' is required but was not found');
        }
        if (array_key_exists('timestamp', $arr) && !is_array($arr['timestamp'])) {
            throw new SchemaViolationException('Property \'timestamp\' was not array');
        }
    }

    /**
     * Check that the type of 'willBeRetried' matches expectations
     *
     * @psalm-assert array{willBeRetried: mixed} $arr
     */
    private static function ensureWillBeRetried(array $arr): void
    {
        if (!array_key_exists('willBeRetried', $arr)) {
            throw new SchemaViolationException('Property \'willBeRetried\' is required but was not found');
        }
    }
}

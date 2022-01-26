<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the TestStepStarted message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 */
final class TestStepStarted implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        public readonly string $testCaseStartedId,

        public readonly string $testStepId,

        public readonly Timestamp $timestamp,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureTestCaseStartedId($arr);
        self::ensureTestStepId($arr);
        self::ensureTimestamp($arr);

        return new self(
            (string) $arr['testCaseStartedId'],
            (string) $arr['testStepId'],
            Timestamp::fromArray($arr['timestamp']),
        );
    }

    /**
     * @psalm-assert array{testCaseStartedId: string|int|bool} $arr
     */
    private static function ensureTestCaseStartedId(array $arr): void
    {
        if (!array_key_exists('testCaseStartedId', $arr)) {
            throw new SchemaViolationException('Property \'testCaseStartedId\' is required but was not found');
        }
        if (array_key_exists('testCaseStartedId', $arr) && is_array($arr['testCaseStartedId'])) {
            throw new SchemaViolationException('Property \'testCaseStartedId\' was array');
        }
    }

    /**
     * @psalm-assert array{testStepId: string|int|bool} $arr
     */
    private static function ensureTestStepId(array $arr): void
    {
        if (!array_key_exists('testStepId', $arr)) {
            throw new SchemaViolationException('Property \'testStepId\' is required but was not found');
        }
        if (array_key_exists('testStepId', $arr) && is_array($arr['testStepId'])) {
            throw new SchemaViolationException('Property \'testStepId\' was array');
        }
    }

    /**
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
}

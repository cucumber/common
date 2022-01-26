<?php declare(strict_types=1);

/**
 * This code was auto-generated by {this script}[https://github.com/cucumber/common/blob/main/messages/jsonschema/scripts/codegen.rb]
 */

namespace Cucumber\Messages;

use \JsonSerializable;

/**
 * Represents the Attachment message in Cucumber's message protocol
 * @see https://github.com/cucumber/common/tree/main/messages#readme
 *
 * //// Attachments (parse errors, execution errors, screenshots, links...)
 * 
 * An attachment represents any kind of data associated with a line in a
 * [Source](#io.cucumber.messages.Source) file. It can be used for:
 * 
 * * Syntax errors during parse time
 * * Screenshots captured and attached during execution
 * * Logs captured and attached during execution
 * 
 * It is not to be used for runtime errors raised/thrown during execution. This
 * is captured in `TestResult`. */
final class Attachment implements JsonSerializable
{
    use JsonEncodingTrait;

    private function __construct(

        /**
         * The body of the attachment. If `contentEncoding` is `IDENTITY`, the attachment
         * is simply the string. If it's `BASE64`, the string should be Base64 decoded to
         * obtain the attachment.
         */
        public readonly string $body,

        /**
         * Whether to interpret `body` "as-is" (IDENTITY) or if it needs to be Base64-decoded (BASE64).
         * 
         * Content encoding is *not* determined by the media type, but rather by the type
         * of the object being attached:
         * 
         * - string => IDENTITY
         * - byte array => BASE64
         * - stream => BASE64
         */
        public readonly Attachment\ContentEncoding $contentEncoding,

        /**
         * Suggested file name of the attachment. (Provided by the user as an argument to `attach`)
         */
        public readonly ?string $fileName,

        /**
         * The media type of the data. This can be any valid
         * [IANA Media Type](https://www.iana.org/assignments/media-types/media-types.xhtml)
         * as well as Cucumber-specific media types such as `text/x.cucumber.gherkin+plain`
         * and `text/x.cucumber.stacktrace+plain`
         */
        public readonly string $mediaType,

        public readonly ?Source $source,

        public readonly ?string $testCaseStartedId,

        public readonly ?string $testStepId,

        /**
         * A URL where the attachment can be retrieved. This field should not be set by Cucumber.
         * It should be set by a program that reads a message stream and does the following for
         * each Attachment message:
         * 
         * - Writes the body (after base64 decoding if necessary) to a new file.
         * - Sets `body` and `contentEncoding` to `null`
         * - Writes out the new attachment message
         * 
         * This will result in a smaller message stream, which can improve performance and
         * reduce bandwidth of message consumers. It also makes it easier to process and download attachments
         * separately from reports.
         */
        public readonly ?string $url,

    ){}

    /**
     * @throws SchemaViolationException
     *
     * @internal
     */
    public static function fromArray(array $arr) : self
    {
        self::ensureBody($arr);
        self::ensureContentEncoding($arr);
        self::ensureFileName($arr);
        self::ensureMediaType($arr);
        self::ensureSource($arr);
        self::ensureTestCaseStartedId($arr);
        self::ensureTestStepId($arr);
        self::ensureUrl($arr);

        return new self(
            (string) $arr['body'],
            Attachment\ContentEncoding::from((string) $arr['contentEncoding']),
            isset($arr['fileName']) ? (string) $arr['fileName'] : null,
            (string) $arr['mediaType'],
            isset($arr['source']) ? Source::fromArray($arr['source']) : null,
            isset($arr['testCaseStartedId']) ? (string) $arr['testCaseStartedId'] : null,
            isset($arr['testStepId']) ? (string) $arr['testStepId'] : null,
            isset($arr['url']) ? (string) $arr['url'] : null,
        );
    }

    /**
     * @psalm-assert array{body: string|int|bool} $arr
     */
    private static function ensureBody(array $arr): void
    {
        if (!array_key_exists('body', $arr)) {
            throw new SchemaViolationException('Property \'body\' is required but was not found');
        }
        if (array_key_exists('body', $arr) && is_array($arr['body'])) {
            throw new SchemaViolationException('Property \'body\' was array');
        }
    }

    /**
     * @psalm-assert array{contentEncoding: string|int|bool} $arr
     */
    private static function ensureContentEncoding(array $arr): void
    {
        if (!array_key_exists('contentEncoding', $arr)) {
            throw new SchemaViolationException('Property \'contentEncoding\' is required but was not found');
        }
        if (array_key_exists('contentEncoding', $arr) && is_array($arr['contentEncoding'])) {
            throw new SchemaViolationException('Property \'contentEncoding\' was array');
        }
    }

    /**
     * @psalm-assert array{fileName: string|int|bool} $arr
     */
    private static function ensureFileName(array $arr): void
    {
        if (array_key_exists('fileName', $arr) && is_array($arr['fileName'])) {
            throw new SchemaViolationException('Property \'fileName\' was array');
        }
    }

    /**
     * @psalm-assert array{mediaType: string|int|bool} $arr
     */
    private static function ensureMediaType(array $arr): void
    {
        if (!array_key_exists('mediaType', $arr)) {
            throw new SchemaViolationException('Property \'mediaType\' is required but was not found');
        }
        if (array_key_exists('mediaType', $arr) && is_array($arr['mediaType'])) {
            throw new SchemaViolationException('Property \'mediaType\' was array');
        }
    }

    /**
     * @psalm-assert array{source?: array} $arr
     */
    private static function ensureSource(array $arr): void
    {
        if (array_key_exists('source', $arr) && !is_array($arr['source'])) {
            throw new SchemaViolationException('Property \'source\' was not array');
        }
    }

    /**
     * @psalm-assert array{testCaseStartedId: string|int|bool} $arr
     */
    private static function ensureTestCaseStartedId(array $arr): void
    {
        if (array_key_exists('testCaseStartedId', $arr) && is_array($arr['testCaseStartedId'])) {
            throw new SchemaViolationException('Property \'testCaseStartedId\' was array');
        }
    }

    /**
     * @psalm-assert array{testStepId: string|int|bool} $arr
     */
    private static function ensureTestStepId(array $arr): void
    {
        if (array_key_exists('testStepId', $arr) && is_array($arr['testStepId'])) {
            throw new SchemaViolationException('Property \'testStepId\' was array');
        }
    }

    /**
     * @psalm-assert array{url: string|int|bool} $arr
     */
    private static function ensureUrl(array $arr): void
    {
        if (array_key_exists('url', $arr) && is_array($arr['url'])) {
            throw new SchemaViolationException('Property \'url\' was array');
        }
    }
}

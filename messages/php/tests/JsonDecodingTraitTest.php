<?php

use Cucumber\Messages\DecodingException\MalformedJsonException;
use Cucumber\Messages\JsonEncodingTrait;
use Cucumber\Messages\DecodingException\SchemaViolationException;
use Cucumber\Messages\DecodingException\UnexpectedDecodingException;
use PHPUnit\Framework\TestCase;

class JsonDecodingTraitTest extends TestCase
{
    public function testItCanDecodeSomeJsonToAnObject(): void
    {
        $obj = JsonDecodingTraitTestImpl::fromJson('[]');

        self::assertInstanceOf(JsonDecodingTraitTestImpl::class, $obj);
    }

    public function testItThrowsIfGivenInvalidJson(): void
    {
        $this->expectException(MalformedJsonException::class);

        JsonDecodingTraitTestImpl::fromJson('{');
    }

    public function testItThrowsIfGivenValidJsonThatIsNotArray(): void
    {
        $this->expectException(SchemaViolationException::class);

        JsonDecodingTraitTestImpl::fromJson('true');
    }

    public function testItRethrowsUnexpectedErrors(): void
    {
        $this->expectException(UnexpectedDecodingException::class);

        // 'oops' is hardcoded in BrokenJsonDecodingTraitTestImpl
        $this->expectExceptionMessage('Unexpected decoding error: "oops"');

        BrokenJsonDecodingTraitTestImpl::fromJson('[]');
    }
}

class JsonDecodingTraitTestImpl implements JsonSerializable
{
    use JsonEncodingTrait;

    public static function fromArray(array $arr): self
    {
        return new self();
    }
}

class BrokenJsonDecodingTraitTestImpl implements JsonSerializable
{
    use JsonEncodingTrait;

    public static function fromArray(array $arr): self
    {
        throw new RuntimeException('oops');
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use PHPUnit\Framework\TestCase;

final class TokenFormatterBuilderTest extends TestCase
{
    private TokenFormatterBuilder $tokenBuilder;

    public function setUp(): void
    {
        $this->tokenBuilder = new TokenFormatterBuilder();
    }

    public function testItOutputsNothingForNoInput(): void
    {
        self::assertSame('', $this->tokenBuilder->getResult());
    }

    public function testItOutputsSomeTokens(): void
    {
        $this->tokenBuilder->build(new Token(null, new Location(1, 0)));
        $this->tokenBuilder->build(new Token(null, new Location(1, 0)));

        self::assertSame("EOF\nEOF\n", $this->tokenBuilder->getResult());
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Generator;
use PHPUnit\Framework\TestCase;

final class RuleTypeTest extends TestCase
{
    /** @dataProvider tokenCaseProvider */
    public function testItCanCastFromTokens(TokenType $tokenType): void
    {
        self::assertInstanceOf(RuleType::class, RuleType::cast($tokenType));
    }

    /**
     * @return Generator<string,array{0:TokenType}>
     */
    public function tokenCaseProvider(): Generator
    {
        foreach (TokenType::cases() as $case) {
            yield $case->name => [$case];
        }
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;
use PHPUnit\Framework\TestCase;

final class TokenFormatterTest extends TestCase
{
    public function testItFormatsEof(): void
    {
        $formatter = new TokenFormatter();

        $token = new Token(null, new Location(1, 1));

        self::assertSame('EOF', $formatter->formatToken($token));
    }

    public function testItFormatsUnmatchedToken(): void
    {
        $formatter = new TokenFormatter();

        $token = new Token(
            new StringGherkinLine('hello', 1),
            new Location(100, 300)
        );

        self::assertSame('(100:300)://', $formatter->formatToken($token));
    }

    public function testItFormatsMatchedToken(): void
    {
        $formatter = new TokenFormatter();

        $token = new Token(
            new StringGherkinLine('hello', 1),
            new Location(100, 300)
        );
        $token->matchedType = TokenType::ScenarioLine;
        $token->matchedKeyword = 'MyScenario';
        $token->matchedText = 'Foo';
        $token->matchedItems = [
            new GherkinLineSpan(1, 'bar'),
            new GherkinLineSpan(2, 'baz'),
        ];

        self::assertSame('(100:300)ScenarioLine:MyScenario/Foo/1:bar,2:baz', $formatter->formatToken($token));
    }
}

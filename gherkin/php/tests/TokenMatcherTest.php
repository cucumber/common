<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenMatcherInterface;
use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Messages\Step\KeywordType;
use PhpCsFixer\Fixer\Operator\TernaryToElvisOperatorFixer;
use PHPUnit\Framework\TestCase;

final class TokenMatcherTest extends TestCase
{
    private TokenMatcherInterface $tokenMatcher;

    public function setUp(): void
    {
        $this->tokenMatcher = new TokenMatcher();
    }

    public function testItDoesNotMatchEofForNonEof(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_EOF($token));
        self::assertNull($token->match);
    }

    public function testItMatchesEof(): void
    {
        // null line = EOF
        $token = new Token(null, new Location(1, 1));

        self::assertTrue($this->tokenMatcher->match_EOF($token));
        self::assertSame(TokenType::EOF, $token->match?->tokenType);
    }

    public function testItDoesNotMatchFeatureLineForNonFeature(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_FeatureLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesFeatureLine(): void
    {
        $token = $this->createTokenWithContents('Feature: Feature Title');

        self::assertTrue($this->tokenMatcher->match_FeatureLine($token));
        self::assertSame(TokenType::FeatureLine, $token->match?->tokenType);
        self::assertSame('Feature', $token->match?->keyword);
        self::assertSame('Feature Title', $token->match?->text);
    }

    public function testItDoesNotMatchEmptyForNonEmpty(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Empty($token));
        self::assertNull($token->match);
    }

    public function testItDoesNotMatchBackgroundLineForNonBackground(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_BackgroundLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesBackgroundLine(): void
    {
        $token = $this->createTokenWithContents('Background: Background Title');

        self::assertTrue($this->tokenMatcher->match_BackgroundLine($token));
        self::assertSame(TokenType::BackgroundLine, $token->match?->tokenType);
        self::assertSame('Background', $token->match?->keyword);
        self::assertSame('Background Title', $token->match?->text);
    }

    public function testItDoesNotMatchScenarioLineForNonScenario(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_ScenarioLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesScenarioLine(): void
    {
        $token = $this->createTokenWithContents('Scenario: Scenario Title');

        self::assertTrue($this->tokenMatcher->match_ScenarioLine($token));
        self::assertSame(TokenType::ScenarioLine, $token->match?->tokenType);
        self::assertSame('Scenario', $token->match?->keyword);
        self::assertSame('Scenario Title', $token->match?->text);
    }

    public function testItMatchesScenarioOutLine(): void
    {
        $token = $this->createTokenWithContents('Scenario Outline: Scenario Title');

        self::assertTrue($this->tokenMatcher->match_ScenarioLine($token));
        self::assertSame(TokenType::ScenarioLine, $token->match?->tokenType);
        self::assertSame('Scenario Outline', $token->match?->keyword);
        self::assertSame('Scenario Title', $token->match?->text);
    }

    public function testItDoesNotMatchRuleLineForNonRule(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_RuleLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesRuleLine(): void
    {
        $token = $this->createTokenWithContents('Rule: Rule Title');

        self::assertTrue($this->tokenMatcher->match_RuleLine($token));
        self::assertSame(TokenType::RuleLine, $token->match?->tokenType);
        self::assertSame('Rule', $token->match?->keyword);
        self::assertSame('Rule Title', $token->match?->text);
    }

    public function testItDoesNotMatchExamplesLineForNonExamples(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_ExamplesLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesExampleLine(): void
    {
        $token = $this->createTokenWithContents('Examples: Example Title');

        self::assertTrue($this->tokenMatcher->match_ExamplesLine($token));
        self::assertSame(TokenType::ExamplesLine, $token->match?->tokenType);
        self::assertSame('Examples', $token->match?->keyword);
        self::assertSame('Example Title', $token->match?->text);
    }

    public function testItDoesNotMatchTableRowWhenFirstCharIsNotPipe(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_TableRow($token));
        self::assertNull($token->match);
    }

    public function testItMatchesTableRowWhenFirstCharIsPipe(): void
    {
        $token = $this->createTokenWithContents(' | one | two | ');

        self::assertTrue($this->tokenMatcher->match_tableRow($token));
        self::assertSame(TokenType::TableRow, $token->match?->tokenType);
        self::assertEquals([
            new GherkinLineSpan(4, 'one'),
            new GherkinLineSpan(10, 'two'),
        ], $token->match?->items);
    }

    public function testItDoesNotMatchStepWhenFirstWordIsNotKeyword(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_StepLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesStepLineWhenKeywordIsThere(): void
    {
        $token = $this->createTokenWithContents('Given I have a cucumber');

        self::assertTrue($this->tokenMatcher->match_StepLine($token));
        self::assertSame(TokenType::StepLine, $token->match?->tokenType);
        self::assertSame('Given ', $token->match?->keyword);
        self::assertSame(KeywordType::CONTEXT, $token->match?->keywordType);
        self::assertSame('I have a cucumber', $token->match?->text);
    }

    public function testItMatchesEmpty(): void
    {
        $token = $this->createTokenWithContents('   ');

        self::assertTrue($this->tokenMatcher->match_Empty($token));
        self::assertSame(TokenType::Empty, $token->match?->tokenType);
    }

    public function testItDoesNotMatchCommentWhenFirstCharIsNotHash(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Comment($token));
        self::assertNull($token->match);
    }

    public function testItMatchesCommentWithWholeString(): void
    {
        $token = $this->createTokenWithContents('  # This is a comment');

        self::assertTrue($this->tokenMatcher->match_Comment($token));
        self::assertSame(TokenType::Comment, $token->match?->tokenType);
        self::assertSame(0, $token->match?->indent);
    }

    public function testItDoesNotMatchDocstringSeparatorIfNoSeparatorIsThere(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertNull($token->match);
    }

    public function testItMatchesRegularDocstringSeparator(): void
    {
        $token = $this->createTokenWithContents('   """json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->match?->tokenType);
        self::assertSame('json', $token->match?->text);
        self::assertSame('"""', $token->match?->keyword);
    }

    public function testItMatchesAlternativeDocstringSeparator(): void
    {
        $token = $this->createTokenWithContents('   ```json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->match?->tokenType);
        self::assertSame('json', $token->match?->text);
        self::assertSame('```', $token->match?->keyword);
    }

    public function testItMatchesClosingRegularDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   """json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   """json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->match?->tokenType);
        self::assertSame('', $token->match?->text);
        self::assertSame('"""', $token->match?->keyword);
    }

    public function testItDoesNotMatchMismatchedClosingDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   ```json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   """json');

        self::assertFalse($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertNull($token->match);
    }

    public function testItMatchesClosingAlternativeDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   ```json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   ```json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->match?->tokenType);
        self::assertSame('', $token->match?->text);
        self::assertSame('```', $token->match?->keyword);
    }

    public function testItMatchesOtherPreservingIndent(): void
    {
        $token = $this->createTokenWithContents('  Arbitrary text');

        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->match?->tokenType);
        self::assertSame('  Arbitrary text', $token->match?->text);
        self::assertSame(0, $token->match?->indent);
    }

    public function testItMatchesOtherWithIndentRemovedInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    ```');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   Arbitrary text');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->match?->tokenType);
        self::assertSame('Arbitrary text', $token->match?->text);
        self::assertSame(0, $token->match?->indent);
    }

    public function testItUnescapesAlternativeDocstringSeparatorInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    ```');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('    \\`\\`\\`');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->match?->tokenType);
        self::assertSame('```', $token->match?->text);
        self::assertSame(0, $token->match?->indent);
    }

    public function testItUnescapesRegularDocstringSeparatorInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    """');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('    \\"\\"\\"');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->match?->tokenType);
        self::assertSame('"""', $token->match?->text);
        self::assertSame(0, $token->match?->indent);
    }

    public function testItDoesNotMatchTagsWhenLineDoesNotStartWithAt(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_TagLine($token));
        self::assertNull($token->match);
    }

    public function testItMatchesTagLine(): void
    {
        $token = $this->createTokenWithContents('  @foo @bar');

        self::assertTrue($this->tokenMatcher->match_TagLine($token));
        self::assertSame(TokenType::TagLine, $token->match?->tokenType);
        self::assertEquals(
            [
                new GherkinLineSpan(3, '@foo'),
                new GherkinLineSpan(8, '@bar'),
            ],
            $token->match?->items,
        );
    }

    public function testItDoesNotMatchTagsWhenLineDoesNotMatchPattern(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Language($token));
        self::assertNull($token->match);
    }

    public function testItMatchesLanguageLine(): void
    {
        $token = $this->createTokenWithContents('#language:fr');

        self::assertTrue($this->tokenMatcher->match_Language($token));
        self::assertSame(TokenType::Language, $token->match?->tokenType);
    }

    public function testItChangesDialectAfterLanguageLine(): void
    {
        $token = $this->createTokenWithContents('#language:fr');
        $this->tokenMatcher->match_Language($token);

        $token = $this->createTokenWithContents('Scénario:');
        self::assertTrue($this->tokenMatcher->match_ScenarioLine($token));
    }

    private function createTokenWithContents(string $contents): Token
    {
        return new Token(new StringGherkinLine($contents, 1), new Location(1, 1));
    }

    private function createNonMatchingToken(): Token
    {
        return $this->createTokenWithContents('HELLO WORLD');
    }
}

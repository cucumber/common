<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenMatcherInterface;
use Cucumber\Gherkin\Parser\TokenType;
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
        self::assertNull($token->matchedType);
    }

    public function testItMatchesEof(): void
    {
        // null line = EOF
        $token = new Token(null, new Location(1, 1));

        self::assertTrue($this->tokenMatcher->match_EOF($token));
        self::assertSame(TokenType::EOF, $token->matchedType);
    }

    public function testItDoesNotMatchFeatureLineForNonFeature(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_FeatureLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesFeatureLine(): void
    {
        $token = $this->createTokenWithContents('Feature: Feature Title');

        self::assertTrue($this->tokenMatcher->match_FeatureLine($token));
        self::assertSame(TokenType::FeatureLine, $token->matchedType);
        self::assertSame('Feature', $token->matchedKeyword);
        self::assertSame('Feature Title', $token->matchedText);
    }

    public function testItDoesNotMatchEmptyForNonEmpty(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Empty($token));
        self::assertNull($token->matchedType);
    }

    public function testItDoesNotMatchBackgroundLineForNonBackground(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_BackgroundLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesBackgroundLine(): void
    {
        $token = $this->createTokenWithContents('Background: Background Title');

        self::assertTrue($this->tokenMatcher->match_BackgroundLine($token));
        self::assertSame(TokenType::BackgroundLine, $token->matchedType);
        self::assertSame('Background', $token->matchedKeyword);
        self::assertSame('Background Title', $token->matchedText);
    }

    public function testItDoesNotMatchScenarioLineForNonScenario(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_ScenarioLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesScenarioLine(): void
    {
        $token = $this->createTokenWithContents('Scenario: Scenario Title');

        self::assertTrue($this->tokenMatcher->match_ScenarioLine($token));
        self::assertSame(TokenType::ScenarioLine, $token->matchedType);
        self::assertSame('Scenario', $token->matchedKeyword);
        self::assertSame('Scenario Title', $token->matchedText);
    }

    public function testItMatchesScenarioOutLine(): void
    {
        $token = $this->createTokenWithContents('Scenario Outline: Scenario Title');

        self::assertTrue($this->tokenMatcher->match_ScenarioLine($token));
        self::assertSame(TokenType::ScenarioLine, $token->matchedType);
        self::assertSame('Scenario Outline', $token->matchedKeyword);
        self::assertSame('Scenario Title', $token->matchedText);
    }

    public function testItDoesNotMatchRuleLineForNonRule(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_RuleLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesRuleLine(): void
    {
        $token = $this->createTokenWithContents('Rule: Rule Title');

        self::assertTrue($this->tokenMatcher->match_RuleLine($token));
        self::assertSame(TokenType::RuleLine, $token->matchedType);
        self::assertSame('Rule', $token->matchedKeyword);
        self::assertSame('Rule Title', $token->matchedText);
    }

    public function testItDoesNotMatchExamplesLineForNonExamples(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_ExamplesLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesExampleLine(): void
    {
        $token = $this->createTokenWithContents('Examples: Example Title');

        self::assertTrue($this->tokenMatcher->match_ExamplesLine($token));
        self::assertSame(TokenType::ExamplesLine, $token->matchedType);
        self::assertSame('Examples', $token->matchedKeyword);
        self::assertSame('Example Title', $token->matchedText);
    }

    public function testItDoesNotMatchTableRowWhenFirstCharIsNotPipe(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_TableRow($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesTableRowWhenFirstCharIsPipe(): void
    {
        $token = $this->createTokenWithContents(' | one | two | ');

        self::assertTrue($this->tokenMatcher->match_tableRow($token));
        self::assertSame(TokenType::TableRow, $token->matchedType);
        self::assertEquals([
            new GherkinLineSpan(4, 'one'),
            new GherkinLineSpan(10, 'two'),
        ], $token->matchedItems);
    }

    public function testItDoesNotMatchStepWhenFirstWordIsNotKeyword(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_StepLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesStepLineWhenKeywordIsThere(): void
    {
        $token = $this->createTokenWithContents('Given I have a cucumber');

        self::assertTrue($this->tokenMatcher->match_StepLine($token));
        self::assertSame(TokenType::StepLine, $token->matchedType);
        self::assertSame('Given ', $token->matchedKeyword);
        self::assertSame('I have a cucumber', $token->matchedText);
    }

    public function testItMatchesEmpty(): void
    {
        $token = $this->createTokenWithContents('   ');

        self::assertTrue($this->tokenMatcher->match_Empty($token));
        self::assertSame(TokenType::Empty, $token->matchedType);
    }

    public function testItDoesNotMatchCommentWhenFirstCharIsNotHash(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Comment($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesCommentWithWholeString(): void
    {
        $token = $this->createTokenWithContents('  # This is a comment');

        self::assertTrue($this->tokenMatcher->match_Comment($token));
        self::assertSame(TokenType::Comment, $token->matchedType);
        self::assertSame(0, $token->matchedIndent);
    }

    public function testItDoesNotMatchDocstringSeparatorIfNoSeparatorIsThere(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesRegularDocstringSeparator(): void
    {
        $token = $this->createTokenWithContents('   """json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->matchedType);
        self::assertSame('json', $token->matchedText);
        self::assertSame('"""', $token->matchedKeyword);
    }

    public function testItMatchesAlternativeDocstringSeparator(): void
    {
        $token = $this->createTokenWithContents('   ```json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->matchedType);
        self::assertSame('json', $token->matchedText);
        self::assertSame('```', $token->matchedKeyword);
    }

    public function testItMatchesClosingRegularDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   """json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   """json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->matchedType);
        self::assertSame(null, $token->matchedText);
        self::assertSame('"""', $token->matchedKeyword);
    }

    public function testItDoesNotMatchMismatchedClosingDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   ```json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   """json');

        self::assertFalse($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesClosingAlternativeDocstringSeparator(): void
    {
        $prevToken = $this->createTokenWithContents('   ```json');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   ```json');

        self::assertTrue($this->tokenMatcher->match_DocStringSeparator($token));
        self::assertSame(TokenType::DocStringSeparator, $token->matchedType);
        self::assertSame(null, $token->matchedText);
        self::assertSame('```', $token->matchedKeyword);
    }

    public function testItMatchesOtherPreservingIndent(): void
    {
        $token = $this->createTokenWithContents('  Arbitrary text');

        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->matchedType);
        self::assertSame('  Arbitrary text', $token->matchedText);
        self::assertSame(0, $token->matchedIndent);
    }

    public function testItMatchesOtherWithIndentRemovedInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    ```');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('   Arbitrary text');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->matchedType);
        self::assertSame('Arbitrary text', $token->matchedText);
        self::assertSame(0, $token->matchedIndent);
    }

    public function testItUnescapesAlternativeDocstringSeparatorInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    ```');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('    \\`\\`\\`');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->matchedType);
        self::assertSame('```', $token->matchedText);
        self::assertSame(0, $token->matchedIndent);
    }

    public function testItUnescapesRegularDocstringSeparatorInsideDocstring(): void
    {
        $prevToken = $this->createTokenWithContents('    """');
        $this->tokenMatcher->match_DocStringSeparator($prevToken);

        $token = $this->createTokenWithContents('    \\"\\"\\"');
        self::assertTrue($this->tokenMatcher->match_Other($token));
        self::assertSame(TokenType::Other, $token->matchedType);
        self::assertSame('"""', $token->matchedText);
        self::assertSame(0, $token->matchedIndent);
    }

    public function testItDoesNotMatchTagsWhenLineDoesNotStartWithAt(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_TagLine($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesTagLine(): void
    {
        $token = $this->createTokenWithContents('  @foo @bar');

        self::assertTrue($this->tokenMatcher->match_TagLine($token));
        self::assertSame(TokenType::TagLine, $token->matchedType);
        self::assertEquals(
            [
                new GherkinLineSpan(3, '@foo'),
                new GherkinLineSpan(8, '@bar'),
            ],
            $token->matchedItems
        );
    }

    public function testItDoesNotMatchTagsWhenLineDoesNotMatchPattern(): void
    {
        $token = $this->createNonMatchingToken();

        self::assertFalse($this->tokenMatcher->match_Language($token));
        self::assertNull($token->matchedType);
    }

    public function testItMatchesLanguageLine(): void
    {
        $token = $this->createTokenWithContents('#language:fr');

        self::assertTrue($this->tokenMatcher->match_Language($token));
        self::assertSame(TokenType::Language, $token->matchedType);
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

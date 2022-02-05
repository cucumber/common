<?php declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Token;
use Cucumber\Gherkin\Parser\TokenMatcherInterface;

final class TokenMatcher implements TokenMatcherInterface
{
    public function match_EOF(Token $token): bool
    {
        return false;
        // TODO: Implement match_EOF() method.
    }

    public function match_Empty(Token $token): bool
    {
        return false;
        // TODO: Implement match_Empty() method.
    }

    public function match_Comment(Token $token): bool
    {
        return false;
        // TODO: Implement match_Comment() method.
    }

    public function match_TagLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_TagLine() method.
    }

    public function match_FeatureLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_FeatureLine() method.
    }

    public function match_RuleLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_RuleLine() method.
    }

    public function match_BackgroundLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_BackgroundLine() method.
    }

    public function match_ScenarioLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_ScenarioLine() method.
    }

    public function match_ExamplesLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_ExamplesLine() method.
    }

    public function match_StepLine(Token $token): bool
    {
        return false;
        // TODO: Implement match_StepLine() method.
    }

    public function match_DocStringSeparator(Token $token): bool
    {
        return false;
        // TODO: Implement match_DocStringSeparator() method.
    }

    public function match_TableRow(Token $token): bool
    {
        return false;
        // TODO: Implement match_TableRow() method.
    }

    public function match_Language(Token $token): bool
    {
        return false;
        // TODO: Implement match_Language() method.
    }

    public function match_Other(Token $token): bool
    {
        return false;
        // TODO: Implement match_Other() method.
    }

    public function reset(): void
    {
        // TODO: Implement reset() method.
    }
}

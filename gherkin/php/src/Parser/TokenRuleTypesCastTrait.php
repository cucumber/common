<?php declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

trait TokenRuleTypesCastTrait
{
    public static function cast(TokenType $tokenType) : RuleType
    {
        // @@Todo this is inefficient, an explicit mapping may be better
        $ordinal = array_search($tokenType, TokenType::cases());

        return RuleType::cases()[$ordinal];
    }
}

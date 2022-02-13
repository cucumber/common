<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use SebastianBergmann\Type\LogicException;

trait TokenRuleTypesCastTrait
{
    public static function cast(TokenType $tokenType): RuleType
    {
        $ruleType = constant('Ruletype::' . $tokenType->name);

        if (!$ruleType instanceof RuleType) {
            throw new LogicException('Could not create RuleType from  TokenType::' . $tokenType->name);
        }

        return $ruleType;
    }
}

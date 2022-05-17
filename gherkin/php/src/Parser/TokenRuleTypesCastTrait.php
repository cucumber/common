<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use LogicException;

trait TokenRuleTypesCastTrait
{
    public static function cast(TokenType $tokenType): RuleType
    {
        $tokenName = $tokenType->name;

        if ($tokenName != TokenType::None->name) {
            $tokenName = '_' . $tokenName;
        }

        $ruleType = constant(RuleType::class . '::' . $tokenName);

        if (!$ruleType instanceof RuleType) {
            throw new LogicException('Could not create RuleType from TokenType::' . $tokenName);
        }

        return $ruleType;
    }
}

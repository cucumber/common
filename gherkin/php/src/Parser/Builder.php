<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\Token;

/**
 * @template T
 */
interface Builder
{
    public function build(Token $token): void;
    public function startRule(RuleType $ruleType): void;
    public function endRule(RuleType $ruleType): void;
    /**
     * @return T
     */
    public function getResult(): mixed;
    public function reset(string $uri): void;
}

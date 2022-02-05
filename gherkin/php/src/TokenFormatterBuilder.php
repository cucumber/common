<?php declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\Builder;
use Cucumber\Gherkin\Parser\RuleType;

/**
 * @implements Builder<string>
 */
final class TokenFormatterBuilder implements Builder
{
    public function build(Token $token): void
    {
        // TODO: Implement build() method.
    }

    public function startRule(RuleType $ruleType): void
    {
        // TODO: Implement startRule() method.
    }

    public function endRule(RuleType $ruleType): void
    {
        // TODO: Implement endRule() method.
    }

    public function getResult(): string
    {
        return 'true';
    }

    public function reset(string $url): void
    {
        // TODO: Implement reset() method.
    }
}

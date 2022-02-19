<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\Builder;
use Cucumber\Gherkin\Parser\RuleType;

/**
 * @implements Builder<string>
 */
final class TokenFormatterBuilder implements Builder
{
    private TokenFormatter $tokenFormatter;

    /** @var list<string> */
    private $lines = [];

    public function __construct()
    {
        $this->tokenFormatter = new TokenFormatter();
    }

    public function build(Token $token): void
    {
        $this->lines[] = $this->tokenFormatter->formatToken($token);
    }

    public function startRule(RuleType $ruleType): void
    {
    }

    public function endRule(RuleType $ruleType): void
    {
    }

    public function getResult(): string
    {
        // implode at the end is more efficient than repeated concat
        return implode("\n", [...$this->lines, '']);
    }

    public function reset(string $uri): void
    {
    }
}

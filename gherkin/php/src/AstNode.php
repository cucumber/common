<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\RuleType;
use Cucumber\Gherkin\Parser\TokenType;

final class AstNode
{
    /**
     * @var array<string, list<object|list<object>|string>>
     */
    private array $subItems = [];

    public function __construct(
        public readonly RuleType $ruleType,
    ) {
    }

    /**
     * @param object|list<object>|string $entry
     */
    public function add(RuleType $ruleType, object|array|string $entry): void
    {
        $this->subItems[$ruleType->name] ??= [];
        $this->subItems[$ruleType->name][] = $entry;
    }

    /**
     * @template T of object
     *
     * @param class-string<T> $expectedType
     *
     * @psalm-return list<T>
     */
    public function getItems(string $expectedType, RuleType $ruleType): array
    {
        $items = $this->subItems[$ruleType->name] ?? [];

        /**
         * Force the type because we trust the parser, could be validated instead
         * @var list<T> $items
         */

        return $items;
    }

    /**
     * @template S of object
     *
     * @param class-string<S> $expectedType
     * @param S|null $defaultValue
     *
     * @psalm-return ($defaultValue is null ? S|null : S )
     */
    public function getSingle(string $expectedType, RuleType $ruleType, ?object $defaultValue = null): mixed
    {
        $items = $this->getItems($expectedType, $ruleType);

        return $items[0] ?? $defaultValue;
    }

    /** needed for non-object return */
    public function getSingleUntyped(RuleType $ruleType, mixed $defaultValue = null): mixed
    {
        $items =$this->subItems[$ruleType->name] ?? [];

        /**
         * Force the type because we trust the parser, could be validated instead
         * @var list $items
         */

        return $items[0] ?? $defaultValue;
    }

    /**
     * @return list<TokenMatch>
     */
    public function getTokenMatches(TokenType $tokenType): array
    {
        $items = $this->getItems(TokenMatch::class, RuleType::cast($tokenType));

        return $items;
    }


    public function getTokenMatch(TokenType $tokenType): TokenMatch
    {
        $ruleType = RuleType::cast($tokenType);

        $item = $this->getSingle(TokenMatch::class, $ruleType);

        if (!$item) {
            throw new \LogicException('Requested token type was not in stack');
        }

        return $item;
    }
}

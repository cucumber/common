<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\RuleType;
use Cucumber\Gherkin\Parser\TokenType;
use Cucumber\Messages\Step\KeywordType;
use PHPUnit\Framework\TestCase;
use stdClass;

final class AstNodeTest extends TestCase
{
    private AstNode $astNode;

    public function setUp(): void
    {
        $this->astNode = new AstNode(RuleType::None);
    }

    public function testItHasARuletype(): void
    {
        self::assertSame(RuleType::None, $this->astNode->ruleType);
    }

    public function testGetItemsReturnsEmptyListIfNotAddedYet(): void
    {
        $items = $this->astNode->getItems(stdClass::class, RuleType::None);

        self::assertSame([], $items);
    }

    public function testGetItemsReturnsAddedItems(): void
    {
        $this->astNode->add(RuleType::None, $obj1 = new stdClass());
        $this->astNode->add(RuleType::None, $obj2 = new stdClass());

        self::assertSame([$obj1, $obj2], $this->astNode->getItems(stdClass::class, RuleType::None));
    }

    public function testItGetsDefaultResultWhenNoItemsAdded(): void
    {
        $item = $this->astNode->getSingle(stdClass::class, RuleType::None, $obj = new stdClass());

        self::assertSame($obj, $item);
    }

    public function testItGetsFirstSingleItemWhenMultipleAdded(): void
    {
        $this->astNode->add(RuleType::None, $obj1 = new stdClass());
        $this->astNode->add(RuleType::None, $obj2 = new stdClass());

        $item = $this->astNode->getSingle(stdClass::class, RuleType::None, $obj3 = new stdClass());

        self::assertSame($obj1, $item);
    }

    public function testItGetsNoTokensWhenNoneAreAdded(): void
    {
        $tokens = $this->astNode->getTokenMatches(TokenType::Empty);

        self::assertSame([], $tokens);
    }

    public function testItGetsTokensWhenTheyAreAddedByRuletype(): void
    {
        $this->astNode->add(RuleType::_Empty, $token1 = $this->getTokenMatch());
        $this->astNode->add(RuleType::_Empty, $token2 = $this->getTokenMatch());

        $tokens = $this->astNode->getTokenMatches(TokenType::Empty);

        self::assertSame([$token1, $token2], $tokens);
    }

    public function testItThrowsWhenGettingATokenThatIsNotAdded(): void
    {
        $this->expectException(\LogicException::class);

        $this->astNode->getTokenMatch(TokenType::Empty);
    }

    public function testItGetsTheFirstTokenWhenSomeAreAdded(): void
    {
        $this->astNode->add(RuleType::_Empty, $token1 = $this->getTokenMatch());
        $this->astNode->add(RuleType::_Empty, $this->getTokenMatch());

        $token = $this->astNode->getTokenMatch(TokenType::Empty);

        self::assertSame($token1, $token);
    }

    private function getTokenMatch(): TokenMatch
    {
        return new TokenMatch(TokenType::Other, (new GherkinDialectProvider())->getDefaultDialect(), 100, 'keyword', KeywordType::UNKNOWN, 'text', [], new Location(1, 1));
    }
}

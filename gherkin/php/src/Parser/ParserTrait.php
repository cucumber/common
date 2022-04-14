<?php

declare(strict_types=1);

namespace Cucumber\Gherkin\Parser;

use Cucumber\Gherkin\ParserException;
use Cucumber\Gherkin\Token;
use Cucumber\Gherkin\TokenMatcher;
use Cucumber\Gherkin\ParserException\CompositeParserException;

/**
 * Contains code for Cucumber\Gherkin\Parser that does not need to be part of code generation
 *
 * @template T
 */
trait ParserTrait
{
    /**
     * @param Builder<T> $builder
     */
    public function __construct(
        private Builder $builder,
    ) {
    }

    /**
     * @return T
     */
    public function parse(string $uri, TokenScanner $tokenScanner, TokenMatcher $tokenMatcher): mixed
    {
        $this->builder->reset($uri);
        $tokenMatcher->reset();

        $context = new ParserContext(
            $tokenScanner,
            $tokenMatcher,
            [],
            [],
        );

        $this->startRule($context, RuleType::GherkinDocument);
        $state = 0;
        do {
            $token = $this->readToken($context);
            $state = $this->matchToken($state, $token, $context);
        } while (!$token->isEof());

        $this->endRule($context, RuleType::GherkinDocument);

        if (count($context->errors) > 0) {
            throw new CompositeParserException($context->errors);
        }

        return $this->builder->getResult();
    }

    private function addError(ParserContext $context, ParserException $error): void
    {
        $newErrorMessage = $error->getMessage();
        foreach ($context->errors as $e) {
            if ($e->getMessage() == $newErrorMessage) {
                return;
            }
        }
        $context->errors[] = $error;
        if (count($context->errors) > 10) {
            throw new CompositeParserException($context->errors);
        }
    }

    /**
     * @template U
     * @param callable() : U $action
     *
     * @return U
     */
    private function handleAstError(ParserContext $context, callable $action): mixed
    {
        return $this->handleExternalError($context, $action, null);
    }

    /**
     * @template U
     * @param callable() : U $action
     * @param U $defaultValue
     *
     * @return U
     */
    private function handleExternalError(ParserContext $context, callable $action, mixed $defaultValue): mixed
    {
        try {
            return $action();
        } catch (CompositeParserException $compositeParserException) {
            foreach ($compositeParserException->errors as $error) {
                $this->addError($context, $error);
            }
        } catch (ParserException $error) {
            $this->addError($context, $error);
        }

        return $defaultValue;
    }

    private function build(ParserContext $context, Token $token): void
    {
        $this->handleAstError(
            $context,
            function () use ($token) {
                $this->builder->build($token);
            },
        );
    }

    private function startRule(ParserContext $context, RuleType $ruleType): void
    {
        $this->handleAstError(
            $context,
            function () use ($ruleType) {
                $this->builder->startRule($ruleType);
                return null;
            },
        );
    }

    private function endRule(ParserContext $context, RuleType $ruleType): void
    {
        $this->handleAstError(
            $context,
            function () use ($ruleType) {
                $this->builder->endRule($ruleType);
            },
        );
    }

    private function readToken(ParserContext $context): Token
    {
        return (count($context->tokenQueue) > 0)
            ? array_shift($context->tokenQueue)
            : $context->tokenScanner->read();
    }
}

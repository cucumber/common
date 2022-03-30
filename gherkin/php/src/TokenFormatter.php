<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

final class TokenFormatter
{
    public function formatToken(Token $token): string
    {
        if ($token->isEof()) {
            return 'EOF';
        }

        return sprintf(
            "(%s:%s)%s:%s/%s/%s",
            $token->getLocation()->line,
            $token->getLocation()->column,
            $token->match?->tokenType->name ??  '',
            $token->match?->keyword ?? '',
            $token->match?->text ?? '',
            $token->match === null ? ''
                : join(',', array_map(fn ($linespan) => $linespan->column . ':' . $linespan->text, $token->match->items)),
        );
    }
}

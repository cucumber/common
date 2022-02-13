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
            $token->getLocation()->getLine(),
            $token->getLocation()->getColumn(),
            $token->matchedType?->name ??  '',
            $token->matchedKeyword ?? '',
            $token->matchedText ?? '',
            $token->matchedItems === null ? ''
                : join(',', array_map(fn ($o) => $o->column . ':' . $o->text, $token->matchedItems))
        );
    }
}

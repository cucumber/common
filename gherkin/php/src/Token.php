<?php

declare(strict_types=1);

namespace Cucumber\Gherkin;

use Cucumber\Gherkin\Parser\TokenType;

final class Token
{
    public ?TokenType $matchedType = null;
    public ?string $matchedKeyword = null;
    public ?string $matchedText = null;
    public ?int $matchedIndent = null;

    /** @var list<GherkinLineSpan> */
    public ?array $matchedItems = null;

    public function __construct(
        public readonly ?GherkinLine $line,
        /**
         * Public because the token matcher adds indent to columns
         */
        public Location $location,
    ) {
    }

    /**
     * @psalm-assert-if-true null $this->line
     */
    public function isEof(): bool
    {
        return is_null($this->line);
    }

    public function detach(): void
    {
    }

    public function getLocation(): Location
    {
        return $this->location;
    }

    public function getTokenValue(): string
    {
        return $this->isEof() ? 'EOF' : $this->line->getLineText(-1);
    }
}

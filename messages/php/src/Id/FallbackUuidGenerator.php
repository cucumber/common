<?php

declare(strict_types=1);

namespace Cucumber\Messages\Id;

final class FallbackUuidGenerator implements IdGenerator
{
    /**
     * Inspired by
     * @see https://github.com/clue/reactphp-clickhouse
     */
    public function newId(): string
    {
        $bytes = random_bytes(16);

        /**
         * set MSBs of octet 6 to 0100... to indicate v4
         *
         * @see https://datatracker.ietf.org/doc/html/rfc4122#section-4.1.3
         */
        $bytes[6] = chr(ord($bytes[6]) & 0b0000_1111 | 0b0100_0000);

        /**
         * set MSBs of octet 8 to 10... to indicate rfc4122
         *
         * @see https://datatracker.ietf.org/doc/html/rfc4122#section-4.1.1
         */
        $bytes[8] = chr(ord($bytes[8]) & 0b00_111111 | 0b10_000000);

        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($bytes), 4));
    }
}

<?php

declare(strict_types=1);

namespace Cucumber\Messages\DecodingException;

use Cucumber\Messages\DecodingException;

/**
 * Something went wrong when decoding, but the root cause is not explicitly handled
 */
final class UnexpectedDecodingException extends DecodingException
{
}

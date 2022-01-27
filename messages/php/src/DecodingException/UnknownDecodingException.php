<?php declare(strict_types=1);

namespace Cucumber\Messages\DecodingException;

use Cucumber\Messages\DecodingException;

/**
 * Something went wrong when decoding, but it is not clear what
 */
final class UnknownDecodingException extends DecodingException
{
}

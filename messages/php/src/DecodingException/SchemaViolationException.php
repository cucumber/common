<?php

declare(strict_types=1);

namespace Cucumber\Messages\DecodingException;

use Cucumber\Messages\DecodingException;

/**
 * Indicates the message being decoded violates the schema
 */
final class SchemaViolationException extends DecodingException
{
}

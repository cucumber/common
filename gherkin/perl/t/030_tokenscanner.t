#!perl

use strict;
use warnings;

use Path::Class qw/file/;
use Test2::V0;

use Gherkin::TokenScanner;

## Test the token scanner to report empty lines correctly

my $feature = <<FEATURE;
# comment line
Feature: Testing an empty line

  Scenario: Not an empty line...
FEATURE

my $scanner = Gherkin::TokenScanner->new( \$feature );
my $linecount = 0;

my $token;

while (1) {
    $token = $scanner->read;
    last if $token->is_eof;

    $linecount++;
}

is( $linecount, 4, 'The token scanner should return exactly 4 lines' );

$feature =~ s/\n/\r\n/g;

$scanner = Gherkin::TokenScanner->new( \$feature );
$token = $scanner->read;

like $token->token_value, qr/\n$/, 'Token line ends in newline';
unlike $token->token_value, qr/\r\n$/,
    'Token scanner stripped off carriage return';


done_testing;

1;

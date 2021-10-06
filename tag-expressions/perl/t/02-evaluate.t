#!perl

use strict;
use warnings;

use Test2::V0;

use Cucumber::TagExpressions;


my @good = (
    { expr => '@a',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => !!0 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
          ] },
    { expr => 'not @a',
      tests => [ { tags => [ qw/@a/ ],    outcome => !!0 },
                 { tags => [ qw/@b/ ],    outcome => 1 },
                 { tags => [ qw/@a @b/ ], outcome => !!0 },
          ] },
    { expr => '@a and @b',
      tests => [ { tags => [ qw/@a/ ],    outcome => !!0 },
                 { tags => [ qw/@b/ ],    outcome => !!0 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
          ] },
    { expr => 'not (@a and @b)',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => 1 },
                 { tags => [ qw/@a @b/ ], outcome => !!0 },
          ] },
    { expr => '@a or @b',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => 1 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
          ] },
    { expr => 'not @a or @b',
      tests => [ { tags => [ qw/@a/ ],    outcome => !!0 },
                 { tags => [ qw/@b/ ],    outcome => 1 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
                 { tags => [ qw/@q/ ],    outcome => 1 },
          ] },
    { expr => '@a and not @b',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => !!0 },
                 { tags => [ qw/@a @b/ ], outcome => !!0 },
                 { tags => [ qw/@q/ ],    outcome => !!0 },
                 { tags => [ qw/@a @q/ ], outcome => 1 },
          ] },
    { expr => '@a or @b and @c',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => !!0 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
                 { tags => [ qw/@a @c/ ], outcome => 1 },
                 { tags => [ qw/@b @c/ ], outcome => 1 },
          ] },
    { expr => '@a and @b or not @c',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => 1 },
                 { tags => [ qw/@c/ ],    outcome => !!0 },
                 { tags => [ qw/@q/ ],    outcome => 1 },
                 { tags => [ qw/@a @b/ ], outcome => 1 },
                 { tags => [ qw/@a @c/ ], outcome => !!0 },
                 { tags => [ qw/@b @c/ ], outcome => !!0 },
          ] },
    { expr => '@a or ((@b or @c) and (@d or @e))',
      tests => [ { tags => [ qw/@a/ ],    outcome => 1 },
                 { tags => [ qw/@b/ ],    outcome => !!0 },
                 { tags => [ qw/@d/ ],    outcome => !!0 },
                 { tags => [ qw/@b @d/ ], outcome => 1 },
                 { tags => [ qw/@q/ ],    outcome => !!0 },
          ] },
    { expr => '@a\b',
      tests => [ { tags => [ qw/@a\b/ ],  outcome => 1 },
                 { tags => [ qw/@a/ ],    outcome => !!0 },
          ] },

    );

for my $ex (@good) {
    my $e;
    ok( lives {
        $e = Cucumber::TagExpressions->parse($ex->{expr});
        }, "Parsing $ex->{expr}")
        or note($@);

    for my $test ($ex->{tests}->@*) {
        my @tags = $test->{tags}->@*;
        is( $e->evaluate(@tags), $test->{outcome},
            "Expr $ex->{expr}; Tags: @tags; Outcome: $test->{outcome} " )
            or diag( "Parsed expression: " . $e->stringify );
    }
}


my %bad_syntax = (
    '@a @b'      => q{Found '@b' where operator },
    '@a not'     => q{Found 'not' where operator },
    '@a or'      => 'Unexpected end of input parsing tag expression',
    '@a not @b'  => q{Found 'not' where operator },
    '@a or ('    => 'Unexpected end of input parsing tag expression',
    '@'          => 'Tag must be longer than the at-sign',
    '@a or @'    => 'Tag must be longer than the at-sign',
    '@a and @b)' => 'Junk at end of expression',
    );

for my $expr (keys %bad_syntax) {
    like( dies { Cucumber::TagExpressions->parse($expr); },
          qr/$bad_syntax{$expr}/,
          "Parsing bad expression '$expr'" );
}


done_testing;

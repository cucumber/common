#!perl

use strict;
use warnings;

use Path::Class qw/file/;
use Test::More;

use Gherkin::Parser;
use Gherkin::TokenScanner;

# Three different ways we can pass content to the parser, try each and check
# we get the same thing back each time.

my $file = file(qw/testdata good background.feature/);
my $content = $file->slurp;
my %results;

for (
    [ filename => '' . $file ], # By filename
    [ stringref => \$content ], # By content
    [ scanner => Gherkin::TokenScanner->new( '' . $file ) ], # Object
) {
    my ( $type, $input ) = @$_;
    $results{ $type } = Gherkin::Parser->new->parse( $input );
    ok( 'true', "Parsing via $type lived" );
}

my $reference_type;
my $reference_copy;

for my $type (sort keys %results) {
    my $examine = delete $results{ $type };

    if ( $reference_copy ) {
        is_deeply( $examine, $reference_copy,
            "Result via $type matches result via $reference_type" );
    }

    $reference_type = $type;
    $reference_copy = $examine;
}

done_testing;

1;

#!perl

use strict;
use warnings;

use Test::More;
use Test::Differences;
use Test::Exception;

use Cpanel::JSON::XS;
use Path::Class qw/file dir/;
use IO::Scalar;

eval "require '" . file(qw!bin gherkin-generate-ast!) . "'";
eval "require '" . file(qw!bin gherkin-generate-pickles!) . "'";
eval "require '" . file(qw!bin gherkin-generate-tokens!) . "'";

my $ad = dir(qw!acceptance testdata!);

my @good_files = grep {m/\.feature$/} $ad->subdir('good')->children;

for my $file (@good_files) {
    for my $type (qw/tokens ast pickles/) {
        my $result = "";
        my $class  = 'App::GherkinGenerate' . ucfirst($type);
        $class->run( ( new IO::Scalar \$result ), "$file" );
        my $expected
            = file(
            $file . '.' . $type . ( $type eq 'tokens' ? '' : '.json' ) )
            ->slurp;

        # Rewrite the path to be portable on Windows. This is dramatically less
        # straight-forward than you might think.
        $expected =~ s!("\.\./testdata/.+?")!
            my $file = file(decode_json("[$1]")->[0]);
            my $parent = dir('acceptance')->subdir($file->parent->relative('../'));
            my $path = $parent->file( $file->basename );
            my $replacement = encode_json( ['' . $path] );
            $replacement =~ s/[\[\]]//g;
            $replacement;
            !eg;
        eq_or_diff( $result, $expected, "$file - $type" );
    }
}

my @bad_files = grep {m/\.feature$/} $ad->subdir('bad')->children;

for my $file (@bad_files) {
    my $result   = "";
    my $class    = 'App::GherkinGenerateAst';
    my $expected = file( $file . '.errors' )->slurp;

    dies_ok { $class->run( ( new IO::Scalar \$result ), "$file" ) }
    "$file - throws";
    eq_or_diff( "$@", $expected, "$file - correct errors" );
}

done_testing();

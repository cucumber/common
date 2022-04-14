#!perl

use Test2::V0;
use Test2::Tools::ClassicCompare qw( is_deeply );
use File::Find::Rule;
use JSON::MaybeXS;

use Cucumber::Messages;


skip_all "AUTHOR_TESTS=1 environment variable not set"
    unless $ENV{AUTHOR_TESTS};

my $json = JSON::MaybeXS->new(
    utf8 => 0, pretty => 0, indent => 0
    );



my @files =
    File::Find::Rule->file()->name( '*.ndjson' )
    ->in( '../../compatibility-kit/javascript/features/' );




for my $file (@files) {
    open my $fh, '<:encoding(UTF-8)', $file
        or die "Failed to open $file: $!";

    while (my $content = <$fh>) {
        subtest "(de)serialization of $file", sub {
            serialize( $content );
        };
    }
    close $fh
        or warn "Failed to close $file: $!";
}

done_testing;

use Data::Dumper;
sub serialize {
    my $msgtxt = shift;
    my $env = Cucumber::Messages::Envelope->from_json( $msgtxt );

    ok( $env->isa('Cucumber::Messages::Message'),
        'Message correctly deserialized' );

    my $serial = $env->to_json;
    my $parsed_msg    = $json->decode( $msgtxt );
    my $parsed_serial = $json->decode( $serial );

    is_deeply( $parsed_msg, $parsed_serial,
               'Round-tripping messages results in the same JSON structure' )
        or do {
            diag Dumper($env);
            diag $serial;
            diag $msgtxt;
    };
}

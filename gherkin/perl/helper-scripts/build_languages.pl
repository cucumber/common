#!/usr/bin/env perl
use strict;
use warnings;
use utf8;
use open ':std', ':encoding(UTF-8)';


use Cpanel::JSON::XS;

my $json = Cpanel::JSON::XS->new;

open( my $fh, '<', 'gherkin-languages.json' )
  || die "Can't open [gherkin-languages.json]";
my $input = join '', (<$fh>);
close $fh;

# Encode the language sub-key values
# e.g. what 'and', 'but', 'given', 'when' and 'name' associate with
my $langdefs = $json->decode($input);
for my $lang (values %$langdefs) {
    for my $keyword (keys %{$lang}) {
        if (ref $lang->{$keyword}) {
            $lang->{$keyword} =
                '[' .
                  join( ',', map { s/'/\\'/g; "'$_'" } @{$lang->{$keyword}} )
                  . ']';
        }
        else {
            $lang->{$keyword} =~ s/'/\\'/g;
            $lang->{$keyword} = "'$lang->{$keyword}'"
        }
    }
}

# Concatenate it all into one big hash definition
my $output =
    '$data = {' .
    join(',', map {
        my $l = $langdefs->{$_};
        ("'$_',{"
         . join( ',', map { "'$_',$l->{$_}" } sort keys %$l )
         . '}')
         } sort keys %$langdefs )
    . "};";


my $template = join '', (<DATA>);
$template =~ s/DATA/$output/;

print $template;

__DATA__
package Gherkin::Generated::Languages;

use strict;
use warnings;
use utf8;
our DATA
1;

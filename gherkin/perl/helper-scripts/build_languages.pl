#!/usr/bin/env perl
use strict;
use warnings;

use Cpanel::JSON::XS;
use Data::Dumper;

my $json = Cpanel::JSON::XS->new->utf8->space_before(0)->space_after(1)
  ->indent->canonical;

open( my $fh, '<', 'gherkin-languages.json' )
  || die "Can't open [gherkin-languages.json]";
my $input = join '', (<$fh>);
close $fh;

$Data::Dumper::Sortkeys = 1;
my $output = Data::Dumper->Dump( [ $json->decode($input) ], ['$data'] );

my $template = join '', (<DATA>);
$template =~ s/DATA/$output/;

print $template;

__DATA__
package Gherkin::Generated::Languages;

use utf8;
our DATA
1;

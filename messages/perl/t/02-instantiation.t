#!perl

use Test2::V0;
no strict 'refs';

use Cucumber::Messages;

# Go over all subpackages of the Cucumber::Messages package;
#  each subpackage should also be a Moo class, which we can instantiate.
#  Verify that each class can be instantiated without supplying arguments
#  (all required parameters have a default value; this tests the execution
#   of the subs that provide the default values)
for my $pkg ( grep { m/::$/ } keys %{ "Cucumber::Messages::" }) {
    my $class = ($pkg =~ s/::$//r);

    ok lives { "Cucumber::Messages::$class"->new() }
       or diag $@;
}


done_testing;

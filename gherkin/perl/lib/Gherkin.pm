package Gherkin;

use strict;
use warnings;

=head1 NAME

Gherkin - a parser and compiler for the Gherkin language

=head1 DESCRIPTION

A parser and compiler for the Gherkin language

=head1 OVERVIEW

This is a very light-weight port of the
L<Gherkin|https://github.com/cucumber/gherkin> project to Perl. It is an almost
line for line rewrite of the Python version, at that URL.

B<It contains no user-serviceable parts.>

If you are looking to use Cucumber and Perl, please look at
L<Test::BDD::Cucumber>.

The code is mostly written in I<baby Perl>. If you dig through the C<git>
history, you'll find a first version written using C<Moose>, with delegation,
roles, the works. It was pretty, but it was slow. There's a refactor in the
history of it then moving to C<Moo>, but that was also too slow, and you had to
know Moo (or Moose) to make sense of it, and this module will probably be
updated by the maintainers of the I<Gherkin> project, who don't even know Perl.

=head1 VERSION NUMBERS

I envisage a need to release more than one version on CPAN for each version of
the upstream Gherkin project. The first release of this module for Gherkin
version C<1.2.3> will be C<1.2.0301>, the second will be C<1.2.0302>, and so on.

=head1 DOCUMENTATION

If you're writing a tool which needs to parse Gherkin, and you already know
about the data model and ast, then the examples in C<bin/> will be interesting
to you, as will all the documentation at:
L<Gherkin|https://github.com/cucumber/gherkin>

=head1 LICENSE

Please see the included LICENSE.txt for the canonical version. In summary:

The MIT License (MIT)

Copyright (c) 2016 Peter Sergeant

This work is a derivative of work that is:
Copyright (c) 2014-2016 Cucumber Ltd, Gaspar Nagy

=cut

1;

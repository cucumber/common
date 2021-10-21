package Gherkin::Parser;

use strict;
use warnings;

use base 'Gherkin::Generated::Parser';

1;


__END__

=head1 NAME

Gherkin::Parser - Gherkin feature file parser

=head1 SYNOPSIS

  use Gherkin::Parser;

  open my $fh, '<:encoding(UTF-8)', 'my.feature'
    or die "Error opening 'my.feature': $!;
  my $content = do { local $/ = undef; <$fh> }; # slurp file content
  close $fh or warn "Error closing 'my.feature': $!";

  my $parser = Gherkin::Parser->new();
  my $document_envelope = $parser->parse( \$content );


=head1 DESCRIPTION

This module implements a Gherkin feature file parser for Perl based on the canonical
Gherkin grammar, building an AST (abstract syntax tree) from the provided input.

=head1 METHODS

=head2 new( [$ast_builder], [$token_matcher] )

Constructor. Returns a new C<Gherkin::Parser> instance. When the AST builder instance
is not provided, one with default settings will be created. The same applies to the
token matcher.

=head2 parse( $token_scanner, [$uri] )

Parses the content provided through the <$token_scanner>. Returns an
L<Envelope message|Cucumber::Messages/Cucumber::Messages::Envelope> wrapping a
L<GherkinDocument message|Cucumber::Messages/Cucumber::Messages::GherkinDocument>.

The value provided for the token scanner can be one of three cases:

=over

=item A reference to a L<Gherkin::TokenScanner> instance

=item A reference to a scalar

In this case, the parameter is assumed to reference the content to be parsed.

=item A scalar value

In this case, the parameter is assumed to be a filename. The file will
be opened for input and parsed as a feature file.

=back

The C<$uri> parameter is expected to be passed in all but the third case.

=head1 SEE ALSO

=over 8

=item * L<Gherkin>

=item * L<Gherkin::AstBuilder>

=item * L<Gherkin::Dialect>

=item * L<Gherkin::TokenMatcher>

=item * L<Gherkin::TokenScanner>

=item * L<Cucumber::Messages::GherkinDocument|Cucumber::Messages/Cucumber::Messages::GherkinDocument>

=back


=head1 LICENSE

See L<Gherkin>.

=cut

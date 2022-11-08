package Gherkin::TokenScanner;

use strict;
use warnings;

use Class::XSAccessor accessors => [qw/fh line_number/];

use Carp qw/croak/;
use Encode;

use Gherkin::Line;
use Gherkin::Token;

sub new {
    my ( $class, $path_or_str ) = @_;

    # Perl convention is that a string reference is the string itself, but that
    # a straight string is a path
    my $fh;
    if ( ref $path_or_str eq 'SCALAR' ) {
        my $bytes = Encode::encode('UTF-8', ${ $path_or_str });
        open $fh, '<:encoding(UTF-8)', \$bytes;
    } else {
        open( $fh, '<', $path_or_str )
          || croak "Can't open [$path_or_str] for reading";
        $fh->binmode(':utf8');
    }

    return bless { fh => $fh, line_number => 0 }, $class;
}

sub next_line {
    my $self = shift;

    return (undef, $self->line_number) if not defined $self->fh;

    my $line = $self->fh->getline;
    $self->line_number( $self->line_number + 1 );

    if (not defined $line) {
        $self->fh->close;
        $self->fh( undef );
    }

    return ($line, $self->line_number);
}

sub read {
    my $self = shift;
    my ($line, $line_number) = $self->next_line;

    my $location   = { line => $line_number };
    my $line_token = undef;
    if (defined $line) {
        $line =~ s/\r$//; # \n as well as \r\n are considered lines separators
        $line_token =
            Gherkin::Line->new(
                { line_text => $line, line_number => $line_number }
            );
    }
    return Gherkin::Token->new(line => $line_token, location => $location);
}

1;


__END__


=head1 NAME

Gherkin::TokenScanner - Input-line format abstraction

=head1 SYNOPSIS

  use Gherkin::TokenScanner;

  my $fn = 'my.feature';
  my $scanner = Gherkin::TokenScanner->new( $fn );


=head1 DESCRIPTION

This module implements an input-line format abstraction, returning
inputlines from the indicated source. Currently, only text files are
supported input formats, but the idea is that e.g. Excel files could
be used as input formats as well, with an abstracted definition of
"input line".

=head1 METHODS

=head2 new( $path_or_ref )

Constructor.

The parameter C<$path_or_ref> can be passed either of two types of values:

=over

=item A reference to a scalar

In this case, the parameter is assumed to reference the content to be parsed.

=item A scalar value

In this case, the parameter is assumed to be a filename. The file will
be opened for input and parsed as a feature file.

=back


=head2 read

Returns the next line (L<Gherkin::Line>) token (L<Gherkin::Token>) from
the input.

When the end of a file is reached, the file handle is closed.

=head1 SEE ALSO

=over 8

=item * L<Gherkin>

=item * L<Gherkin::Line>

=item * L<Gherkin::Parser>

=item * L<Gherkin::Token>

=back

=head1 LICENSE

See L<Gherkin>.

=cut

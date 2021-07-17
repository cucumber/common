package Gherkin::TokenScanner;

use strict;
use warnings;

use Class::XSAccessor accessors => [qw/fh line_number/];

use IO::Scalar;
use Carp qw/croak/;

use Gherkin::Line;
use Gherkin::Token;
use Gherkin::TokenMatcher;

sub new {
    my ( $class, $path_or_str ) = @_;

    # Perl convention is that a string reference is the string itself, but that
    # a straight string is a path
    my $fh;
    if ( ref $path_or_str eq 'SCALAR' ) {
        $fh = new IO::Scalar $path_or_str;
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

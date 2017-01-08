package Gherkin::TokenScanner;

use strict;
use warnings;

use Class::XSAccessor accessors => [qw/fh line_number/];

use IO::File;
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
        $fh = IO::File->new();
        $fh->open( $path_or_str, '<' )
          || croak "Can't open [$path_or_str] for reading";
        $fh->binmode(':utf8');
    }

    return bless { fh => $fh, line_number => 0 }, $class;
}

sub next_line {
    my $self = shift;
    $self->line_number( $self->line_number + 1 );
}

sub read {
    my $self = shift;
    $self->next_line();
    my $line = $self->fh->getline;
    return Gherkin::Token->new(
        line => $line
        ? (
            Gherkin::Line->new(
                { line_text => $line, line_number => $self->line_number }
            )
          )
        : undef,
        location => { line => $self->line_number }
    );
}

sub DESTROY {
    my $self = shift;
    if ( $self->fh ) {
        $self->fh->close;
    }
}

1;

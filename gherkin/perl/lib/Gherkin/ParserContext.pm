package Gherkin::ParserContext;

use strict;
use warnings;

use Class::XSAccessor accessors =>
  [ qw/token_scanner token_matcher token_queue _errors/, ];

sub new {
    my ( $class, $options ) = @_;
    $options->{'token_queue'} ||= [];
    $options->{'_errors'}     ||= [];
    bless $options, $class;
}

sub add_tokens { my $self = shift; push( @{ $self->token_queue }, @_ ); }
sub errors     { my $self = shift; return @{ $self->_errors } }
sub add_errors { my $self = shift; push( @{ $self->_errors },     @_ ); }

sub read_token {
    my ($self) = shift();
    return shift( @{ $self->token_queue } ) || $self->token_scanner->read;
}

1;

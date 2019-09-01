package Gherkin::TokenFormatterBuilder;

use strict;
use warnings;
use base 'Gherkin::AstBuilder';

sub reset {
    my $self = shift;
    $self->SUPER::reset();
    $self->{'formatted_tokens'} = [];
}

sub formatted_tokens { return $_[0]->{'formatted_tokens'} }

sub build {
    my ( $self, $token ) = @_;
    push( @{ $self->formatted_tokens }, $self->format_token($token) );
}

sub start_rule { }
sub end_rule   { }

sub get_result {
    my $self = shift;
    return $self->formatted_tokens;
}

my $c = 0;

sub format_token {
    my ( $self, $token ) = @_;
    return "EOF" if $token->is_eof;
    return sprintf(
        "(%s:%s)%s:%s/%s/%s",
        $token->location->{'line'},
        $token->location->{'column'},
        $token->matched_type,
        $token->matched_keyword || '',
        $token->matched_text    || '',
        join( ',',
            map { $_->{'column'} . ':' . $_->{'text'} }
              @{ $token->matched_items || [] } )
    );
}

1;

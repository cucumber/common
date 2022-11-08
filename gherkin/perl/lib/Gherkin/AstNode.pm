package Gherkin::AstNode;

use strict;
use warnings;

use Class::XSAccessor accessors => [ qw/rule_type/, ];

sub new {
    my ( $class, $rule_type ) = @_;
    bless { rule_type => $rule_type, _sub_items => {} }, $class;
}

sub add {
    my ( $self, $rule_type, $obj ) = @_;
    push( @{ ( $self->{'_sub_items'}->{$rule_type} ||= [] ) }, $obj );
}

sub get_single {
    my ( $self, $rule_type ) = @_;
    my $items = $self->{'_sub_items'}->{$rule_type};
    return $items unless $items;
    return $items->[0];
}

sub get_items {
    my ( $self, $rule_type ) = @_;
    return $self->{'_sub_items'}->{$rule_type} || [];
}

sub get_token {
    my ( $self, $token_type ) = @_;
    return $self->get_single($token_type);
}

sub get_tokens {
    my ( $self, $token_type ) = @_;
    return $self->{'_sub_items'}->{$token_type} || [];
}

1;

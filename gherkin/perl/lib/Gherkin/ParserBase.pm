package Gherkin::ParserBase;

use strict;
use warnings;

use Class::XSAccessor accessors =>
  [ qw/ast_builder stop_at_first_error max_errors/, ];

use Gherkin::ParserContext;
use Gherkin::Exceptions;
use Gherkin::AstBuilder;

use Gherkin::TokenMatcher;
use Gherkin::TokenScanner;

sub new {
    my ( $class, $ast_builder ) = @_;
    bless {
        ast_builder => $ast_builder || Gherkin::AstBuilder->new(),
        stop_at_first_error => 0,
        max_errors          => 10,
      },
      $class;
}

sub get_result { return $_[0]->ast_builder->get_result }

sub add_error {
    my ( $self, $context, $error ) = @_;

    $context->add_errors($error);

    my @errors = $context->errors;
    Gherkin::Exceptions::CompositeParser->throw(@errors)
      if @errors > $self->max_errors;
}

sub _start_rule {
    my ( $self, $context, $ruleType ) = @_;
    $self->_handle_ast_error( $context, start_rule => $ruleType );
}

sub _end_rule {
    my ( $self, $context, $ruleType, $additional ) = @_;
    $self->_handle_ast_error( $context, end_rule => $ruleType, $additional );
}

sub _build {
    my ( $self, $context, $token ) = @_;
    $self->_handle_ast_error( $context, build => $token );
}

sub _handle_ast_error {
    my ( $self, $context, $method_name, @args ) = @_;
    my $action = sub {
        $self->ast_builder->$method_name(@args);
    };

    $self->handle_external_error( $context, 1, $action );
}

sub handle_external_error {
    my ( $self, $context, $default_value, $action ) = @_;
    return $action->() if $self->stop_at_first_error;

    my $result = eval { $action->() };
    return $result unless $@;

    # Non-structured exceptions
    die $@ unless ref $@;

    if ( ref $@ eq 'Gherkin::Exceptions::CompositeParser' ) {
        $self->add_error( $context, $_ ) for @{ $@->errors };
        return $default_value;
    } else {
        $self->add_error( $context, $@ );
        return $default_value;
    }
}

1;

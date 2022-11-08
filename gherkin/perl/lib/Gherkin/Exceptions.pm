use strict;
use warnings;

package Gherkin::Exceptions;

use overload
    q{""}    => 'stringify',
    fallback => 1;

sub stringify { my $self  = shift; $self->message . "\n" }
sub throw     { my $class = shift; die $class->new(@_) }

# Parent of single and composite exceptions
package Gherkin::Exceptions::Parser;

use base 'Gherkin::Exceptions';

# Composite exceptions
package Gherkin::Exceptions::CompositeParser;

use base 'Gherkin::Exceptions::Parser';
use Class::XSAccessor accessors => [qw/errors/];

sub new {
    my ( $class, @errors ) = @_;
    bless { errors => \@errors }, $class;
}

sub message {
    my $self = shift;
    return join "\n",
        ( 'Parser errors:', map { $_->message } @{ $self->errors } );
}

sub throw { my $class = shift; die $class->new(@_) }

#
# Various non-composite exceptions
#
package Gherkin::Exceptions::SingleParser;

use base 'Gherkin::Exceptions::Parser';
use Class::XSAccessor accessors => [qw/location/];

sub message {
    my $self = shift;
    return sprintf( '(%i:%i): %s',
        $self->location->{'line'},
        ( $self->location->{'column'} || 0 ),
        $self->detailed_message );
}

package Gherkin::Exceptions::NoSuchLanguage;

use base 'Gherkin::Exceptions::SingleParser';
use Class::XSAccessor accessors => [qw/language location/];

sub new {
    my ( $class, $language, $location ) = @_;
    return bless { language => $language, location => $location }, $class;
}

sub detailed_message {
    my $self = shift;
    return "Language not supported: " . $self->language;
}

package Gherkin::Exceptions::AstBuilder;

use base 'Gherkin::Exceptions::SingleParser';
use Class::XSAccessor accessors => [qw/location ast_message/];

sub new {
    my ( $class, $ast_message, $location ) = @_;
    return bless { ast_message => $ast_message, location => $location },
        $class;
}

sub detailed_message {
    my $self = shift;
    return $self->ast_message;
}

package Gherkin::Exceptions::UnexpectedEOF;

use base 'Gherkin::Exceptions::SingleParser';
use Class::XSAccessor accessors => [qw/location expected_token_types/];

sub new {
    my ( $class, $received_token, $expected_token_types ) = @_;
    return bless {
        location             => $received_token->location,
        received_token       => $received_token,
        expected_token_types => $expected_token_types
    }, $class;
}

sub detailed_message {
    my $self = shift;
    return "unexpected end of file, expected: " . join ', ',
        @{ $self->expected_token_types };
}

package Gherkin::Exceptions::UnexpectedToken;

use base 'Gherkin::Exceptions::SingleParser';
use Class::XSAccessor accessors =>
    [qw/location received_token_value expected_token_types state_comment/];

sub new {
    my ( $class, $received_token, $expected_token_types, $state_comment )
        = @_;

    my $received_token_value = $received_token->token_value;
    $received_token_value =~ s/^\s+//;
    $received_token_value =~ s/\s+$//;

    my %location = %{ $received_token->location };
    $location{'column'} = $received_token->line->indent + 1
        unless defined $location{'column'};

    return bless {
        location             => \%location,
        received_token_value => $received_token_value,
        expected_token_types => $expected_token_types,
        state_comment        => $state_comment,
    }, $class;
}

sub detailed_message {
    my $self = shift;
    return sprintf(
        "expected: %s, got '%s'",
        ( join ', ', @{ $self->expected_token_types } ),
        $self->received_token_value,
    );
}

1;

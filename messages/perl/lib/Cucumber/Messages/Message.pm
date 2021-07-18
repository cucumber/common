
package Cucumber::Messages::Message;

=head1 NAME

Cucumber::Messages::Message - Base class for cucumber messages

=head1 SYNOPSIS

  use Moo;
  extends 'Cucumber::Messages::Message';

  has 'prop1';
  has 'prop2';


=head1 DESCRIPTION



=cut

use Carp qw(croak);
use JSON::MaybeXS;

use Scalar::Util qw( blessed );

use Moo;
# 'use Moo' implies 'use strict; use warnings;'

# The message classes have been inspired by the Ruby implementation, which
# existed before this Perl implementation was created.

# Perl has multiple object systems: Moo, Moose, Mouse, ...
# Moo is Perl's minimalistic object system: geared towards speed, not aimed
# at completeness. Moose (not used in this code) is the one aiming at
# completeness. Moose has type checking of attributes, Moo lacks that.
# In that respect, Ruby and Perl are very much alike. Looking at the Ruby
# code (which doesn't have type checking), I decided not to go for
# type-checking. Given the expected short-livedness of the objects
# and as a way to reduce the dependency tree for the Cucumber::Messages
# library, I decided to go for Moo instead of Moose.


my $json = JSON::MaybeXS->new(
    utf8 => 0, pretty => 0, indent => 0
    );

sub _camelize {
    my ($self, $str) = @_;

    # "abc_def_ghi -> abcDefGhi
    return ($str =~ s/(?:_(\w))/uc($1)/egr);
}

sub _snaked {
    my ($self, $str) = @_;

    # abcDefGhi -> abc_def_ghi
    return ($str =~ s/([A-Z])/lc("_$1")/egr);
}

sub _to_hash {
    my ($value, %args) = @_;

    if (my $ref = ref $value) {
        if ($ref eq 'ARRAY') {
            $args{type} //=  '';
            my $type = $args{type} =~ s/^\[\]//r;
            return [ map { _to_hash( $_, %args, type => $type ) } @$value ];
        }

        croak 'Cucumber::Messages::Message expected in message serialization; found: ' . $ref
            unless blessed( $value ) and $value->isa( 'Cucumber::Messages::Message' );

        my $types = $value->_types;
        return {
            map {
                __PACKAGE__->_camelize($_)
                    => _to_hash( $value->{$_}, %args, type => $types->{$_} )
            } keys %$value
        };
    }
    else {
        if (not $args{type} or $args{type} ne 'boolean') {
            return $value;
        }
        else {
            return $value ? JSON::MaybeXS->true : JSON::MaybeXS->false;
        }
    }
}


sub _from_hash {
    my ($value, %args) = @_;

    if (my $ref = ref $value) {
        return $value ? 1 : ''
            if $json->is_bool( $value );

        if ($ref eq 'ARRAY') {
            $args{type} //= '';
            my $type = $args{type} =~ s/^\[\]//r;
            return [ map { _from_hash( $_, %args, type => $type ) } @$value ];
        }
        use Data::Dumper;
        croak 'No type supplied to deserialize hash'
            unless $args{type};

        my $types = $args{type}->_types;
        return $args{type}->new(
            map {
                my $propname = __PACKAGE__->_snaked( $_ );
                $propname
                    => _from_hash( $value->{$_}, %args,
                                   type => $types->{$propname} )
            } keys %$value
            );
    }
    else {
        return $value;
    }
}

=head1 METHODS

=head2 to_json

=cut

sub to_json {
    my ($self, %args) = @_;

    return $json->encode( _to_hash( $self, %args ) );
}

sub from_json {
    my ($class, $msgstr ) = @_;

    my $args = $json->decode( $msgstr );
    my $rv = _from_hash( $args, type => $class );
    $rv;
}


1;

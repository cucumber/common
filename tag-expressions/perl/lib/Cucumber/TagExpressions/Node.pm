
package Cucumber::TagExpressions::Node;

=head1 NAME

Cucumber::TagExpressions::Node - Cucumber Tag expression components

=head1 SYNOPSIS

  use Cucumber::TagExpressions;

  my $expr = Cucumber::TagExpressions->parse( '@a and @b' );
  if ( $expr->evaluate( qw/x y z/ ) ) {
     say "The evaluation returned false";
  }

=head1 DESCRIPTION

This module defines the components making up the tag expressions.

=head1 METHODS

=cut

use Moo;
# 'use Moo' implies 'use strict; use warnings;'

=head2 evaluate( @tags )

Returns C<true> when the tag set specified in C<$tags> satisfies the
condition(s) of the expression, C<false> otherwise.

C<@tags> can be a list of tags to be used in the expression. It can
also be a reference to a hash with the keys being the tags and the
values being considered boolean values indicating whether the tag (key)
is considered part of the tagset (true) or not (false).

=cut

sub evaluate {
    die 'Abstract superclass; override "evaluate" method';
}


=head2 stringify

Returns a string representation of the expression node.

=cut

sub stringify { }

=head1 NODE CLASSES

=cut

package Cucumber::TagExpressions::LiteralNode {

=head2 Cucumber::TagExpressions::LiteralNode

=head3 DESCRIPTION

This node class returns C<true> if the literal tag is specified as part of
the tag-list in the expression evaluation.

=head3 ATTRIBUTES

=head4 tag

The tag to test presence for.

=cut

    use Moo;
    # 'use Moo' implies 'use strict; use warnings;'
    extends 'Cucumber::TagExpressions::Node';

    has tag => ( is => 'ro', required => 1 );

    sub evaluate {
        my ( $self, $tags ) = @_;

        return $tags->{ $self->tag };
    }

    sub stringify {
        my ( $self ) = @_;

        return $self->tag;
    }
}

package Cucumber::TagExpressions::AndNode {

=head2 Cucumber::TagExpressions::AndNode

=head3 DESCRIPTION

This node class type evaluates one or more sub-expressions ("terms") and
returns C<false> if any of the terms does. It returns C<true> if all of
the terms return C<true>.

=head3 ATTRIBUTES

=head4 terms

The sub-expressions to evaluate.

=cut

    use Moo;
    # 'use Moo' implies 'use strict; use warnings;'
    extends 'Cucumber::TagExpressions::Node';

    use List::Util qw( all );

    has terms => ( is => 'ro', required => 1 );

    sub evaluate {
        my ( $self, $tags ) = @_;

        return all { $_->evaluate( $tags ) } @{ $self->terms };
    }

    sub stringify {
        my ( $self ) = @_;

        return join('', '(and ',
                    join(' ', map { $_->stringify } @{ $self->terms } ),
                    ')');
    }
}

package Cucumber::TagExpressions::OrNode {

=head2 Cucumber::TagExpressions::OrNode

=head3 DESCRIPTION

This node class type evaluates one or more sub-expressions ("terms") and
returns C<true> if any of the terms does. It returns C<false> if all of
the terms return C<false>.

=head3 ATTRIBUTES

=head4 terms

The sub-expressions to evaluate.

=cut

    use Moo;
    # 'use Moo' implies 'use strict; use warnings;'
    extends 'Cucumber::TagExpressions::Node';

    use List::Util qw( any );

    has terms => ( is => 'ro', required => 1 );

    sub evaluate {
        my ( $self, $tags ) = @_;

        return any { $_->evaluate( $tags ) } @{ $self->terms };
    }

    sub stringify {
        my ( $self ) = @_;

        return join('', '(or ',
                    join(' ', map {$_->stringify} @{ $self->terms } ),
                    ')');
    }
}

package Cucumber::TagExpressions::NotNode {

=head2 Cucumber::TagExpressions::NotNode

=head3 DESCRIPTION

This class wraps one of the other node class types, negating its
result on evaluation.

=head3 ATTRIBUTES

=head4 expression

The wrapped node class instance for which to negate the result.

=cut

    use Moo;
    # 'use Moo' implies 'use strict; use warnings;'
    extends 'Cucumber::TagExpressions::Node';

    has expression => ( is => 'ro', required => 1 );

    sub evaluate {
        my ( $self, $tags ) = @_;

        return not $self->expression->evaluate( $tags );
    }

    sub stringify {
        my ( $self ) = @_;

        return '(not ' . $self->expression->stringify . ')';
    }
}

package Cucumber::TagExpressions::ExpressionNode {

=head2 Cucumber::TagExpressions::ExpressionNode

=head3 DESCRIPTION

This class models the outer-most node in the tag expression; it wraps all
other nodes and is the entry-point for tag expression evaluation.

=head3 ATTRIBUTES

=head4 sub_expression

An instance of one of the other node class types.

=cut

    use Moo;
    # 'use Moo' implies 'use strict; use warnings;'
    extends 'Cucumber::TagExpressions::Node';

    has sub_expression => ( is => 'ro', required => 1 );

    sub evaluate {
        my ( $self, @tags ) = @_;
        my $tags = (ref $tags[0] and ref $tags[0] eq 'HASH') ? $tags[0]
            : { map { $_ => 1 } @tags };

        return not not $self->sub_expression->evaluate( $tags );
    }

    sub stringify {
        my ( $self ) = @_;

        return $self->sub_expression->stringify;
    }
}


1;

__END__

=head1 LICENSE

Please see the included LICENSE for the canonical version. In summary:

The MIT License (MIT)

  Copyright (c) 2021 Erik Huelsmann
  Copyright (c) 2021 Cucumber Ltd

This work is loosely derived from prior work of the same library for Ruby,
called C<cucumber-messages>.

=cut


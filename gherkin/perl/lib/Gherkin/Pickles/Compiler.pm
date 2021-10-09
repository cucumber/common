package Gherkin::Pickles::Compiler;

use strict;
use warnings;
use Scalar::Util qw(reftype);

use Cucumber::Messages;

sub compile {
    my ( $class, $envelope, $id_generator, $pickle_sink ) = @_;
    my @pickles;
    $pickle_sink ||= sub { push @pickles, $_[0] };

    my $document = $envelope->gherkin_document;
    my $feature  = $document->feature;

    return [] if not defined $feature;

    my $language         = $feature->language;
    my $feature_tags     = $feature->tags;
    my $background_steps = [];

    for my $child ( @{ $feature->children } ) {
        if ( my $background = $child->background ) {
            $background_steps = $background->steps;
        } elsif ( my $scenario = $child->scenario ) {
            $class->_compile_scenario_outline(
                $document->uri,
                $feature_tags, $background_steps,
                $scenario, $language, $id_generator,
                $pickle_sink
                );
        } elsif ( my $rule = $child->rule ) {
            $class->_compile_rule(
                $document->uri,
                $feature_tags, $background_steps,
                $rule, $language, $id_generator,
                $pickle_sink
                );
        } else {
            die "Unimplemented";
        }
    }

    return \@pickles;
}

sub _pickle_steps {
    my ( $class, $steps, $id_generator ) = @_;
    return [ map { $class->_pickle_step( $_, $id_generator ) } @$steps ];
}

sub _compile_scenario {
    my ( $class, $uri, $tags, $background_steps,
         $scenario, $variables, $values, $values_id,
         $language, $id_generator, $pickle_sink )
        = @_;

    my @steps;
    if ($scenario->steps and @{ $scenario->steps }) {
        @steps = @{ $class->_pickle_steps($background_steps,
                                          $id_generator) };
        for my $step (@{ $scenario->steps } ) {
            my $step_text =
                $class->_interpolate( $step->text,
                                      $variables, $values );
            my $arguments =
                $class->_create_pickle_arguments(
                    $step,
                    $variables, $values );
            push @steps,
                Cucumber::Messages::PickleStep->new(
                    id         => $id_generator->(),
                    text       => $step_text,
                    argument   => $arguments,
                    ast_node_ids => [ $step->id,
                                      $values_id ? ($values_id,) : () ],
                );
        }
    }

    $pickle_sink->(
        Cucumber::Messages::Envelope->new(
            pickle => Cucumber::Messages::Pickle->new(
                id   => $id_generator->(),
                name => $class->_interpolate(
                    $scenario->name,
                    $variables, $values ),
                language  => $language,
                steps     => \@steps,
                tags      => $class->_pickle_tags( $tags ),
                uri       => $uri,
                ast_node_ids=> [
                    $scenario->id, $values_id ? ($values_id,) : ()
                ]
            )));
}

sub _compile_scenario_outline {
    my ( $class, $uri, $feature_tags, $background_steps,
         $scenario, $language, $id_generator, $pickle_sink )
        = @_;

    my @examples = @{ $scenario->examples };
    if (scalar @examples == 0) {
        # Create an empty example in order to iterate once below
        push @examples,
            Cucumber::Messages::Examples->new(
                table_header => Cucumber::Messages::TableRow->new(),
                table_body   => [ Cucumber::Messages::TableRow->new() ]
            );
    }

    for my $examples (@examples) {
        my @tags        = (
            @{ $feature_tags || [] },
            @{ $scenario->tags || [] },
            @{ $examples->tags || [] }
            );
        use Data::Dumper;
        for my $values ( @{ $examples->table_body || [] } ) {
            $class->_compile_scenario(
                $uri, \@tags, $background_steps,
                $scenario, $examples->table_header->cells, $values->cells, $values->id,
                $language, $id_generator, $pickle_sink
                );
        }
    }
}

sub _compile_rule {
    my ( $class, $uri, $feature_tags, $feature_background_steps,
         $rule_definition, $language, $id_generator, $pickle_sink )
        = @_;
    my $background_steps = $feature_background_steps;
    my @tags = (
        @{ $feature_tags || [] },
        @{ $rule_definition->tags || [] }
    );

    for my $child ( @{ $rule_definition->children } ) {
        if ( my $background = $child->background ) {
            $background_steps =
                [ @$feature_background_steps,
                  @{ $background->steps } ];
        } elsif ( my $scenario = $child->scenario ) {
            $class->_compile_scenario_outline(
                $uri, \@tags, $background_steps,
                $scenario, $language, $id_generator,
                $pickle_sink
                );
        } else {
            die "Unimplemented";
        }
    }
}

sub _create_pickle_arguments {
    my ( $class, $argument, $variables, $values ) = @_;

    if ( my $data = $argument->data_table ) {
        return Cucumber::Messages::PickleStepArgument->new(
            data_table => Cucumber::Messages::PickleTable->new(
                rows => [
                    map {
                        my $row = $_;
                        Cucumber::Messages::PickleTableRow->new(
                            cells => [
                                map {
                                    my $cell = $_;
                                    Cucumber::Messages::PickleTableCell->new(
                                        value => $class->_interpolate(
                                            $cell->value, $variables, $values
                                        ))
                                } @{ $row->cells || [] }
                            ]);
                    } @{ $data->rows || [] }
                ]
            ));
    } elsif ( $argument->doc_string ) {
        my $docstring = $argument->doc_string;
        return Cucumber::Messages::PickleStepArgument->new(
            doc_string => Cucumber::Messages::PickleDocString->new(
                media_type => $class->_interpolate( $docstring->media_type,
                                                    $variables, $values),
                content    => $class->_interpolate( $docstring->content,
                                                    $variables, $values)
            ));
    }

    return undef;
}

sub _interpolate {
    my ( $class, $name, $variable_cells, $value_cells ) = @_;
    my $n = 0;
    for my $variable_cell ( @{ $variable_cells || [] } ) {
        my $from = '<' . $variable_cell->value . '>';
        my $to   = $value_cells->[ $n++ ]->value;
        $name =~ s/$from/$to/g if $name;
    }
    return $name;
}

sub _pickle_step {
    my ( $class, $step, $id_generator ) = @_;

    return Cucumber::Messages::PickleStep->new(
        text         => $step->text,
        id           => $id_generator->(),
        ast_node_ids => [ $step->id ],
        argument     => $class->_create_pickle_arguments(
            $step, [], [],
        ));
}

sub _pickle_tags {
    my ( $class, $tags ) = @_;
    return [ map { $class->_pickle_tag( $_ ) } @$tags ];
}

sub _pickle_tag {
    my ( $class, $tag ) = @_;
    return Cucumber::Messages::PickleTag->new(
        name        => $tag->name,
        ast_node_id => $tag->id
    );
}

1;

__END__

=head1 NAME

Gherkin::Pickles::Compiler - Transform Gherkin to execution plans

=head1 SYNOPSIS

  use Data::Dumper;
  use Gherkin::Parser;
  use Gherkin::Pickles::Compiler;


  my $parser = Gherkin::Parser->new();
  my $envelope = $parser->parse( 'my.feature' );

  my $c = 0;
  Gherkin::Pickles::Compiler->compile( $envelope,
                                       sub { $c++ },
                                       sub { print Dumper($_[0]) . "\n" },
  );

=head1 DESCRIPTION

The pickle compiler translates the Gherkin document representation (AST)
as represented by a L<Cucumber::Messages::GherkinDocument|Cucumber::Messages/Cucumber::Messages::GherkinDocument>
message into a series of test execution plans (pickles).

=head1 CLASS METHODS

=head2 compile($envelope, $id_generator, [$sink])

Traverses the gherkin document as wrapped by the C<$envelope> message,
generating execution plans represented by L<Cucumber::Messages::Pickle
messages|Cucumber::Messages/Cucumber::Messages::Pickle>.

If a C<$sink> is provided, this function is called for each Pickle being
generated, with one argument: an envelope messages wrapping a Pickle.

In case no C<$sink> is provided, the pickle messages will be collected and
returned (each wrapped in an envelope) from the function.

The C<$id_generator> is a generator function responsible for returning unique
string values, used to identify nodes in the returned Pickles.

=head1 SEE ALSO

=over 8

=item * L<Gherkin>

=item * L<Gherkin::Parser>

=item * L<Cucumber::Messages::Pickle|Cucumber::Messages/Cucumber::Messages::Pickle>

=item * L<Cucumber::Messages::GherkinDocument|Cucumber::Messages/Cucumber::Messages::GherkinDocument>

=back


=head1 LICENSE

See L<Gherkin>.

=cut

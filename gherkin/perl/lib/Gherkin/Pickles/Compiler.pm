package Gherkin::Pickles::Compiler;

use strict;
use warnings;
use Scalar::Util qw(reftype);

sub compile {
    my ( $class, $gherkin_document, $id_generator, $pickle_sink ) = @_;
    my @pickles;
    $pickle_sink ||= sub { push @pickles, $_[0] };

    my $feature = $gherkin_document->{'gherkinDocument'}->{'feature'};
    my $language         = $feature->{'language'};
    my $feature_tags     = $feature->{'tags'};
    my $background_steps = [];

    for my $child ( @{ $feature->{'children'} } ) {
        if ( $child->{'background'} ) {
            $background_steps = $child->{'background'}->{'steps'};
        } elsif ( $child->{'scenario'} ) {
            $class->_compile_scenario(
                $gherkin_document->{'gherkinDocument'}->{'uri'},
                $feature_tags, $background_steps,
                $child->{'scenario'}, $language, $id_generator,
                $pickle_sink
                );
        } elsif ( $child->{'rule'} ) {
            $class->_compile_rule(
                $gherkin_document->{'gherkinDocument'}->{'uri'},
                $feature_tags, $background_steps,
                $child->{'rule'}, $language, $id_generator,
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

sub reject_nones {
    my ( $values ) = @_;

    return [ grep { defined $_ } @$values ]
        if reftype $values eq 'ARRAY';

    my $defined_only = {};
    for my $key ( keys %$values ) {
        my $value = $values->{$key};
        if (defined $value) {
            $defined_only->{$key} = $value;
        }
    }

    return $defined_only;
}

sub _compile_scenario {
    my ( $class, $uri, $feature_tags, $background_steps,
         $scenario, $language, $id_generator, $pickle_sink )
        = @_;

    my @examples = @{ $scenario->{'examples'} };
    if (scalar @examples == 0) {
        # Create an empty example in order to iterate once below
        push @examples, { tableHeader => {},
                          tableBody   => [ { cells => [] } ]};
    }

    for my $examples (@examples) {
        my $variable_cells = $examples->{'tableHeader'}->{'cells'};

        for my $values ( @{ $examples->{'tableBody'} || [] } ) {
            my $value_cells = $values->{'cells'};
            my @tags        = (
                @{ $feature_tags || [] },
                @{ $scenario->{'tags'} || [] },
                @{ $examples->{'tags'} || [] }
            );
            my @steps;
            if ($scenario->{'steps'} and @{ $scenario->{'steps'} }) {
                @steps = @{ $class->_pickle_steps($background_steps,
                                                  $id_generator) };
                for my $step (@{ $scenario->{'steps'} } )
                {
                    my $step_text =
                        $class->_interpolate( $step->{'text'},
                                              $variable_cells, $value_cells, );
                    my $arguments =
                        $class->_create_pickle_arguments(
                            $step,
                            $variable_cells, $value_cells, );
                    push(
                        @steps,
                        reject_nones(
                            {
                                id         => $id_generator->(),
                                text       => $step_text,
                                argument   => $arguments,
                                astNodeIds => reject_nones(
                                    [
                                     $step->{'id'},
                                     $values->{'id'}
                                    ]),
                            })
                        );
                }
            }

            $pickle_sink->(
                {
                    pickle =>
                        reject_nones(
                            {
                                id   => $id_generator->(),
                                name =>
                                    $class->_interpolate(
                                        $scenario->{'name'}, $variable_cells,
                                        $value_cells,
                                    ),
                                language  => $language,
                                steps     => \@steps,
                                tags      => $class->_pickle_tags( \@tags ),
                                uri       => $uri,
                                astNodeIds=> reject_nones(
                                    [
                                     $scenario->{'id'},
                                     $values->{'id'}
                                    ])
                            })
                });
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
        @{ $rule_definition->{'tags'} || []}
    );

    for my $child ( @{ $rule_definition->{'children'} } ) {
        if ( $child->{'background'} ) {
            $background_steps =
                [ @$feature_background_steps,
                  @{ $child->{'background'}->{'steps'} } ];
        } elsif ( $child->{'scenario'} ) {
            $class->_compile_scenario(
                $uri, \@tags, $background_steps,
                $child->{'scenario'}, $language, $id_generator,
                $pickle_sink
                );
        } else {
            die "Unimplemented";
        }
    }
}

sub _create_pickle_arguments {
    my ( $class, $argument, $variables, $values ) = @_;

    if ( $argument->{'dataTable'} ) {
        my $data = $argument->{'dataTable'};
        my $table = { rows => [] };
        for my $row ( @{ $data->{'rows'} || [] } ) {
            my @cells = map {
                reject_nones(
                    {
                        value => $class->_interpolate($_->{'value'},
                                                      $variables, $values)
                    })
            } @{ $row->{'cells'} || [] };
            push( @{ $table->{'rows'} }, { cells => \@cells } );
        }
        return {
            dataTable => $table
        };
    } elsif ( $argument->{'docString'} ) {
        my $docstring = $argument->{'docString'};
        return {
            docString => reject_nones({
                mediaType => $class->_interpolate($docstring->{'mediaType'},
                                                  $variables, $values),
                content   => $class->_interpolate($docstring->{'content'},
                                                  $variables, $values)
            })
        };
    }

    return undef;
}

sub _interpolate {
    my ( $class, $name, $variable_cells, $value_cells ) = @_;
    my $n = 0;
    for my $variable_cell ( @{ $variable_cells || [] } ) {
        my $from = '<' . $variable_cell->{'value'} . '>';
        my $to   = $value_cells->[ $n++ ]->{'value'};
        $name =~ s/$from/$to/g if $name;
    }
    return $name;
}

sub _pickle_step {
    my ( $class, $step, $id_generator ) = @_;

    return reject_nones({
        text => $step->{'text'},
        id   => $id_generator->(),
        astNodeIds => [
            $step->{'id'}
            ],
        argument =>
          $class->_create_pickle_arguments( $step->{'argument'}, [], [],
          ),
    });
}

sub _pickle_tags {
    my ( $class, $tags ) = @_;
    return [ map { $class->_pickle_tag( $_ ) } @$tags ];
}

sub _pickle_tag {
    my ( $class, $tag ) = @_;
    return {
        name      => $tag->{'name'},
        astNodeId => $tag->{'id'}
    };
}

1;

package Gherkin::Pickles::Compiler;

use strict;
use warnings;

sub compile {
    my ( $class, $gherkin_document ) = @_;
    my @pickles;

    my $feature = $gherkin_document->{'feature'};
    my $feature_tags     = $feature->{'tags'};
    my $background_steps = [];

    for my $scenario_definition ( @{ $feature->{'children'} } ) {
        my @args = (
            $feature_tags, $background_steps, $scenario_definition, \@pickles
        );
        if ( $scenario_definition->{'type'} eq 'Background' ) {
            $background_steps = $class->_pickle_steps($scenario_definition)
        } elsif ( $scenario_definition->{'type'} eq 'Scenario' ) {
            $class->_compile_scenario(@args);
        } else {
            $class->_compile_scenario_outline(@args);
        }
    }

    return \@pickles;
}

sub _pickle_steps {
    my ( $class, $scenario_definition ) = @_;
    my @steps = map { $class->_pickle_step( $_ ) }
      @{ $scenario_definition->{'steps'} };
    return \@steps;
}

sub _compile_scenario {
    my ( $class, $feature_tags, $background_steps, $scenario, $pickles )
      = @_;

    my $array_reference = $scenario->{'steps'};
    my @actual_array = @$array_reference;
    my $array_size = @actual_array;
    if ($array_size == 0) { return; }

    my @tags = ( @$feature_tags, @{ $scenario->{'tags'} || [] } );

    my @steps = (
        @$background_steps,
        map { $class->_pickle_step( $_ ) }
          @{ $scenario->{'steps'} || [] }
    );

    push(
        @$pickles,
        {
            tags => $class->_pickle_tags( \@tags ),
            name => $scenario->{'name'},
            locations =>
              [ $class->_pickle_location( $scenario->{'location'} ) ],
            steps => \@steps,
        }
    );
}

sub _compile_scenario_outline {
    my ( $class, $feature_tags, $background_steps, $scenario_outline, $pickles )
      = @_;

    my $array_reference = $scenario_outline->{'steps'};
    my @actual_array = @$array_reference;
    my $array_size = @actual_array;
    if ($array_size == 0) { return; }

    for my $examples ( @{ $scenario_outline->{'examples'} || [] } ) {
        my $variable_cells = $examples->{'tableHeader'}->{'cells'};

        for my $values ( @{ $examples->{'tableBody'} || [] } ) {
            my $value_cells = $values->{'cells'};
            my @steps       = @$background_steps;
            my @tags        = (
                @$feature_tags,
                @{ $scenario_outline->{'tags'} || [] },
                @{ $examples->{'tags'} || [] }
            );

            for my $scenario_outline_step ( @{ $scenario_outline->{'steps'} } )
            {
                my $step_text =
                  $class->_interpolate( $scenario_outline_step->{'text'},
                    $variable_cells, $value_cells, );
                my $arguments =
                  $class->_create_pickle_arguments(
                    $scenario_outline_step->{'argument'},
                    $variable_cells, $value_cells, );
                push(
                    @steps,
                    {
                        text      => $step_text,
                        arguments => $arguments,
                        locations => [
                            $class->_pickle_location(
                                $values->{'location'}
                            ),
                            $class->_pickle_step_location(
                                $scenario_outline_step
                            ),
                        ]
                    }
                );
            }

            push(
                @$pickles,
                {
                    name =>
                        $class->_interpolate(
                            $scenario_outline->{'name'}, $variable_cells,
                            $value_cells,
                        ),
                    steps     => \@steps,
                    tags      => $class->_pickle_tags( \@tags ),
                    locations => [
                        $class->_pickle_location(
                            $values->{'location'}
                        ),
                        $class->_pickle_location(
                            $scenario_outline->{'location'}
                        ),
                    ],
                }
            );
        }
    }
}

sub _create_pickle_arguments {
    my ( $class, $argument, $variables, $values ) = @_;
    my $result = [];

    return $result unless $argument;

    if ( $argument->{'type'} eq 'DataTable' ) {
        my $table = { rows => [] };
        for my $row ( @{ $argument->{'rows'} || [] } ) {
            my @cells = map {
                {
                    location =>
                      $class->_pickle_location( $_->{'location'} ),
                    value => $class->_interpolate(
                        $_->{'value'}, $variables, $values
                    )
                }
            } @{ $row->{'cells'} || [] };
            push( @{ $table->{'rows'} }, { cells => \@cells } );
        }
        push( @$result, $table );
    } elsif ( $argument->{'type'} eq 'DocString' ) {
        push(
            @$result,
            {
                location =>
                  $class->_pickle_location( $argument->{'location'} ),
                content => $class->_interpolate(
                    $argument->{'content'},
                    $variables, $values
                ),
            }
        );
    } else {
        die "Internal error";
    }

    return $result;
}

sub _interpolate {
    my ( $class, $name, $variable_cells, $value_cells ) = @_;
    my $n = 0;
    for my $variable_cell ( @{ $variable_cells || [] } ) {
        my $from = '<' . $variable_cell->{'value'} . '>';
        my $to   = $value_cells->[ $n++ ]->{'value'};
        $name =~ s/$from/$to/g;
    }
    return $name;
}

sub _pickle_step {
    my ( $class, $step ) = @_;

    return {
        text => $step->{'text'},
        arguments =>
          $class->_create_pickle_arguments( $step->{'argument'}, [], [],
          ),
        locations => [ $class->_pickle_step_location( $step ) ],
    };
}

sub _pickle_step_location {
    my ( $class, $step ) = @_;
    return {
        line   => $step->{'location'}->{'line'},
        column => $step->{'location'}->{'column'} +
          length( $step->{'keyword'} ),
    };
}

sub _pickle_location {
    my ( $class, $location ) = @_;
    return {
        line   => $location->{'line'},
        column => $location->{'column'},
    };
}

sub _pickle_tags {
    my ( $class, $tags ) = @_;
    return [ map { $class->_pickle_tag( $_ ) } @$tags ];
}

sub _pickle_tag {
    my ( $class, $tag ) = @_;
    return {
        name     => $tag->{'name'},
        location => $class->_pickle_location( $tag->{'location'} )
    };
}

1;

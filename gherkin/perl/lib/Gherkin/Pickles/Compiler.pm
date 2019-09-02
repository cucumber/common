package Gherkin::Pickles::Compiler;

use strict;
use warnings;
use utf8;

use Scalar::Util 'reftype';


sub compile {
    my ( $class, $root ) = @_;
    my $gherkin_document = $root->{'gherkinDocument'};
    my @pickles;

    my $uri     = $gherkin_document->{'uri'};
    my $feature = $gherkin_document->{'feature'};
    my $language         = $feature->{'language'};
    my $feature_tags     = $feature->{'tags'};
    my $background_steps = [];

    for my $scenario_definition ( @{ $feature->{'children'} } ) {
        if ( $scenario_definition->{'background'} ) {
            $background_steps =
                $class->_pickle_steps($scenario_definition->{'background'})
        } elsif ( $scenario_definition->{'scenario'}
                  and $scenario_definition->{'scenario'}->{'examples'}) {
            $class->_compile_scenario_outline($feature_tags, $background_steps,
                                              $scenario_definition->{'scenario'},
                                              $language, $uri, \@pickles);
        } else {
            $class->_compile_scenario($feature_tags, $background_steps,
                                      $scenario_definition->{'scenario'},
                                      $language, $uri, \@pickles);
        }
    }

    return \@pickles;
}

sub reject_nones {
    my ( $class, $values ) = @_;

    my $defined_only = {};
    for my $key ( keys %$values ) {
        my $value = $values->{$key};
        next if not defined $value;

        # eliminate empty arrays too
        next if ref $value and reftype $value eq 'ARRAY'
            and scalar(@{$value}) == 0;

        $defined_only->{$key} = $value;
    }

    return $defined_only;
}

sub _pickle_steps {
    my ( $class, $scenario_definition ) = @_;
    my @steps = map { $class->_pickle_step( $_ ) }
      @{ $scenario_definition->{'steps'} };
    return \@steps;
}

sub _compile_scenario {
    my ( $class, $feature_tags, $background_steps, $scenario, $language, $uri, $pickles )
      = @_;

    my @actual_array =  @{ $scenario->{'steps'} || [] };
    my $array_size = @actual_array;

    my @tags = ( @{$feature_tags || []}, @{ $scenario->{'tags'} || [] } );

    my @steps;
    if ($array_size > 0) {
        @steps = (
            @$background_steps,
            map { $class->_pickle_step( $_ ) }
            @{ $scenario->{'steps'} || [] }
        );
    }

    push(
        @$pickles,
        {
            'pickle' => $class->reject_nones( {
                uri => $uri,
                tags => $class->_pickle_tags( \@tags ),
                language => $language,
                name => $scenario->{'name'},
                locations =>
                    [ $class->_pickle_location( $scenario->{'location'} ) ],
                steps => \@steps,
            })
        }
    );
}

sub _compile_scenario_outline {
    my ( $class, $feature_tags, $background_steps, $scenario_outline, $language, $uri, $pickles )
      = @_;

    my @actual_array =  @{ $scenario_outline->{'steps'} || [] };
    my $array_size = @actual_array;

     for my $examples ( @{ $scenario_outline->{'examples'} || [] } ) {
        my $variable_cells = $examples->{'tableHeader'}->{'cells'};

        for my $values ( @{ $examples->{'tableBody'} || [] } ) {
            my $value_cells = $values->{'cells'};
            my @tags        = (
                @{ $feature_tags || [] },
                @{ $scenario_outline->{'tags'} || [] },
                @{ $examples->{'tags'} || [] }
            );
            my @steps;
            if ($array_size > 0) {
                @steps = @$background_steps;
            }

            for my $scenario_outline_step ( @{ $scenario_outline->{'steps'} } )
            {
                my $step_text =
                  $class->_interpolate( $scenario_outline_step->{'text'},
                    $variable_cells, $value_cells, );
                my $argument =
                  $class->_create_pickle_arguments(
                    $scenario_outline_step->{'docString'},
                    $scenario_outline_step->{'dataTable'},
                    $variable_cells, $value_cells, );
                push(
                    @steps,
                    $class->reject_nones({
                        text      => $step_text,
                        argument => $argument,
                        locations => [
                            $class->_pickle_step_location(
                                $scenario_outline_step
                            ),
                            $class->_pickle_location(
                                $values->{'location'}
                            ),
                        ]
                    })
                );
            }

            push(
                @$pickles,
                {
                    'pickle' => $class->reject_nones({
                        uri => $uri,
                        name =>
                            $class->_interpolate(
                                $scenario_outline->{'name'}, $variable_cells,
                                $value_cells,
                            ),
                        language  => $language,
                        steps     => \@steps,
                        tags      => $class->_pickle_tags( \@tags ),
                        locations => [
                            $class->_pickle_location(
                                $scenario_outline->{'location'}
                            ),
                            $class->_pickle_location(
                                $values->{'location'}
                            ),
                            ],
                    })
                }
            );
        }
    }
}

sub _create_pickle_arguments {
    my ( $class, $docstring, $datatable, $variables, $values ) = @_;

    return undef unless $docstring or $datatable;

    if ( $datatable ) {
        my $table = { rows => [] };
        for my $row ( @{ $datatable->{'rows'} || [] } ) {
            my @cells = map {
                $class->reject_nones({
                    location =>
                      $class->_pickle_location( $_->{'location'} ),
                    value => $class->_interpolate(
                        $_->{'value'}, $variables, $values
                    )
                })
            } @{ $row->{'cells'} || [] };
            push( @{ $table->{'rows'} }, { cells => \@cells } );
        }
        return { 'dataTable' => $table };
    } elsif ( $docstring ) {
        my $pickle_docstring = {
            location => $class->_pickle_location( $docstring->{'location'} ),
            content => $class->_interpolate($docstring->{'content'}, $variables, $values),
        };
        if(defined $docstring->{'contentType'}){
            $pickle_docstring->{'contentType'} =
                $class->_interpolate($docstring->{'contentType'}, $variables, $values)
        }
        return { 'docString' => $pickle_docstring };
    }

    die "Internal error";
}

sub _interpolate {
    my ( $class, $name, $variable_cells, $value_cells ) = @_;
    return undef unless defined $name;

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

    return $class->reject_nones({
        text => $step->{'text'},
        argument =>
          $class->_create_pickle_arguments(
              $step->{'docString'}, $step->{'dataTable'}, [], [],
          ),
        locations => [ $class->_pickle_step_location( $step ) ],
    });
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
    return @$tags ? [ map { $class->_pickle_tag( $_ ) } @$tags ] : undef;
}

sub _pickle_tag {
    my ( $class, $tag ) = @_;
    return {
        name     => $tag->{'name'},
        location => $class->_pickle_location( $tag->{'location'} )
    };
}

1;

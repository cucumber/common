package Gherkin::AstBuilder;

use strict;
use warnings;
use Scalar::Util qw(reftype);

use Gherkin::Exceptions;
use Gherkin::AstNode;

sub new {
    my $class = shift;
    my ($id_generator) = @_;

    my $id_counter = 0;
    my $self  = bless {
        stack         => [],
        comments      => [],
        id_generator  => $id_generator // sub {
            return $id_counter++;
        },
        uri           => '',
    }, $class;
    $self->reset;
    return $self;
}

# Simple builder sugar
sub ast_node { Gherkin::AstNode->new( $_[0] ) }

sub reset {
    my $self  = shift;
    my ($uri) = @_;
    $self->{'stack'}    = [ ast_node('None') ];
    $self->{'comments'} = [];
    $self->{'uri'}      = $uri;
}

sub current_node {
    my $self = shift;
    return $self->{'stack'}->[-1];
}

sub start_rule {
    my ( $self, $rule_type ) = @_;
    push( @{ $self->{'stack'} }, ast_node($rule_type) );
}

sub end_rule {
    my ( $self, $rule_type ) = @_;
    my $node = pop( @{ $self->{'stack'} } );
    $self->current_node->add( $node->rule_type, $self->transform_node($node) );
}

sub build {
    my ( $self, $token ) = @_;
    if ( $token->matched_type eq 'Comment' ) {
        push(
            @{ $self->{'comments'} },
            {
                location => $self->get_location($token),
                text     => $token->matched_text
            }
        );
    } else {
        $self->current_node->add( $token->matched_type, $token );
    }
}

sub get_result {
    my $self = shift;
    return $self->current_node->get_single('GherkinDocument');
}

sub get_location {
    my ( $self, $token, $column ) = @_;

    use Carp qw/confess/;
    confess "What no token?" unless $token;

    if ( !defined $column ) {
        return $token->location;
    } else {
        return {
            line   => $token->location->{'line'},
            column => $column
        };
    }
}

sub get_tags {
    my ( $self, $node ) = @_;

    my $tags_node = $node->get_single('Tags') || return [];
    my @tags;

    for my $token ( @{ $tags_node->get_tokens('TagLine') } ) {
        for my $item ( @{ $token->matched_items } ) {
            push(
                @tags,
                {
                    id       => $self->next_id,
                    location =>
                      $self->get_location( $token, $item->{'column'} ),
                    name => $item->{'text'}
                }
            );
        }
    }

    return \@tags;
}

sub get_table_rows {
    my ( $self, $node ) = @_;
    my @rows;

    for my $token ( @{ $node->get_tokens('TableRow') } ) {
        push(
            @rows,
            {
                id       => $self->next_id,
                location => $self->get_location($token),
                cells    => $self->get_cells($token)
            }
        );
    }

    $self->ensure_cell_count( \@rows );
    return \@rows;
}

sub ensure_cell_count {
    my ( $self, $rows ) = @_;
    return unless @$rows;

    my $cell_count;

    for my $row (@$rows) {
        my $this_row_count = @{ $row->{'cells'} };
        $cell_count = $this_row_count unless defined $cell_count;
        unless ( $cell_count == $this_row_count ) {
            Gherkin::Exceptions::AstBuilder->throw(
                "inconsistent cell count within the table",
                $row->{'location'} );
        }
    }
}

sub get_cells {
    my ( $self, $table_row_token ) = @_;
    my @cells;
    for my $cell_item ( @{ $table_row_token->matched_items } ) {
        push(
            @cells,
            $self->reject_nones(
                {
                    location => $self->get_location(
                        $table_row_token, $cell_item->{'column'}
                        ),
                    value => $cell_item->{'text'}
                })
        );
    }

    return \@cells;
}

sub get_description { return $_[1]->get_single('Description') }
sub get_steps       { return $_[1]->get_items('Step') }

sub reject_nones {
    my ( $self, $values ) = @_;

    my $defined_only = {};
    for my $key ( keys %$values ) {
        my $value = $values->{$key};
        if (defined $value) {
            if (ref $value) {
                if (reftype $value eq 'ARRAY') {
                    $defined_only->{$key} = $value
                        if (scalar(@$value) > 0);
                }
                else {
                    $defined_only->{$key} = $value;
                }
            }
            elsif (not ref $value) {
                $defined_only->{$key} = $value
                    unless "$value" eq '';
            }
        }
    }

    return $defined_only;
}

sub next_id {
    my $self = shift;
    return $self->{'id_generator'}->();
}

sub transform_node {
    my ( $self, $node ) = @_;

    if ( $node->rule_type eq 'Step' ) {
        my $step_line  = $node->get_token('StepLine');
        my $data_table = $node->get_single('DataTable') || undef;
        my $doc_string = $node->get_single('DocString') || undef;

        return $self->reject_nones(
            {
                id        => $self->next_id,
                location  => $self->get_location($step_line),
                keyword   => $step_line->matched_keyword,
                text      => $step_line->matched_text,
                docString => $doc_string,
                dataTable => $data_table,
            }
        );
    } elsif ( $node->rule_type eq 'DocString' ) {
        my $separator_token = $node->get_tokens('DocStringSeparator')->[0];
        my $media_type      = $separator_token->matched_text;
        my $delimiter       = $separator_token->matched_keyword;
        my $line_tokens     = $node->get_tokens('Other');
        my $content = join( "\n", map { $_->matched_text } @$line_tokens );

        return $self->reject_nones(
            {
                location    => $self->get_location($separator_token),
                content     => $content,
                mediaType   => $media_type,
                delimiter   => $delimiter
            }
        );
    } elsif ( $node->rule_type eq 'DataTable' ) {
        my $rows = $self->get_table_rows($node);
        return $self->reject_nones(
            {
                location => $rows->[0]->{'location'},
                rows     => $rows
            }
        );
    } elsif ( $node->rule_type eq 'Background' ) {
        my $background_line = $node->get_token('BackgroundLine');
        my $description     = $self->get_description($node);
        my $steps           = $self->get_steps($node);

        return $self->reject_nones(
            {
                id          => $self->next_id,
                location    => $self->get_location($background_line),
                keyword     => $background_line->matched_keyword,
                name        => $background_line->matched_text,
                description => $description,
                steps       => $steps
            }
        );
    } elsif ( $node->rule_type eq 'ScenarioDefinition' ) {
        my $tags          = $self->get_tags($node);
        my $scenario_node = $node->get_single('Scenario');
        my $scenario_line = $scenario_node->get_token('ScenarioLine');
        my $description   = $self->get_description($scenario_node);
        my $steps         = $self->get_steps($scenario_node);
        my $examples      = $scenario_node->get_items('ExamplesDefinition');

        return $self->reject_nones(
            {
                id          => $self->next_id,
                tags        => $tags,
                location    => $self->get_location($scenario_line),
                keyword     => $scenario_line->matched_keyword,
                name        => $scenario_line->matched_text,
                description => $description,
                steps       => $steps,
                examples    => $examples
            }
            );
    } elsif ( $node->rule_type eq 'Rule' ) {
        my $header = $node->get_single('RuleHeader');
        unless ($header) {
            warn "Missing RuleHeader!";
            return;
        }
        my $rule_line = $header->get_token('RuleLine');
        unless ($rule_line) {
            warn "Missing RuleLine";
            return;
        }
        my $tags = $self->get_tags($header);

        my $children = [];
        my $background = $node->get_single('Background');
        if ( $background ) {
            push( @{ $children }, { background => $background })
        }
        for my $scenario_definition ( @{ $node->get_items('ScenarioDefinition') } ) {
            push( @{ $children }, { scenario => $scenario_definition })
        }

        my $description          = $self->get_description($header);

        return $self->reject_nones(
            {
                id                  => $self->next_id,
                tags                => $tags,
                location            => $self->get_location($rule_line),
                keyword             => $rule_line->matched_keyword,
                name                => $rule_line->matched_text,
                description         => $description,
                children            => $children
            }
        );
    } elsif ( $node->rule_type eq 'ExamplesDefinition' ) {
        my $tags           = $self->get_tags($node);
        my $examples_node  = $node->get_single('Examples');
        my $examples_line  = $examples_node->get_token('ExamplesLine');
        my $description    = $self->get_description($examples_node);
        my $examples_table = $examples_node->get_single('ExamplesTable');

        return $self->reject_nones(
            {
                id          => $self->next_id,
                tags        => $tags,
                location    => $self->get_location($examples_line),
                keyword     => $examples_line->matched_keyword,
                name        => $examples_line->matched_text,
                description => $description,
                tableHeader => $examples_table->{'tableHeader'} || undef,
                tableBody   => $examples_table->{'tableBody'} || undef
            }
        );
    } elsif ( $node->rule_type eq 'ExamplesTable' ) {
        my $rows = $self->get_table_rows($node);

        my $table_header = shift(@$rows) if $rows;

        return $self->reject_nones(
            {
                tableHeader => $table_header,
                tableBody   => $rows
            }
        );
    } elsif ( $node->rule_type eq 'Description' ) {
        my @description = @{ $node->get_tokens('Other') };

        # Trim trailing empty lines
        pop @description
          while ( @description && !$description[-1]->matched_text );

        return join "\n", map { $_->matched_text } @description;
    } elsif ( $node->rule_type eq 'Feature' ) {
        my $header = $node->get_single('FeatureHeader');
        unless ($header) {
            warn "Missing FeatureHeader!";
            return;
        }
        my $feature_line = $header->get_token('FeatureLine');
        unless ($feature_line) {
            warn "Missing FeatureLine";
            return;
        }
        my $tags = $self->get_tags($header);

        my $children = [];
        my $background = $node->get_single('Background');
        if ( $background ) {
            push( @{ $children }, { background => $background })
        }
        for my $scenario_definition ( @{ $node->get_items('ScenarioDefinition') } ) {
            push( @{ $children }, { scenario => $scenario_definition })
        }
        for my $rule_definition ( @{ $node->get_items('Rule') } ) {
            push( @{ $children }, { rule => $rule_definition })
        }
        my $description          = $self->get_description($header);
        my $language             = $feature_line->matched_gherkin_dialect;

        return $self->reject_nones(
            {
                tags                => $tags,
                location            => $self->get_location($feature_line),
                language            => $language,
                keyword             => $feature_line->matched_keyword,
                name                => $feature_line->matched_text,
                description         => $description,
                children            => $children
            }
        );
    } elsif ( $node->rule_type eq 'GherkinDocument' ) {
         my $feature = $node->get_single('Feature');

         return {
             gherkinDocument => $self->reject_nones(
                 {
                     uri                 => $self->{'uri'},
                     feature             => $feature,
                     comments            => $self->{'comments'},
                 })
         };
    } else {
        return $node;
    }
}

1;

package Gherkin::AstBuilder;

use strict;
use warnings;

use Gherkin::Exceptions;
use Gherkin::AstNode;

sub new {
    my $class = shift;
    my $self  = bless {
        stack    => [],
        comments => [],
    }, $class;
    $self->reset;
    return $self;
}

# Simple builder sugar
sub ast_node { Gherkin::AstNode->new( $_[0] ) }

sub reset {
    my $self = shift;
    $self->{'stack'}    = [ ast_node('None') ];
    $self->{'comments'} = [];
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
                type     => 'Comment',
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
                    type => 'Tag',
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
                type     => 'TableRow',
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
            {
                type     => 'TableCell',
                location => $self->get_location(
                    $table_row_token, $cell_item->{'column'}
                ),
                value => $cell_item->{'text'}
            }
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
        $defined_only->{$key} = $value if defined $value;
    }

    return $defined_only;
}

sub transform_node {
    my ( $self, $node ) = @_;
    if ( $node->rule_type eq 'Step' ) {
        my $step_line = $node->get_token('StepLine');
        my $step_argument =
             $node->get_single('DataTable')
          || $node->get_single('DocString')
          || undef;

        return $self->reject_nones(
            {
                type     => $node->rule_type,
                location => $self->get_location($step_line),
                keyword  => $step_line->matched_keyword,
                text     => $step_line->matched_text,
                argument => $step_argument
            }
        );
    } elsif ( $node->rule_type eq 'DocString' ) {
        my $separator_token = $node->get_tokens('DocStringSeparator')->[0];
        my $content_type    = $separator_token->matched_text;
        $content_type = undef if length $content_type < 1;
        my $line_tokens = $node->get_tokens('Other');
        my $content = join( "\n", map { $_->matched_text } @$line_tokens );

        return $self->reject_nones(
            {
                type        => $node->rule_type,
                location    => $self->get_location($separator_token),
                contentType => $content_type,
                content     => $content
            }
        );
    } elsif ( $node->rule_type eq 'DataTable' ) {
        my $rows = $self->get_table_rows($node);
        return $self->reject_nones(
            {
                type     => $node->rule_type,
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
                type        => $node->rule_type,
                location    => $self->get_location($background_line),
                keyword     => $background_line->matched_keyword,
                name        => $background_line->matched_text,
                description => $description,
                steps       => $steps
            }
        );
    } elsif ( $node->rule_type eq 'Scenario_Definition' ) {
        my $tags          = $self->get_tags($node);
        my $scenario_node = $node->get_single('Scenario');
        if ($scenario_node) {
            my $scenario_line = $scenario_node->get_token('ScenarioLine');
            my $description   = $self->get_description($scenario_node);
            my $steps         = $self->get_steps($scenario_node);

            return $self->reject_nones(
                {
                    type        => $scenario_node->rule_type,
                    tags        => $tags,
                    location    => $self->get_location($scenario_line),
                    keyword     => $scenario_line->matched_keyword,
                    name        => $scenario_line->matched_text,
                    description => $description,
                    steps       => $steps
                }
            );
        } else {
            my $scenario_outline_node = $node->get_single('ScenarioOutline');

            die "Internal grammar error" unless $scenario_outline_node;
            my $scenario_outline_line =
              $scenario_outline_node->get_token('ScenarioOutlineLine');
            my $description = $self->get_description($scenario_outline_node);
            my $steps       = $self->get_steps($scenario_outline_node);
            my $examples =
              $scenario_outline_node->get_items('Examples_Definition');

            return $self->reject_nones(
                {
                    type        => $scenario_outline_node->rule_type,
                    tags        => $tags,
                    location    => $self->get_location($scenario_outline_line),
                    keyword     => $scenario_outline_line->matched_keyword,
                    name        => $scenario_outline_line->matched_text,
                    description => $description,
                    steps       => $steps,
                    examples    => $examples
                }
            );
        }
    } elsif ( $node->rule_type eq 'Examples_Definition' ) {
        my $tags           = $self->get_tags($node);
        my $examples_node  = $node->get_single('Examples');
        my $examples_line  = $examples_node->get_token('ExamplesLine');
        my $description    = $self->get_description($examples_node);
        my $examples_table = $examples_node->get_single('Examples_Table');

        return $self->reject_nones(
            {
                type        => $examples_node->rule_type,
                tags        => $tags,
                location    => $self->get_location($examples_line),
                keyword     => $examples_line->matched_keyword,
                name        => $examples_line->matched_text,
                description => $description,
                tableHeader => $examples_table->{'tableHeader'} || undef,
                tableBody   => $examples_table->{'tableBody'} || undef
            }
        );
    } elsif ( $node->rule_type eq 'Examples_Table' ) {
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
        my $header = $node->get_single('Feature_Header');
        return unless $header;
        my $feature_line = $header->get_token('FeatureLine');
        return unless $feature_line;
        my $tags = $self->get_tags($header);

        my $children = [];
        my $background = $node->get_single('Background');
        if ( $background ) {
            push( @{ $children }, $background)
        }
        for my $scenario_definition ( @{ $node->get_items('Scenario_Definition') } ) {
            push( @{ $children }, $scenario_definition)
        }

        my $description          = $self->get_description($header);
        my $language             = $feature_line->matched_gherkin_dialect;

        return $self->reject_nones(
            {
                type                => $node->rule_type,
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

         return $self->reject_nones(
             {
                 type                => $node->rule_type,
                 feature             => $feature,
                 comments            => $self->{'comments'}
             }
         );
    } else {
        return $node;
    }
}

1;

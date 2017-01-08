package Gherkin::Line;

use strict;
use warnings;

use Class::XSAccessor accessors =>
  [ qw/line_text line_number indent _trimmed_line_text/, ];

sub new {
    my ( $class, $options ) = @_;
    my $self = bless $options, $class;

    $self->{'_trimmed_line_text'} ||= $self->_build__trimmed_line_text;
    $self->{'indent'}             ||= $self->_build_indent;

    return $self;
}

sub _build__trimmed_line_text {
    my $self    = shift;
    my $trimmed = $self->line_text;
    $trimmed =~ s/^\s+// if defined $trimmed;
    return $trimmed;
}

sub _build_indent {
    my $self = shift;
    return length( $self->line_text ) - length( $self->_trimmed_line_text );
}

sub get_rest_trimmed {
    my ( $self, $from ) = @_;
    my $rest = substr( $self->_trimmed_line_text, $from );
    $rest =~ s/^\s*//;
    $rest =~ s/\s*$//;
    return $rest;
}

sub get_line_text {
    my ( $self, $indent_to_remove ) = @_;
    $indent_to_remove = -1 unless defined $indent_to_remove;

    if ( $indent_to_remove < 0 or $indent_to_remove > $self->indent ) {
        return $self->_trimmed_line_text;
    } else {
        return substr( $self->line_text, $indent_to_remove );
    }
}

sub is_empty {
    my $self = shift;
    return !$self->_trimmed_line_text;
}

sub startswith {
    my ( $self, $prefix ) = @_;
    return unless defined $self->_trimmed_line_text;
    return !index( $self->_trimmed_line_text, $prefix );
}

sub startswith_title_keyword {
    my ( $self, $prefix ) = @_;
    return unless defined $self->_trimmed_line_text;
    return !index( $self->_trimmed_line_text, $prefix . ':' );
}

sub _split_table_cells_iterator {
    my ( $self, $row ) = @_;
    my $col        = 0;
    my $first_cell = 1;

    return sub {
        my $cell      = '';
        my $start_col = $col + 1 + $first_cell;

        while (1) {
            ( $row =~ s/^(.)// ) || return;
            my $char = $1;
            $col += 1;
            if ( $char eq '|' ) {
                if ($first_cell) {
                    $first_cell = 0;
                } else {
                    return ( $cell, $start_col );
                }
            } elsif ( $char eq "\\" ) {
                $row =~ s/^(.)// || die "Unpossible";
                $col += 1;
                $char = $1;
                if ( $char eq 'n' ) {
                    $cell .= "\n";
                } else {
                    if ( $char ne '|' && $char ne '\\' ) {
                        $cell .= '\\';
                    }
                    $cell .= $char;
                }
            } elsif ( defined $char ) {
                $cell .= $char;
            } else {
                die "WHAT?";
            }
        }
      }
}

sub table_cells {
    my ($self) = @_;
    my $cells  = [];
    my $text   = $self->_trimmed_line_text;
    $text =~ s/^\s*//;
    $text =~ s/\s*$//;

    my $i = $self->_split_table_cells_iterator($text);
    while (1) {
        my ( $cell, $col ) = $i->();
        last unless defined $col;

        my $stripped_cell = $cell;
        $stripped_cell =~ s/^\s+//;
        my $cell_indent = length($cell) - length($stripped_cell);
        $stripped_cell =~ s/\s*$//;
        push(
            @$cells,
            {
                column => $col + $self->indent + $cell_indent,
                text   => $stripped_cell
            }
        );
    }

    return $cells;
}

sub tags {
    my $self       = shift;
    my $column     = $self->indent + 1;
    my $items_line = $self->_trimmed_line_text;
    $items_line =~ s/\s+$//;

    my @tags;
    my @items = split( /@/, $items_line );
    shift(@items);    # Blank first item

    for my $item (@items) {
        my $original_item = $item;
        $item =~ s/^\s*//;
        $item =~ s/\s*$//;

        push(
            @tags,
            {
                column => $column,
                text   => '@' . $item,
            }
        );

        $column += length($original_item) + 1;
    }

    return \@tags;
}

1;

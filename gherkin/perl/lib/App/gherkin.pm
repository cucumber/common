
package App::gherkin;

use strict;
use warnings;
use open ':std', ':encoding(UTF-8)';


use Class::XSAccessor accessors =>
  [ qw/out_handle include_source include_ast
    include_pickles predictable_ids /, ];

use Cpanel::JSON::XS;
use Data::UUID;
use Getopt::Long qw(GetOptionsFromArray :config bundling);
use Pod::Usage;

use Gherkin;

sub new {
    my ($class) = @_;
    return bless {
        out_handle      => \*STDOUT,
        include_source  => 1,
        include_ast     => 1,
        include_pickles => 1,
        predictable_ids => 0,
    }, $class;
}

sub parse_options {
    my ($self, @options) = @_;

    my $help = 0;
    GetOptionsFromArray(
        \@options,
        'help'             => \$help,
        'source!'          => \$self->{include_source},
        'ast!'             => \$self->{include_ast},
        'pickles!'         => \$self->{include_pickles},
        'predictable-ids!' => \$self->{predictable_ids},
        )
        or pod2usage(2);
    pod2usage(1) if $help;

    return @options;
}

sub id_generator {
    my ($self) = @_;

    if ($self->predictable_ids) {
        my $next_id = 0;
        return sub {
            my $id = $next_id++;
            return "$id";
        };
    }
    else {
        my $gen = Data::UUID->new;
        return sub {
            return lc($gen->create_str);
        }
    }

    # unreachable
}

sub formatter {
    my ($self) = @_;

    my $fh   = $self->out_handle;
    return sub {
        my $msg = shift;
        print $fh $msg->to_json . "\n";
    };
}

sub run {
    my ( $self, @file_list ) = @_;

    Gherkin->from_paths(\@file_list,
                        $self->id_generator,
                        $self->formatter,
                        include_source  => $self->include_source,
                        include_ast     => $self->include_ast,
                        include_pickles => $self->include_pickles,
        );
    return 0;
}


1;

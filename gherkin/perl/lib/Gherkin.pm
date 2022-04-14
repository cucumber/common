package Gherkin;

use strict;
use warnings;
use Encode qw(encode_utf8 find_encoding);

use Cucumber::Messages;

use Gherkin::AstBuilder;
use Gherkin::Parser;
use Gherkin::Pickles::Compiler;


use Class::XSAccessor accessors =>
  [ qw/ include_source include_ast include_pickles predictable_ids
    _producer /, ];


sub new {
    my ($class, %options) = @_;

    return bless {
        include_source  => 1,
        include_ast     => 1,
        include_pickles => 1,
        %options,
    }, $class;
}

sub from_paths {
    my ($class, $paths, $id_generator, $sink, %options) = @_;

    my $gherkin = $class->new(%options);
    for my $path (@$paths) {
        # Note: There's a huge difference between ':utf8' and
        # ':encoding(UTF-8)' in Perl: the latter causes strict UTF-8 conversion
        # and fails hard if there are encoding problems. The former
        # accommodates the errors and simply continues, allowing us to
        # recode back to octets and then to the encoding indicated in the
        # header using the "# encoding: ..." header.
        open my $fh, '<:utf8', $path
            or die "Unable to open gherkin document $path: $!";

        # local $/ = undef; --> unset 'end-of-line' marker: slurp entire file
        # use the 'do' block to scope this binding to smallest possible scope
        my $content = do { local $/ = undef; <$fh> };
        close $fh
            or warn "Unable to close gherkin document $path: $!";

        $gherkin->from_source(
            Cucumber::Messages::Envelope->new(
                source => Cucumber::Messages::Source->new(
                    uri        => $path,
                    data       => $content,
                    media_type => Cucumber::Messages::Source::MEDIATYPE_TEXT_X_CUCUMBER_GHERKIN_PLAIN,
                    )
            ),
            $id_generator,
            $sink);
    }
}

sub _parse_source_encoding_header {
    my ($envelope) = @_;
    my $source = $envelope->source;
    my $header_end = 0;
    my @header     = grep {
        not ($header_end ||= ($_ !~ m/^\s*#/))
    } split( /\n/, $source->data );
    my $encoding;
    for my $line (@header) {
        if ($line =~ m/\s*#\s+encoding:\s+(\S+)/) {
            $encoding = $1;
            last;
        }
    }
    if ($encoding) {
        my $enc = find_encoding($encoding);
        my $uri = $source->uri;
        die "Header in $uri specifies unknown encoding $encoding"
            unless $enc;
        $source->data( $enc->decode(encode_utf8($source->data)) );
    }
}

sub from_source {
    my ($self, $envelope, $id_generator, $sink) = @_;

    _parse_source_encoding_header($envelope);
    if ($self->include_source) {
        $sink->($envelope);
    }

    if ($self->include_ast or $self->include_pickles) {
        my $source = $envelope->source;
        my $parser = Gherkin::Parser->new(
            Gherkin::AstBuilder->new($id_generator)
            );
        my $data = $source->data;
        my $ast_msg = $parser->parse( \$data, $source->uri);
        $sink->($ast_msg) if $self->include_ast;

        if ($self->include_pickles) {
            Gherkin::Pickles::Compiler->compile($ast_msg, $id_generator, $sink);
        }
    }
}


1;

__END__

=head1 NAME

Gherkin - a parser and compiler for the Gherkin language

=head1 SYNOPSIS

  use Gherkin;


  sub sink {
     my $msg = shift;
     use Data::Dumper;

     print Dumper($msg);
  }

  my $id = 0;
  my gen { $id++ };

  Gherkin->from_paths( [ 'your.feature' ],
                       \&gen, \&sink );

=head1 DESCRIPTION

This is the Perl implementation of the Gherkin language parser
and compiler as developed by the Cucumber project
(L<https://github.com/cucumber>).

Gherkin is a simple language, with a formal specification. The parser
in this implementation is generated off the official language grammar.

B<NOTE> Versions 21 and lower of this library used to send hashes to
the C<$sink>, whereas the current version sends L<Cucumber::Messages>.

=head1 OVERVIEW

The Cucumber toolkit consists of a set of tools which form a pipe line:
each consumes and produces protobuf messages
(See L<https://github.com/cucumber/common/tree/main/messages>). Messages
use ndjson formatting.

The start of the pipeline is the Gherkin language parser. C<Gherkin>
implements that functionality in Perl. It's the first building block in
the pipe line and intended to be used to build further tooling upon.

=head1 CLASS METHODS

=head2 new(%options)

Constructor.

Accepted C<%options> are:

=over

=item include_source

Boolean. Indicates whether the text of the source document is to be included
in the output stream using a L<Source message|Cucumber::Messages/Cucumber::Messages::Source>.

=item include_ast

Boolean. Indicates whether the parsed source (AST or Abstract Syntax Tree) is
to be included in the output stream using a L<GherkinDocument message|Cucumber::Messages/Cucumber::Messages::GherkinDocument>.

=item include_pickles

Boolean. Indicates whether the expanded-and-interpolated (executable)
scenarios are to be included in the output stream using
L<Pickle messages|Cucumber::Messages/Cucumber::Messages::Pickle>.

=back

=head2 from_paths($paths, $id_gen, $sink, %options)

Constructs a Gherkin instance and calls its C<from_source> method
for each of the paths in the arrayref C<$paths>.

C<$id_gen> is a coderef to a function generating unique
IDs which messages in the output stream can use to refer to other content
in the stream. C<$sink> is a coderef to a function taking the next message
in the stream as its argument. Each message is encapsulated in an
L<Envelope message|Cucumber::Messages/Cucumber::Messages::Envelope>.

C<%options> are passed to C<new>.


=head1 METHODS

=head2 from_source($source_msg, $id_gen, $sink)

Generates a stream of AST and pickle messages sent to C<$sink>. The source
text in the message's C<data> attribute is assumed to be C<utf8> or C<UTF-8>
encoded. The document header is scanned for an C<# encoding: ...> instruction.
If one is found, the text is recoded from that encoding into Perl's internal
Unicode representation.

The L<Source|Cucumber::Messages/Cucumber::Messages::Source> message sent to
the sink is wrapped in an envelope which has a C<to_json> method to create
UTF-8 encoded L<NDJSON|http://ndjson.org/> output.

C<$id_gen> and C<$sink> are as documented in C<from_paths>.


=head1 SEE ALSO

=over 8

=item * L<Cucumber::Messages>

=item * L<Gherkin::Parser>

=back


=head1 LICENSE

Please see the included LICENSE.txt for the canonical version. In summary:

  The MIT License (MIT)

  Copyright (c) 2020-2021 Erik Huelsmann
  Copyright (c) 2016      Peter Sergeant

This work is a derivative of work that is:
Copyright (c) 2014-2016 Cucumber Ltd, Gaspar Nagy

=cut

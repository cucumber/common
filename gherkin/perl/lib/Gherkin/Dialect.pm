package Gherkin::Dialect;

use strict;
use warnings;

use Gherkin::Exceptions;

use Class::XSAccessor accessors =>
  [ qw/dialect dictionary_location dictionary/, ];

sub new {
    my ( $class, $options ) = @_;
    $options->{'dialect'} ||= 'en';

    unless ( $options->{'dictionary'} ) {

        # Load from a file if one was given
        if ( my $filename = $options->{'dictionary_location'} ) {
            require Cpanel::JSON::XS;
            open( my $fh, '<', $filename ) || die "Can't open [$filename]";
            my $input = join '', (<$fh>);
            close $fh;
            $options->{'dictionary'} = Cpanel::JSON::XS::decode_json($input);
        } else {
            require Gherkin::Generated::Languages;
            $options->{'dictionary'} = $Gherkin::Generated::Languages::data;
        }
    }

    bless $options, $class;
}

sub change_dialect {
    my ( $self, $name, $location ) = @_;
    Gherkin::Exceptions::NoSuchLanguage->throw( $name, $location )
      unless $self->dictionary->{$name};
    $self->{'dialect'} = $name;
}

sub Feature    { $_[0]->dictionary->{ $_[0]->dialect }->{'feature'}; }
sub Rule       { $_[0]->dictionary->{ $_[0]->dialect }->{'rule'}; }
sub Scenario   { $_[0]->dictionary->{ $_[0]->dialect }->{'scenario'}; }
sub Background { $_[0]->dictionary->{ $_[0]->dialect }->{'background'}; }
sub Examples   { $_[0]->dictionary->{ $_[0]->dialect }->{'examples'}; }
sub Given      { $_[0]->dictionary->{ $_[0]->dialect }->{'given'}; }
sub When       { $_[0]->dictionary->{ $_[0]->dialect }->{'when'}; }
sub Then       { $_[0]->dictionary->{ $_[0]->dialect }->{'then'}; }
sub And        { $_[0]->dictionary->{ $_[0]->dialect }->{'and'}; }
sub But        { $_[0]->dictionary->{ $_[0]->dialect }->{'but'}; }

sub ScenarioOutline {
    $_[0]->dictionary->{ $_[0]->dialect }->{'scenarioOutline'};
}

1;


__END__

=head1 NAME

Gherkin::Dialect - Dictionary holding keyword translations

=head1 SYNOPSIS

  use Gherkin::Dialect;

  my $dialect = Gherkin::Dialect->new( { dialect => 'em' } );

  # Print the names of the steps in the current dialect:
  for my $keyword (qw/ Given When Then /) {
    print "Translations for $keyword:\n";
    for my $translation (@{ $dialect->$keyword }) {
      print " - $translation\n";
    }
  }

=head1 DESCRIPTION

Dialects represent translations of the keywords in the Gherkin language. This
module implements a class to manage a set of these dialects and select the
one to be used for keyword translation lookup. Out of the box, Gherkin comes
with actual translations, such as C<Afrikaans> as well as 'slang-like'
translations such as "Pirate English".

This module is used by the L<token matcher|Gherkin::TokenMatcher> to identify
the type of token (input line) passed to the scanner.

=head1 METHODS

=head2 new( $options )

Constructor.

C<$options> is a hashref with some of the following keys:

=over

=item * dialect

The name of the dialect to use for translation lookup. Defaults to 'en'.

=item * dictionary

A hash of hashes, with the names of the dialects as the keys of the
primary hash and the names of the Gherkin keywords as the keys of the
secondary hashes (with the values of the secondary hashes being arrayrefs
holding the actual translations of the keyword).

Mutually exclusive with C<dictionary_location>.

=item * dictionary_location

Pathname to a JSON file which deserializes into the structure mentioned
for the C<dictionary> option.

Mutually exclusive with C<dictionary_location>.

=back

In case neither C<dictionary> nor C<dictionary_location> is specified, the
default dictionary from the L<Cucumber project|https://github.com/cucumber>
is loaded.


=head2 change_dialect( $new_dialect )

Selects a dialect for translation lookup from the current dictionary.


=head1 TRANSLATION LOOKUP FUNCTIONS


=over

=item * Feature

=item * Rule

=item * Scenario

=item * Background

=item * Examples

=item * Given

=item * When

=item * Then

=item * And

=item * But

=item * ScenarioOutline

=back


=head2 SEE ALSO

=over 8

=item * L<Gherkin>

=item * L<Gherkin::TokenMatcher>

=back

=head1 LICENSE

See L<Gherkin>

=cut

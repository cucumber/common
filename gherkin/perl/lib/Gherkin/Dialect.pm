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

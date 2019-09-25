package Gherkin::Generated::Parser;

# This file is generated. Do not edit! Edit gherkin-perl.razor instead.
use strict;
use warnings;

use base 'Gherkin::ParserBase';

our @RULE_TYPES = [
    'None',
    '_EOF',  # #EOF
    '_Empty',  # #Empty
    '_Comment',  # #Comment
    '_TagLine',  # #TagLine
    '_FeatureLine',  # #FeatureLine
    '_RuleLine',  # #RuleLine
    '_BackgroundLine',  # #BackgroundLine
    '_ScenarioLine',  # #ScenarioLine
    '_ExamplesLine',  # #ExamplesLine
    '_StepLine',  # #StepLine
    '_DocStringSeparator',  # #DocStringSeparator
    '_TableRow',  # #TableRow
    '_Language',  # #Language
    '_Other',  # #Other
    'GherkinDocument',  # GherkinDocument! := Feature?
    'Feature',  # Feature! := FeatureHeader Background? ScenarioDefinition* Rule*
    'FeatureHeader',  # FeatureHeader! := #Language? Tags? #FeatureLine DescriptionHelper
    'Rule',  # Rule! := RuleHeader Background? ScenarioDefinition*
    'RuleHeader',  # RuleHeader! := #RuleLine DescriptionHelper
    'Background',  # Background! := #BackgroundLine DescriptionHelper Step*
    'ScenarioDefinition',  # ScenarioDefinition! := Tags? Scenario
    'Scenario',  # Scenario! := #ScenarioLine DescriptionHelper Step* ExamplesDefinition*
    'ExamplesDefinition',  # ExamplesDefinition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples
    'Examples',  # Examples! := #ExamplesLine DescriptionHelper ExamplesTable?
    'ExamplesTable',  # ExamplesTable! := #TableRow #TableRow*
    'Step',  # Step! := #StepLine StepArg?
    'StepArg',  # StepArg := (DataTable | DocString)
    'DataTable',  # DataTable! := #TableRow+
    'DocString',  # DocString! := #DocStringSeparator #Other* #DocStringSeparator
    'Tags',  # Tags! := #TagLine+
    'DescriptionHelper',  # DescriptionHelper := #Empty* Description? #Comment*
    'Description',  # Description! := #Other+
];

our %states_to_match_names = (
    0 => "match_token_at_0",
    1 => "match_token_at_1",
    2 => "match_token_at_2",
    3 => "match_token_at_3",
    4 => "match_token_at_4",
    5 => "match_token_at_5",
    6 => "match_token_at_6",
    7 => "match_token_at_7",
    8 => "match_token_at_8",
    9 => "match_token_at_9",
    10 => "match_token_at_10",
    11 => "match_token_at_11",
    12 => "match_token_at_12",
    13 => "match_token_at_13",
    14 => "match_token_at_14",
    15 => "match_token_at_15",
    16 => "match_token_at_16",
    17 => "match_token_at_17",
    18 => "match_token_at_18",
    19 => "match_token_at_19",
    20 => "match_token_at_20",
    21 => "match_token_at_21",
    22 => "match_token_at_22",
    23 => "match_token_at_23",
    24 => "match_token_at_24",
    25 => "match_token_at_25",
    26 => "match_token_at_26",
    27 => "match_token_at_27",
    28 => "match_token_at_28",
    29 => "match_token_at_29",
    30 => "match_token_at_30",
    31 => "match_token_at_31",
    32 => "match_token_at_32",
    33 => "match_token_at_33",
    34 => "match_token_at_34",
    35 => "match_token_at_35",
    36 => "match_token_at_36",
    37 => "match_token_at_37",
    38 => "match_token_at_38",
    39 => "match_token_at_39",
    40 => "match_token_at_40",
    42 => "match_token_at_42",
    43 => "match_token_at_43",
    44 => "match_token_at_44",
    45 => "match_token_at_45",
    46 => "match_token_at_46",
    47 => "match_token_at_47",
    48 => "match_token_at_48",
    49 => "match_token_at_49",
);

sub parse {
    my ( $self, $token_scanner, $token_matcher ) = @_;
    my $additional = {};
    $additional->{'uri'} = $token_scanner unless ref $token_scanner;

    $token_matcher ||= Gherkin::TokenMatcher->new();
    $token_scanner = Gherkin::TokenScanner->new($token_scanner)
      unless ref $token_scanner && (ref $token_scanner ne 'SCALAR');

    $self->ast_builder->reset();
    $token_matcher->reset();

    my $context = Gherkin::ParserContext->new(
        {
            token_scanner => $token_scanner,
            token_matcher => $token_matcher,
        }
    );

    $self->_start_rule( $context, 'GherkinDocument' );

    my $state = 0;
    my $token;

    while (1) {
        $token = $context->read_token($context);
        $state = $self->match_token( $state, $token, $context );

        last if $token->is_eof();
    }

    $self->_end_rule( $context, 'GherkinDocument', $additional );

    if ( my @errors = $context->errors ) {
        Gherkin::Exceptions::CompositeParser->throw(@errors);
    }

    return $self->get_result();
}

sub match_token {
    my ( $self, $state, $token, $context ) = @_;
    my $method_name = $states_to_match_names{ $state } ||
        die "Unknown state: $state";
    $self->$method_name( $token, $context );
}


sub match_EOF {
    my ($self, $context, $token) = @_;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_EOF
        ( $token ) }
    );
}

sub match_Empty {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_Empty
        ( $token ) }
    );
}

sub match_Comment {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_Comment
        ( $token ) }
    );
}

sub match_TagLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_TagLine
        ( $token ) }
    );
}

sub match_FeatureLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_FeatureLine
        ( $token ) }
    );
}

sub match_RuleLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_RuleLine
        ( $token ) }
    );
}

sub match_BackgroundLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_BackgroundLine
        ( $token ) }
    );
}

sub match_ScenarioLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_ScenarioLine
        ( $token ) }
    );
}

sub match_ExamplesLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_ExamplesLine
        ( $token ) }
    );
}

sub match_StepLine {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_StepLine
        ( $token ) }
    );
}

sub match_DocStringSeparator {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_DocStringSeparator
        ( $token ) }
    );
}

sub match_TableRow {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_TableRow
        ( $token ) }
    );
}

sub match_Language {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_Language
        ( $token ) }
    );
}

sub match_Other {
    my ($self, $context, $token) = @_;
    return if $token->is_eof;
    return $self->handle_external_error(
        $context,
        0, # Default return value
        sub { $context->token_matcher->match_Other
        ( $token ) }
    );
}


# Start
sub match_token_at_0 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Language($context, $token)) {
        $self->_start_rule($context, 'Feature');
        $self->_start_rule($context, 'FeatureHeader');
        $self->_build($context, $token);
        return 1;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_start_rule($context, 'Feature');
        $self->_start_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 2;
    }
    if ($self->match_FeatureLine($context, $token)) {
        $self->_start_rule($context, 'Feature');
        $self->_start_rule($context, 'FeatureHeader');
        $self->_build($context, $token);
        return 3;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 0;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 0;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Language", "#TagLine", "#FeatureLine", "#Comment", "#Empty"], #"
        "State: 0 - Start",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 0;
} 

# GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0
sub match_token_at_1 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 2;
    }
    if ($self->match_FeatureLine($context, $token)) {
        $self->_build($context, $token);
        return 3;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 1;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 1;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#FeatureLine", "#Comment", "#Empty"], #"
        "State: 1 - GherkinDocument:0>Feature:0>FeatureHeader:0>#Language:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 1;
} 

# GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0
sub match_token_at_2 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_build($context, $token);
        return 2;
    }
    if ($self->match_FeatureLine($context, $token)) {
        $self->_end_rule($context, 'Tags');
        $self->_build($context, $token);
        return 3;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 2;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 2;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#FeatureLine", "#Comment", "#Empty"], #"
        "State: 2 - GherkinDocument:0>Feature:0>FeatureHeader:1>Tags:0>#TagLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 2;
} 

# GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0
sub match_token_at_3 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 3;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 5;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 6;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 4;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 3 - GherkinDocument:0>Feature:0>FeatureHeader:2>#FeatureLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 3;
} 

# GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_4 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'FeatureHeader');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 5;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 6;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 4;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 4 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 4;
} 

# GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0
sub match_token_at_5 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 5;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 6;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'FeatureHeader');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 5;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 5 - GherkinDocument:0>Feature:0>FeatureHeader:3>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 5;
} 

# GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0
sub match_token_at_6 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 6;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 8;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 7;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 6 - GherkinDocument:0>Feature:1>Background:0>#BackgroundLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 6;
} 

# GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_7 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 8;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 7;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 7 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 7;
} 

# GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0
sub match_token_at_8 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 8;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 8;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 8 - GherkinDocument:0>Feature:1>Background:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 8;
} 

# GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0
sub match_token_at_9 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'DataTable');
        $self->_build($context, $token);
        return 10;
    }
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_start_rule($context, 'DocString');
        $self->_build($context, $token);
        return 48;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 9;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 9 - GherkinDocument:0>Feature:1>Background:2>Step:0>#StepLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 9;
} 

# GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
sub match_token_at_10 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 10;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 10;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 10;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 10 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 10;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0
sub match_token_at_11 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Tags');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 11;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"], #"
        "State: 11 - GherkinDocument:0>Feature:2>ScenarioDefinition:0>Tags:0>#TagLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 11;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
sub match_token_at_12 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 14;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 13;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 12 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 12;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_13 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 14;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 13;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 13 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 13;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
sub match_token_at_14 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 14;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 14;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 14 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 14;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
sub match_token_at_15 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'DataTable');
        $self->_build($context, $token);
        return 16;
    }
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_start_rule($context, 'DocString');
        $self->_build($context, $token);
        return 46;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 15;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 15 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 15;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
sub match_token_at_16 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 16;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 16;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 16;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 16 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 16;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
sub match_token_at_17 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_build($context, $token);
        return 17;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Tags');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 17;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 17;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"], #"
        "State: 17 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 17;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
sub match_token_at_18 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 20;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 21;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 19;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 18 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 18;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_19 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 20;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 21;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 19;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 19 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 19;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
sub match_token_at_20 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 20;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 21;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 20;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 20 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 20;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
sub match_token_at_21 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 21;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 21;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 21;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 21 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 21;
} 

# GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0
sub match_token_at_22 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 24;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 25;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 23;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 22 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:0>#RuleLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 22;
} 

# GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_23 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 24;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 25;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 23;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 23 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 23;
} 

# GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0
sub match_token_at_24 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 24;
    }
    if ($self->match_BackgroundLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'Background');
        $self->_build($context, $token);
        return 25;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'RuleHeader');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 24;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#BackgroundLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 24 - GherkinDocument:0>Feature:3>Rule:0>RuleHeader:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 24;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0
sub match_token_at_25 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 25;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 27;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 26;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 25 - GherkinDocument:0>Feature:3>Rule:1>Background:0>#BackgroundLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 25;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_26 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 27;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 26;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 26 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 26;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0
sub match_token_at_27 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 27;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 27;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 27 - GherkinDocument:0>Feature:3>Rule:1>Background:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 27;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0
sub match_token_at_28 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'DataTable');
        $self->_build($context, $token);
        return 29;
    }
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_start_rule($context, 'DocString');
        $self->_build($context, $token);
        return 44;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 28;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 28 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:0>#StepLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 28;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
sub match_token_at_29 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 29;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 29;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 29;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 29 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 29;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0
sub match_token_at_30 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Tags');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 30;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#ScenarioLine", "#Comment", "#Empty"], #"
        "State: 30 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:0>Tags:0>#TagLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 30;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0
sub match_token_at_31 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 33;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 32;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 31 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:0>#ScenarioLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 31;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_32 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 33;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 32;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 32 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 32;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0
sub match_token_at_33 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 33;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 33;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 33 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 33;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0
sub match_token_at_34 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'DataTable');
        $self->_build($context, $token);
        return 35;
    }
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_start_rule($context, 'DocString');
        $self->_build($context, $token);
        return 42;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 34;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#DocStringSeparator", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 34 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:0>#StepLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 34;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0
sub match_token_at_35 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 35;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DataTable');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 35;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 35;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 35 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:0>DataTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 35;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0
sub match_token_at_36 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_TagLine($context, $token)) {
        $self->_build($context, $token);
        return 36;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Tags');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 36;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 36;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#TagLine", "#ExamplesLine", "#Comment", "#Empty"], #"
        "State: 36 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:0>Tags:0>#TagLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 36;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0
sub match_token_at_37 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 39;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 40;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_start_rule($context, 'Description');
        $self->_build($context, $token);
        return 38;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Empty", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 37 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:0>#ExamplesLine:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 37;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0
sub match_token_at_38 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_build($context, $token);
        return 39;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 40;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Description');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 38;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Other"], #"
        "State: 38 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:1>Description:0>#Other:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 38;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0
sub match_token_at_39 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 39;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_start_rule($context, 'ExamplesTable');
        $self->_build($context, $token);
        return 40;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 39;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#Comment", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Empty"], #"
        "State: 39 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:1>DescriptionHelper:2>#Comment:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 39;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0
sub match_token_at_40 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_TableRow($context, $token)) {
        $self->_build($context, $token);
        return 40;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'ExamplesTable');
        $self->_end_rule($context, 'Examples');
        $self->_end_rule($context, 'ExamplesDefinition');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 40;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 40;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#TableRow", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 40 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:3>ExamplesDefinition:1>Examples:2>ExamplesTable:0>#TableRow:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 40;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
sub match_token_at_42 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_build($context, $token);
        return 43;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 42;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#DocStringSeparator", "#Other"], #"
        "State: 42 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 42;
} 

# GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
sub match_token_at_43 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 34;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 36;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 37;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 43;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 43;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 43 - GherkinDocument:0>Feature:3>Rule:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 43;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
sub match_token_at_44 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_build($context, $token);
        return 45;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 44;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#DocStringSeparator", "#Other"], #"
        "State: 44 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 44;
} 

# GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
sub match_token_at_45 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 28;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 30;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 31;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Rule');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 45;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 45;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 45 - GherkinDocument:0>Feature:3>Rule:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 45;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
sub match_token_at_46 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_build($context, $token);
        return 47;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 46;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#DocStringSeparator", "#Other"], #"
        "State: 46 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 46;
} 

# GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
sub match_token_at_47 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 15;
    }
    if ($self->match_TagLine($context, $token)) {
        if ($self->lookahead_0($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 17;
        }
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ExamplesLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'ExamplesDefinition');
        $self->_start_rule($context, 'Examples');
        $self->_build($context, $token);
        return 18;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Scenario');
        $self->_end_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 47;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 47;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#StepLine", "#TagLine", "#ExamplesLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 47 - GherkinDocument:0>Feature:2>ScenarioDefinition:1>Scenario:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 47;
} 

# GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0
sub match_token_at_48 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_DocStringSeparator($context, $token)) {
        $self->_build($context, $token);
        return 49;
    }
    if ($self->match_Other($context, $token)) {
        $self->_build($context, $token);
        return 48;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#DocStringSeparator", "#Other"], #"
        "State: 48 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:0>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 48;
} 

# GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0
sub match_token_at_49 {
    my ( $self, $token, $context ) = @_;
    if ($self->match_EOF($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_end_rule($context, 'Feature');
        $self->_build($context, $token);
        return 41;
    }
    if ($self->match_StepLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_start_rule($context, 'Step');
        $self->_build($context, $token);
        return 9;
    }
    if ($self->match_TagLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Tags');
        $self->_build($context, $token);
        return 11;
    }
    if ($self->match_ScenarioLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'ScenarioDefinition');
        $self->_start_rule($context, 'Scenario');
        $self->_build($context, $token);
        return 12;
    }
    if ($self->match_RuleLine($context, $token)) {
        $self->_end_rule($context, 'DocString');
        $self->_end_rule($context, 'Step');
        $self->_end_rule($context, 'Background');
        $self->_start_rule($context, 'Rule');
        $self->_start_rule($context, 'RuleHeader');
        $self->_build($context, $token);
        return 22;
    }
    if ($self->match_Comment($context, $token)) {
        $self->_build($context, $token);
        return 49;
    }
    if ($self->match_Empty($context, $token)) {
        $self->_build($context, $token);
        return 49;
    }

    $token->detach;

    # Create the appropriate error
    my $error_class = "Gherkin::Exceptions::" . (
        $token->is_eof ? 'UnexpectedEOF' : 'UnexpectedToken' );

    my @args = (
        $token,
        ["#EOF", "#StepLine", "#TagLine", "#ScenarioLine", "#RuleLine", "#Comment", "#Empty"], #"
        "State: 49 - GherkinDocument:0>Feature:1>Background:2>Step:1>StepArg:0>__alt0:1>DocString:2>#DocStringSeparator:0",
    );

    $error_class->throw( @args ) if $self->stop_at_first_error;

    eval {$error_class->throw( @args )};
    $self->add_error( $context, $@ );

    return 49;
} 


sub lookahead_0 {
    my ($self, $context, $current_token) = @_;

    $current_token->detach();

    my $token;
    my @queue;
    my $match = 0;

    while (1) {
        $token = $context->read_token();
        $token->detach;
        push( @queue, $token );

        if ($self->match_ExamplesLine($context, $token) || 0) {
            $match = 1;
            last;
        }

        if (! ($self->match_Empty($context, $token) || $self->match_Comment($context, $token) || $self->match_TagLine($context, $token) || 0)) {
            last;
        }

    }

    $context->add_tokens( @queue );
    return $match;
}
1;

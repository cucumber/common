/* This file is generated. Do not edit! Edit gherkin-c-rule-type.razor instead. */
#ifndef GHERKIN_RULE_TYPE_H_
#define GHERKIN_RULE_TYPE_H_

typedef enum RuleType {
    Rule_None = 0,
    Rule_EOF, /* #EOF */
    Rule_Empty, /* #Empty */
    Rule_Comment, /* #Comment */
    Rule_TagLine, /* #TagLine */
    Rule_FeatureLine, /* #FeatureLine */
    Rule_BackgroundLine, /* #BackgroundLine */
    Rule_ScenarioLine, /* #ScenarioLine */
    Rule_ExamplesLine, /* #ExamplesLine */
    Rule_StepLine, /* #StepLine */
    Rule_DocStringSeparator, /* #DocStringSeparator */
    Rule_TableRow, /* #TableRow */
    Rule_Language, /* #Language */
    Rule_Other, /* #Other */
    Rule_GherkinDocument, /* GherkinDocument! := Feature? */
    Rule_Feature, /* Feature! := FeatureHeader Background? ScenarioDefinition* */
    Rule_FeatureHeader, /* FeatureHeader! := #Language? Tags? #FeatureLine DescriptionHelper */
    Rule_Background, /* Background! := #BackgroundLine DescriptionHelper Step* */
    Rule_ScenarioDefinition, /* ScenarioDefinition! := Tags? Scenario */
    Rule_Scenario, /* Scenario! := #ScenarioLine DescriptionHelper Step* ExamplesDefinition* */
    Rule_ExamplesDefinition, /* ExamplesDefinition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples */
    Rule_Examples, /* Examples! := #ExamplesLine DescriptionHelper ExamplesTable? */
    Rule_ExamplesTable, /* ExamplesTable! := #TableRow #TableRow* */
    Rule_Step, /* Step! := #StepLine StepArg? */
    Rule_StepArg, /* StepArg := (DataTable | DocString) */
    Rule_DataTable, /* DataTable! := #TableRow+ */
    Rule_DocString, /* DocString! := #DocStringSeparator #Other* #DocStringSeparator */
    Rule_Tags, /* Tags! := #TagLine+ */
    Rule_DescriptionHelper, /* DescriptionHelper := #Empty* Description? #Comment* */
    Rule_Description, /* Description! := #Other+ */
    Rule_Count
} RuleType;

#endif /* GHERKIN_RULE_TYPE_H_ */

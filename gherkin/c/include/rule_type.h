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
    Rule_ScenarioOutlineLine, /* #ScenarioOutlineLine */
    Rule_ExamplesLine, /* #ExamplesLine */
    Rule_StepLine, /* #StepLine */
    Rule_DocStringSeparator, /* #DocStringSeparator */
    Rule_TableRow, /* #TableRow */
    Rule_Language, /* #Language */
    Rule_Other, /* #Other */
    Rule_GherkinDocument, /* GherkinDocument! := Feature? */
    Rule_Feature, /* Feature! := Feature_Header Background? Scenario_Definition* */
    Rule_Feature_Header, /* Feature_Header! := #Language? Tags? #FeatureLine Description_Helper */
    Rule_Background, /* Background! := #BackgroundLine Description_Helper Step* */
    Rule_Scenario_Definition, /* Scenario_Definition! := Tags? (Scenario | ScenarioOutline) */
    Rule_Scenario, /* Scenario! := #ScenarioLine Description_Helper Step* */
    Rule_ScenarioOutline, /* ScenarioOutline! := #ScenarioOutlineLine Description_Helper Step* Examples_Definition* */
    Rule_Examples_Definition, /* Examples_Definition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples */
    Rule_Examples, /* Examples! := #ExamplesLine Description_Helper Examples_Table? */
    Rule_Examples_Table, /* Examples_Table! := #TableRow #TableRow* */
    Rule_Step, /* Step! := #StepLine Step_Arg? */
    Rule_Step_Arg, /* Step_Arg := (DataTable | DocString) */
    Rule_DataTable, /* DataTable! := #TableRow+ */
    Rule_DocString, /* DocString! := #DocStringSeparator #Other* #DocStringSeparator */
    Rule_Tags, /* Tags! := #TagLine+ */
    Rule_Description_Helper, /* Description_Helper := #Empty* Description? #Comment* */
    Rule_Description, /* Description! := #Other+ */
    Rule_Count
} RuleType;

#endif /* GHERKIN_RULE_TYPE_H_ */

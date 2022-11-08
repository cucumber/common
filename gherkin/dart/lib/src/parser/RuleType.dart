enum RuleType
{
  None,
// ignore: unused_field
	_EOF, // #EOF
// ignore: unused_field
	_Empty, // #Empty
// ignore: unused_field
	_Comment, // #Comment
// ignore: unused_field
	_TagLine, // #TagLine
// ignore: unused_field
	_FeatureLine, // #FeatureLine
// ignore: unused_field
	_RuleLine, // #RuleLine
// ignore: unused_field
	_BackgroundLine, // #BackgroundLine
// ignore: unused_field
	_ScenarioLine, // #ScenarioLine
// ignore: unused_field
	_ExamplesLine, // #ExamplesLine
// ignore: unused_field
	_StepLine, // #StepLine
// ignore: unused_field
	_DocStringSeparator, // #DocStringSeparator
// ignore: unused_field
	_TableRow, // #TableRow
// ignore: unused_field
	_Language, // #Language
// ignore: unused_field
	_Other, // #Other
	GherkinDocument, // GherkinDocument! := Feature?
	Feature, // Feature! := FeatureHeader Background? ScenarioDefinition* Rule*
	FeatureHeader, // FeatureHeader! := #Language? Tags? #FeatureLine DescriptionHelper
	Rule, // Rule! := RuleHeader Background? ScenarioDefinition*
	RuleHeader, // RuleHeader! := #RuleLine DescriptionHelper
	Background, // Background! := #BackgroundLine DescriptionHelper Step*
	ScenarioDefinition, // ScenarioDefinition! := Tags? Scenario
	Scenario, // Scenario! := #ScenarioLine DescriptionHelper Step* ExamplesDefinition*
	ExamplesDefinition, // ExamplesDefinition! [#Empty|#Comment|#TagLine-&gt;#ExamplesLine] := Tags? Examples
	Examples, // Examples! := #ExamplesLine DescriptionHelper ExamplesTable?
	ExamplesTable, // ExamplesTable! := #TableRow #TableRow*
	Step, // Step! := #StepLine StepArg?
	StepArg, // StepArg := (DataTable | DocString)
	DataTable, // DataTable! := #TableRow+
	DocString, // DocString! := #DocStringSeparator #Other* #DocStringSeparator
	Tags, // Tags! := #TagLine+
	DescriptionHelper, // DescriptionHelper := #Empty* Description? #Comment*
	Description, // Description! := #Other+
}

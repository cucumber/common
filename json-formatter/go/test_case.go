package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v7"
	"strings"
)

type TestCase struct {
	FeatureName string
	Scenario    *messages.GherkinDocument_Feature_Scenario
	Pickle      *messages.Pickle
	TestCase    *messages.TestCase
	Steps       []*TestStep
	Tags        []*messages.GherkinDocument_Feature_Tag
}

type SortedSteps struct {
	BeforeHook []*TestStep
	Background []*TestStep
	Steps      []*TestStep
	AfterHook  []*TestStep
}

func ProcessTestCaseStarted(testCaseStarted *messages.TestCaseStarted, lookup *MessageLookup) *TestCase {
	testCase := lookup.LookupTestCase(testCaseStarted.TestCaseId)
	if testCase == nil {
		return nil
	}

	pickle := lookup.LookupPickle(testCase.PickleId)
	if pickle == nil || len(pickle.SourceIds) == 0 {
		return nil
	}
	tags := make([]*messages.GherkinDocument_Feature_Tag, len(pickle.Tags))
	for index, tag := range pickle.Tags {
		sourceTag := lookup.LookupTag(tag.SourceId)
		if sourceTag == nil {
			return nil
		}
		tags[index] = sourceTag
	}

	scenario := lookup.LookupScenario(pickle.SourceIds[0])
	if scenario == nil {
		return nil
	}

	feature := lookup.LookupGherkinDocument(pickle.Uri)
	if feature == nil {
		return nil
	}
	featureName := feature.Feature.Name

	return &TestCase{
		FeatureName: featureName,
		Scenario:    scenario,
		Pickle:      pickle,
		TestCase:    testCase,
		Tags:        tags,
	}
}

func TestCaseToJSON(testCase *TestCase) []*jsonFeatureElement {
	elements := make([]*jsonFeatureElement, 0)
	sortedSteps := testCase.SortedSteps()

	if len(sortedSteps.Background) > 0 {
		elements = append(elements, backgroundStepsToJSON(sortedSteps.Background))
	}

	elements = append(elements, scenarioStepsToJSON(testCase, sortedSteps.Steps))
	return elements
}

func backgroundStepsToJSON(steps []*TestStep) *jsonFeatureElement {
	background := steps[0].Background

	return &jsonFeatureElement{
		Keyword: background.Keyword,
		Line:    background.Location.Line,
		Type:    "background",
		Steps:   makeJSONSteps(steps),
	}
}

func scenarioStepsToJSON(testCase *TestCase, steps []*TestStep) *jsonFeatureElement {
	line := testCase.Scenario.Location.Line
	id := fmt.Sprintf("%s;%s", makeID(testCase.FeatureName), makeID(testCase.Scenario.Name))
	if len(testCase.Pickle.SourceIds) > 1 {
		exampleName := ""
		exampleIndex := 0

		for _, example := range testCase.Scenario.Examples {
			for index, row := range example.TableBody {
				if row.Id == testCase.Pickle.SourceIds[1] {
					line = row.Location.Line
					exampleName = example.Name
					// +2 as the index is a one-based index and the table header is taken into account
					exampleIndex = index + 2
				}
			}
		}
		id = fmt.Sprintf(
			"%s;%s;%s;%d",
			makeID(testCase.FeatureName),
			makeID(testCase.Scenario.Name),
			makeID(exampleName),
			exampleIndex,
		)
	}

	return &jsonFeatureElement{
		ID:          id,
		Keyword:     testCase.Scenario.Keyword,
		Type:        "scenario",
		Name:        testCase.Scenario.Name,
		Description: testCase.Scenario.Description,
		Line:        line,
		Steps:       makeJSONSteps(steps),
		Tags:        makeJSONTags(testCase.Tags),
	}
}

func makeJSONSteps(steps []*TestStep) []*jsonStep {
	jsonSteps := make([]*jsonStep, len(steps))
	for index, step := range steps {
		jsonSteps[index] = TestStepToJSON(step)
	}
	return jsonSteps
}

func makeJSONTags(tags []*messages.GherkinDocument_Feature_Tag) []*jsonTag {
	jsonTags := make([]*jsonTag, len(tags))
	for index, tag := range tags {
		jsonTags[index] = &jsonTag{
			Name: tag.Name,
			Line: tag.Location.Line,
		}
	}
	return jsonTags
}

func (self *TestCase) appendStep(step *TestStep) {
	self.Steps = append(self.Steps, step)
}

func (self *TestCase) SortedSteps() *SortedSteps {
	sorted := &SortedSteps{}
	current := &sorted.BeforeHook

	for _, step := range self.Steps {
		if current == &sorted.BeforeHook && step.Hook == nil {
			current = &sorted.Background
		}
		if current == &sorted.Background && step.Background == nil {
			current = &sorted.Steps
		}
		if current == &sorted.Steps && step.Hook != nil {
			current = &sorted.AfterHook
		}

		*current = append(*current, step)
	}

	return sorted
}

func makeID(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

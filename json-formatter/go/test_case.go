package json

import (
	"fmt"
	"github.com/cucumber/messages-go/v9"
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
		panic("No testCase for " + testCaseStarted.TestCaseId)
		return nil
	}

	pickle := lookup.LookupPickle(testCase.PickleId)
	if pickle == nil || len(pickle.AstNodeIds) == 0 {
		panic("No pickle for " + testCase.PickleId)
		return nil
	}
	tags := make([]*messages.GherkinDocument_Feature_Tag, len(pickle.Tags))
	for index, tag := range pickle.Tags {
		sourceTag := lookup.LookupTag(tag.AstNodeId)
		if sourceTag == nil {
			panic("No sourceTag for " + tag.AstNodeId)
			return nil
		}
		tags[index] = sourceTag
	}

	scenario := lookup.LookupScenario(pickle.AstNodeIds[0])
	if scenario == nil {
		panic(fmt.Sprintf("No scenario for %s", strings.Join(pickle.AstNodeIds, ", ")))
		return nil
	}

	feature := lookup.LookupGherkinDocument(pickle.Uri)
	if feature == nil {
		panic("No feature for " + pickle.Uri)
		return nil
	}
	featureName := feature.Feature.Name

	return &TestCase{
		FeatureName: featureName,
		Scenario:    scenario,
		Pickle:      pickle,
		TestCase:    testCase,
		Steps:       make([]*TestStep, 0),
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

	if len(sortedSteps.BeforeHook) > 0 {
		elements[0].Before = makeJSONSteps(sortedSteps.BeforeHook)
	}

	if len(sortedSteps.AfterHook) > 0 {
		elements[len(elements)-1].After = makeJSONSteps(sortedSteps.AfterHook)
	}

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
	if len(testCase.Pickle.AstNodeIds) > 1 {
		exampleName := ""
		exampleIndex := 0

		for _, example := range testCase.Scenario.Examples {
			for index, row := range example.TableBody {
				if row.Id == testCase.Pickle.AstNodeIds[1] {
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
	if step == nil {
		panic("step is nil")
	}
	if self.Steps == nil {
		panic("self.Steps is nil")
	}
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

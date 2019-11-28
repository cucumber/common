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
	}
}

func TestCaseToJSON(testCase *TestCase) []*jsonFeatureElement {
	elements := make([]*jsonFeatureElement, 1)
	renderedSteps := make([]*jsonStep, len(testCase.Steps))

	for index, step := range testCase.Steps {
		renderedSteps[index] = TestStepToJSON(step)
	}

	elements[0] = &jsonFeatureElement{
		ID:          fmt.Sprintf("%s;%s", makeID(testCase.FeatureName), makeID(testCase.Scenario.Name)),
		Keyword:     testCase.Scenario.Keyword,
		Type:        "scenario",
		Name:        testCase.Pickle.Name,
		Description: testCase.Scenario.Description,
		Line:        testCase.Scenario.Location.Line,
		Steps:       renderedSteps,
	}
	return elements
}

func (self *TestCase) appendStep(step *TestStep) {
	self.Steps = append(self.Steps, step)
}

func makeID(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

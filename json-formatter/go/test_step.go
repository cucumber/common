package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v7"
	"strings"
)

type TestStep struct {
	TestCaseID      string
	Hook            *messages.TestCaseHookDefinitionConfig
	Pickle          *messages.Pickle
	PickleStep      *messages.Pickle_PickleStep
	Step            *messages.GherkinDocument_Feature_Step
	StepDefinitions []*messages.StepDefinitionConfig
	Result          *messages.TestResult
}

func ProcessTestStepFinished(testStepFinished *messages.TestStepFinished, lookup *MessageLookup) *TestStep {
	testCaseStarted := lookup.LookupTestCaseStarted(testStepFinished.TestCaseStartedId)
	if testCaseStarted == nil {
		return nil
	}

	testCase := lookup.LookupTestCase(testCaseStarted.TestCaseId)
	if testCase == nil {
		return nil
	}

	testStep := lookup.LookupTestStep(testStepFinished.TestStepId)
	if testStep == nil {
		return nil
	}

	if testStep.HookId != "" {
		hook := lookup.LookupTestCaseHookDefinitionConfig(testStep.HookId)
		if hook == nil {
			return nil
		}

		return &TestStep{
			TestCaseID: testCase.Id,
			Hook:       hook,
			Result:     testStepFinished.TestResult,
		}
	}

	pickle := lookup.LookupPickle(testCase.PickleId)
	if pickle == nil {
		return nil
	}

	pickleStep := lookup.LookupPickleStep(testStep.PickleStepId)
	if pickleStep == nil {
		return nil
	}

	return &TestStep{
		TestCaseID:      testCase.Id,
		Step:            lookup.LookupStep(pickleStep.SourceIds[0]),
		Pickle:          pickle,
		PickleStep:      pickleStep,
		Result:          testStepFinished.TestResult,
		StepDefinitions: lookup.LookupStepDefinitionConfigs(testStep.StepDefinitionId),
	}
}

func TestStepToJSON(step *TestStep) *jsonStep {
	status := strings.ToLower(step.Result.Status.String())

	if step.Hook != nil {
		return &jsonStep{
			Match: &jsonStepMatch{
				Location: makeLocation(step.Hook.Location.Uri, step.Hook.Location.Location.Line),
			},
			Result: &jsonStepResult{
				Status:       status,
				ErrorMessage: step.Result.Message,
			},
		}
	}

	location := makeLocation(step.Pickle.Uri, step.Step.Location.Line)
	if len(step.StepDefinitions) == 1 {
		location = makeLocation(
			step.StepDefinitions[0].Location.Uri,
			step.StepDefinitions[0].Location.Location.Line,
		)
	}

	return &jsonStep{
		Keyword: step.Step.Keyword,
		Name:    step.PickleStep.Text,
		Line:    step.Step.Location.Line,
		Match: &jsonStepMatch{
			Location: location,
		},
		Result: &jsonStepResult{
			Status:       status,
			ErrorMessage: step.Result.Message,
		},
	}
}

func makeLocation(file string, line uint32) string {
	return fmt.Sprintf("%s:%d", file, line)
}

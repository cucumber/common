package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v7"
	"strings"
)

type TestStep struct {
	Hook       *messages.TestCaseHookDefinitionConfig
	PickleStep *messages.Pickle_PickleStep
	Step       *messages.GherkinDocument_Feature_Step
	Result     *messages.TestResult
}

func ProcessTestStepFinished(testStepFinished *messages.TestStepFinished, lookup *MessageLookup) *TestStep {
	step := lookup.LookupTestStep(testStepFinished.TestStepId)
	if step == nil {
		return nil
	}

	if step.HookId != "" {
		hook := lookup.LookupTestCaseHookDefinitionConfig(step.HookId)
		if hook == nil {
			return nil
		}

		return &TestStep{
			Hook:   hook,
			Result: testStepFinished.TestResult,
		}
	}

	pickleStep := lookup.LookupPickleStep(step.PickleStepId)
	if pickleStep == nil {
		return nil
	}

	featureStep := lookup.LookupStep(pickleStep.SourceIds[0])
	return &TestStep{
		PickleStep: pickleStep,
		Step:       featureStep,
		Result:     testStepFinished.TestResult,
	}
}

func TestStepToJSON(step *TestStep) *jsonStep {
	status := strings.ToLower(step.Result.Status.String())
	return &jsonStep{
		Match: &jsonStepMatch{
			Location: fmt.Sprintf("%s:%d", step.Hook.Location.Uri, step.Hook.Location.Location.Line),
		},
		Result: &jsonStepResult{
			Status:       status,
			ErrorMessage: step.Result.Message,
		},
	}
}

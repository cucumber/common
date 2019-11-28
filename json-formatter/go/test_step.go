package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v7"
	"strings"
)

type TestStep struct {
	Hook            *messages.TestCaseHookDefinitionConfig
	Step            *messages.GherkinDocument_Feature_Step
	StepDefinitions []*messages.StepDefinitionConfig
	Result          *messages.TestResult
}

func ProcessTestStepFinished(testStepFinished *messages.TestStepFinished, lookup *MessageLookup) *TestStep {
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
			Hook:   hook,
			Result: testStepFinished.TestResult,
		}
	}

	pickleStep := lookup.LookupPickleStep(testStep.PickleStepId)
	if pickleStep == nil {
		return nil
	}

	return &TestStep{
		Step:            lookup.LookupStep(pickleStep.SourceIds[0]),
		Result:          testStepFinished.TestResult,
		StepDefinitions: lookup.LookupStepDefinitionConfigs(testStep.StepDefinitionId),
	}
}

func TestStepToJSON(step *TestStep) *jsonStep {
	status := strings.ToLower(step.Result.Status.String())

	if step.Hook != nil {
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

	return &jsonStep{
		Keyword: step.Step.Keyword,
		Name:    step.Step.Text,
		Result: &jsonStepResult{
			Status:       status,
			ErrorMessage: step.Result.Message,
		},
	}
}

package json

import (
	"github.com/cucumber/common/messages/go/v17"
)

func makeScenario(id string, steps []*messages.Step) *messages.Scenario {
	return &messages.Scenario{
		Id:    id,
		Steps: steps,
	}
}

func makeGherkinStep(id string, keyword string, text string) *messages.Step {
	return &messages.Step{
		Id:      id,
		Keyword: keyword,
		Text:    text,
	}
}

func makeTestStep(id string, pickleStepId string, stepDefinitionIds []string) *messages.TestStep {
	return &messages.TestStep{
		Id:                id,
		PickleStepId:      pickleStepId,
		StepDefinitionIds: stepDefinitionIds,
	}
}

func makeHookTestStep(id string, hookId string) *messages.TestStep {
	return &messages.TestStep{
		Id:     id,
		HookId: hookId,
	}
}

func makeTestCase(id string, pickleId string, testSteps []*messages.TestStep) *messages.TestCase {
	return &messages.TestCase{
		Id:        id,
		PickleId:  pickleId,
		TestSteps: testSteps,
	}
}

func makeTestCaseEnvelope(testCase *messages.TestCase) *messages.Envelope {
	return &messages.Envelope{
		TestCase: testCase,
	}
}

func makeTestCaseStartedEnvelope(testCaseStarted *messages.TestCaseStarted) *messages.Envelope {
	return &messages.Envelope{
		TestCaseStarted: testCaseStarted,
	}
}

func makeHookEnvelope(testCaseHook *messages.Hook) *messages.Envelope {
	return &messages.Envelope{
		Hook: testCaseHook,
	}
}

func makeStepDefinitionEnvelope(stepDefinitionConfig *messages.StepDefinition) *messages.Envelope {
	return &messages.Envelope{
		StepDefinition: stepDefinitionConfig,
	}
}

func makePickleEnvelope(pickle *messages.Pickle) *messages.Envelope {
	return &messages.Envelope{
		Pickle: pickle,
	}
}

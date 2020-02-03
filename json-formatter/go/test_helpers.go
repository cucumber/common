package json

import (
	"github.com/cucumber/messages-go/v9"
)

func makeScenario(id string, steps []*messages.GherkinDocument_Feature_Step) *messages.GherkinDocument_Feature_Scenario {
	return &messages.GherkinDocument_Feature_Scenario{
		Id:    id,
		Steps: steps,
	}
}

func makeGherkinStep(id string, keyword string, text string) *messages.GherkinDocument_Feature_Step {
	return &messages.GherkinDocument_Feature_Step{
		Id:      id,
		Keyword: keyword,
		Text:    text,
	}
}

func makeTestStep(id string, pickleStepId string, stepDefinitionIds []string) *messages.TestCase_TestStep {
	return &messages.TestCase_TestStep{
		Id:                id,
		PickleStepId:      pickleStepId,
		StepDefinitionIds: stepDefinitionIds,
	}
}

func makeHookTestStep(id string, hookId string) *messages.TestCase_TestStep {
	return &messages.TestCase_TestStep{
		Id:     id,
		HookId: hookId,
	}
}

func makeTestCase(id string, pickleId string, testSteps []*messages.TestCase_TestStep) *messages.TestCase {
	return &messages.TestCase{
		Id:        id,
		PickleId:  pickleId,
		TestSteps: testSteps,
	}
}

func makeTestCaseEnvelope(testCase *messages.TestCase) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestCase{
			TestCase: testCase,
		},
	}
}

func makeTestCaseStartedEnvelope(testCaseStarted *messages.TestCaseStarted) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestCaseStarted{
			TestCaseStarted: testCaseStarted,
		},
	}
}

func makeHookEnvelope(testCaseHook *messages.Hook) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_Hook{
			Hook: testCaseHook,
		},
	}
}

func makeStepDefinitionEnvelope(stepDefinitionConfig *messages.StepDefinition) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_StepDefinition{
			StepDefinition: stepDefinitionConfig,
		},
	}
}

func makePickleEnvelope(pickle *messages.Pickle) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_Pickle{
			Pickle: pickle,
		},
	}
}

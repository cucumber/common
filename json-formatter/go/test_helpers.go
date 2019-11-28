package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v7"
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
		Id:               id,
		PickleStepId:     pickleStepId,
		StepDefinitionId: stepDefinitionIds,
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

func makeTestCaseHookDefinitionConfigEnvelope(testCaseHook *messages.TestCaseHookDefinitionConfig) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestCaseHookDefinitionConfig{
			TestCaseHookDefinitionConfig: testCaseHook,
		},
	}
}

func makeStepDefinitionConfigEnvelope(stepDefinitionConfig *messages.StepDefinitionConfig) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_StepDefinitionConfig{
			StepDefinitionConfig: stepDefinitionConfig,
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

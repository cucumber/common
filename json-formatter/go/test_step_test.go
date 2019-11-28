package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v7"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("ProcessTestStepFinished", func() {
	var (
		lookup *MessageLookup
	)

	BeforeEach(func() {
		lookup = &MessageLookup{}
		lookup.Initialize(false)
	})

	It("returns nil if the step does not exist", func() {
		testStepFinished := &messages.TestStepFinished{
			TestStepId: "unknown-step",
		}
		testStep := ProcessTestStepFinished(testStepFinished, lookup)

		Expect(testStep).To(BeNil())
	})

	Context("When step references a Hook", func() {
		BeforeEach(func() {
			lookup.ProcessMessage(
				makeTestCaseHookDefinitionConfigEnvelope(
					&messages.TestCaseHookDefinitionConfig{
						Id: "hook-id",
					},
				),
			)

			lookup.ProcessMessage(
				makeTestCaseEnvelope(
					makeTestCase([]*messages.TestCase_TestStep{
						makeHookTestStep("hook-step-id", "hook-id"),
						makeHookTestStep("wrong-hook-step-id", "unknown-hook-id"),
					}),
				),
			)
		})

		It("returns a Step referencing the Hook", func() {
			testStepFinished := &messages.TestStepFinished{
				TestStepId: "hook-step-id",
				TestResult: &messages.TestResult{
					Status: messages.TestResult_PASSED,
				},
			}

			testStep := ProcessTestStepFinished(testStepFinished, lookup)

			Expect(testStep.Hook.Id).To(Equal("hook-id"))
			Expect(testStep.Result.Status).To(Equal(messages.TestResult_PASSED))
		})

		It("returns a Step with PickleStep and Step nil", func() {
			testStepFinished := &messages.TestStepFinished{
				TestStepId: "hook-step-id",
			}

			testStep := ProcessTestStepFinished(testStepFinished, lookup)

			Expect(testStep.PickleStep).To(BeNil())
			Expect(testStep.Step).To(BeNil())
		})

		It("returns nil if the Hook does not exist", func() {
			testStepFinished := &messages.TestStepFinished{
				TestStepId: "wrong-hook-step-id",
			}
			testStep := ProcessTestStepFinished(testStepFinished, lookup)

			Expect(testStep).To(BeNil())
		})
	})

	Context("When step references a PickleStep", func() {
		BeforeEach(func() {
			// This is a bit dirty hack to avoid creating all the AST
			step := makeGherkinStep("step-id", "Given", "a passed step")
			scenario := makeScenario("scenario-id", []*messages.GherkinDocument_Feature_Step{
				step,
			})
			lookup.stepByID[step.Id] = step
			lookup.scenarioByID[scenario.Id] = scenario

			pickleStep := &messages.Pickle_PickleStep{
				Id:        "pickle-step-id",
				SourceIds: []string{step.Id},
				Text:      "a passed step",
			}
			pickle := &messages.Pickle{
				Id:        "pickle-id",
				SourceIds: []string{scenario.Id},
				Steps: []*messages.Pickle_PickleStep{
					pickleStep,
				},
			}

			lookup.ProcessMessage(
				makePickleEnvelope(pickle),
			)

			lookup.ProcessMessage(
				makeTestCaseEnvelope(
					makeTestCase([]*messages.TestCase_TestStep{
						makeTestStep("test-step-id", "pickle-step-id"),
						makeTestStep("unknown-pickle", "unknown-pickle-step-id"),
					}),
				),
			)
		})

		It("returns a Step referencing the Step and PickleStep", func() {
			testStepFinished := &messages.TestStepFinished{
				TestStepId: "test-step-id",
				TestResult: &messages.TestResult{
					Status: messages.TestResult_PASSED,
				},
			}

			testStep := ProcessTestStepFinished(testStepFinished, lookup)

			Expect(testStep.PickleStep.Id).To(Equal("pickle-step-id"))
			Expect(testStep.Step.Id).To(Equal("step-id"))
		})

		It("Returns Nil if the pickle step is unknown", func() {
			testStepFinished := &messages.TestStepFinished{
				TestStepId: "unknown-pickle",
			}

			testStep := ProcessTestStepFinished(testStepFinished, lookup)
			Expect(testStep).To(BeNil())
		})
	})
})

var _ = Describe("TestStepToJSON", func() {
	var (
		step     *TestStep
		jsonStep *jsonStep
	)

	Context("When TestStep comes from a Hook", func() {
		BeforeEach(func() {
			step = &TestStep{
				Hook: &messages.TestCaseHookDefinitionConfig{
					Location: &messages.SourceReference{
						Uri: "some/hooks.go",
						Location: &messages.Location{
							Column: 3,
							Line:   12,
						},
					},
				},
				Result: &messages.TestResult{
					Status: messages.TestResult_PASSED,
				},
			}
			jsonStep = TestStepToJSON(step)
		})

		It("Has a Match", func() {
			Expect(jsonStep.Match.Location).To(Equal("some/hooks.go:12"))
		})

		It("Has a Result", func() {
			Expect(jsonStep.Result.Status).To(Equal("passed"))
		})
	})

	Context("When TestStep comes from a feature step", func() {
		BeforeEach(func() {
			step = &TestStep{
				Step: makeGherkinStep(
					"some-id",
					"Given",
					"a passed step",
				),
				Result: &messages.TestResult{
					Status: messages.TestResult_FAILED,
				},
			}
			jsonStep = TestStepToJSON(step)
		})

		It("gets keyword from Step", func() {
			Expect(jsonStep.Keyword).To(Equal("Given"))
		})

		It("gets name from Step", func() {
			Expect(jsonStep.Name).To(Equal("a passed step"))
		})

		It("Has a Result", func() {
			Expect(jsonStep.Result.Status).To(Equal("failed"))
		})
	})
})

// Test helpers

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

func makeTestStep(id string, pickleStepId string) *messages.TestCase_TestStep {
	return &messages.TestCase_TestStep{
		Id:           id,
		PickleStepId: pickleStepId,
	}
}

func makeHookTestStep(id string, hookId string) *messages.TestCase_TestStep {
	return &messages.TestCase_TestStep{
		Id:     id,
		HookId: hookId,
	}
}

func makeTestCase(testSteps []*messages.TestCase_TestStep) *messages.TestCase {
	return &messages.TestCase{
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

func makeTestCaseHookDefinitionConfigEnvelope(testCaseHook *messages.TestCaseHookDefinitionConfig) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_TestCaseHookDefinitionConfig{
			TestCaseHookDefinitionConfig: testCaseHook,
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

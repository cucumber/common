package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v7"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("TestCase.appendStep", func() {
	var (
		testCase       *TestCase
		hookTestStep   *TestStep
		pickleTestStep *TestStep
	)

	BeforeEach(func() {
		testCase = &TestCase{}
		hookTestStep = &TestStep{
			Hook: &messages.TestCaseHookDefinitionConfig{
				Id: "my-hook",
			},
		}
		pickleTestStep = &TestStep{
			PickleStep: &messages.Pickle_PickleStep{
				Id: "pickle-step",
			},
		}
	})

	It("appends a TestStep to the list of steps", func() {
		Expect(len(testCase.Steps)).To(Equal(0))
		testCase.appendStep(hookTestStep)
		Expect(len(testCase.Steps)).To(Equal(1))
	})

	It("does not lose existing steps", func() {
		testCase.appendStep(hookTestStep)
		testCase.appendStep(pickleTestStep)

		Expect(testCase.Steps[0].Hook.Id).To(Equal("my-hook"))
		Expect(testCase.Steps[1].PickleStep.Id).To(Equal("pickle-step"))
	})
})

var _ = Describe("TestCase.SortedSteps", func() {
	var (
		firstBeforeHookStep  *TestStep
		secondBeforeHookStep *TestStep
		firstBackgroundStep  *TestStep
		secondBackgroundStep *TestStep
		firstPickleStep      *TestStep
		secondPickleStep     *TestStep
		firstAfterHookStep   *TestStep
		secondAfterHookStep  *TestStep
	)
	BeforeEach(func() {
		firstBeforeHookStep = &TestStep{
			Hook: &messages.TestCaseHookDefinitionConfig{
				Id: "hook-1",
			},
		}
		secondBeforeHookStep = &TestStep{
			Hook: &messages.TestCaseHookDefinitionConfig{
				Id: "hook-2",
			},
		}

		firstBackgroundStep = &TestStep{
			IsBackgroundStep: true,
			PickleStep: &messages.Pickle_PickleStep{
				Id: "step-1",
			},
		}

		secondBackgroundStep = &TestStep{
			IsBackgroundStep: true,
			PickleStep: &messages.Pickle_PickleStep{
				Id: "step-2",
			},
		}

		firstPickleStep = &TestStep{
			PickleStep: &messages.Pickle_PickleStep{
				Id: "step-3",
			},
		}

		secondPickleStep = &TestStep{
			PickleStep: &messages.Pickle_PickleStep{
				Id: "step-4",
			},
		}

		firstAfterHookStep = &TestStep{
			Hook: &messages.TestCaseHookDefinitionConfig{
				Id: "hook-3",
			},
		}
		secondAfterHookStep = &TestStep{
			Hook: &messages.TestCaseHookDefinitionConfig{
				Id: "hook-4",
			},
		}
	})

	It("returns a SortedSteps", func() {
		testCase := &TestCase{}
		sorted := testCase.SortedSteps()

		Expect(len(sorted.BeforeHook)).To(Equal(0))
		Expect(len(sorted.Background)).To(Equal(0))
		Expect(len(sorted.Steps)).To(Equal(0))
		Expect(len(sorted.AfterHook)).To(Equal(0))
	})

	It("adds the steps coming from the Scenario in SortedSteps.Steps", func() {
		testCase := &TestCase{
			Steps: []*TestStep{firstPickleStep},
		}
		sorted := testCase.SortedSteps()

		Expect(sorted.Steps[0]).To(Equal(firstPickleStep))
	})

	It("adds the background steps in SortedSteps.Background", func() {
		testCase := &TestCase{
			Steps: []*TestStep{firstBackgroundStep},
		}
		sorted := testCase.SortedSteps()

		Expect(sorted.Background[0]).To(Equal(firstBackgroundStep))
	})

	It("adds any Hook step before a PickleStep in SortedSteps.BeforeHook", func() {
		testCase := &TestCase{
			Steps: []*TestStep{
				firstBeforeHookStep,
				firstPickleStep,
			},
		}
		sorted := testCase.SortedSteps()

		Expect(sorted.BeforeHook[0]).To(Equal(firstBeforeHookStep))
		Expect(sorted.Steps[0]).To(Equal(firstPickleStep))
	})

	It("adds any Hook step after a PickleStep in SortedSteps.AfterHook", func() {
		testCase := &TestCase{
			Steps: []*TestStep{
				firstPickleStep,
				firstAfterHookStep,
			},
		}
		sorted := testCase.SortedSteps()

		Expect(sorted.Steps[0]).To(Equal(firstPickleStep))
		Expect(sorted.AfterHook[0]).To(Equal(firstAfterHookStep))
	})

	It("keeps correct order of the steps", func() {
		testCase := &TestCase{
			Steps: []*TestStep{
				firstBeforeHookStep,
				secondBeforeHookStep,
				firstBackgroundStep,
				secondBackgroundStep,
				firstPickleStep,
				secondPickleStep,
				firstAfterHookStep,
				secondAfterHookStep,
			},
		}
		sorted := testCase.SortedSteps()

		Expect(sorted.BeforeHook[0]).To(Equal(firstBeforeHookStep))
		Expect(sorted.BeforeHook[1]).To(Equal(secondBeforeHookStep))
		Expect(sorted.Background[0]).To(Equal(firstBackgroundStep))
		Expect(sorted.Background[1]).To(Equal(secondBackgroundStep))
		Expect(sorted.Steps[0]).To(Equal(firstPickleStep))
		Expect(sorted.Steps[1]).To(Equal(secondPickleStep))
		Expect(sorted.AfterHook[0]).To(Equal(firstAfterHookStep))
		Expect(sorted.AfterHook[1]).To(Equal(secondAfterHookStep))
	})
})

var _ = Describe("ProcessTestCaseStarted", func() {
	var (
		lookup   *MessageLookup
		testCase *TestCase
		document *messages.GherkinDocument
		scenario *messages.GherkinDocument_Feature_Scenario
	)

	BeforeEach(func() {
		lookup = &MessageLookup{}
		lookup.Initialize(false)

		// This is a bit dirty hack to avoid creating all the AST
		document = &messages.GherkinDocument{
			Uri: "feature-uri",
			Feature: &messages.GherkinDocument_Feature{
				Name: "My feature",
			},
		}
		scenario = makeScenario("scenario-id", []*messages.GherkinDocument_Feature_Step{})
		tag := &messages.GherkinDocument_Feature_Tag{
			Id:   "tag-id",
			Name: "@scenario-tag",
		}

		lookup.gherkinDocumentByURI[document.Uri] = document
		lookup.scenarioByID[scenario.Id] = scenario
		lookup.tagByID[tag.Id] = tag

		pickle := &messages.Pickle{
			Id:        "pickle-id",
			Uri:       document.Uri,
			SourceIds: []string{scenario.Id},
			Tags: []*messages.Pickle_PickleTag{
				&messages.Pickle_PickleTag{
					SourceId: tag.Id,
				},
			},
		}
		lookup.ProcessMessage(makePickleEnvelope(pickle))

		testCaseMsg := makeTestCase(
			"test-case-id",
			pickle.Id,
			[]*messages.TestCase_TestStep{},
		)
		lookup.ProcessMessage(makeTestCaseEnvelope(testCaseMsg))

		testCase = ProcessTestCaseStarted(&messages.TestCaseStarted{
			TestCaseId: testCaseMsg.Id,
		}, lookup)
	})

	It("Has the feature name", func() {
		Expect(testCase.FeatureName).To(Equal("My feature"))
	})

	It("has a reference to the TestCase (message)", func() {
		Expect(testCase.TestCase.Id).To(Equal("test-case-id"))
	})

	It("has a reference to the Pickle", func() {
		Expect(testCase.Pickle.Id).To(Equal("pickle-id"))
	})

	It("has a reference to the scenario", func() {
		Expect(testCase.Scenario.Id).To(Equal("scenario-id"))
	})

	It("has the tags", func() {
		Expect(testCase.Tags[0].Id).To(Equal("tag-id"))
		Expect(testCase.Tags[0].Name).To(Equal("@scenario-tag"))
	})

	Context("with referencing issues", func() {
		var (
			testCaseReferencingUnknownPickle            *messages.TestCase
			testCaseForPickleWithoutSource              *messages.TestCase
			testCaseForPickleWithWrongScenarioReference *messages.TestCase
			testCaseForPickleWithWrongDocumentURI       *messages.TestCase
			testCaseForPickleWithUnknownTag             *messages.TestCase
		)

		BeforeEach(func() {
			testCaseReferencingUnknownPickle = makeTestCase(
				"wrong-pickle-test-case",
				"unknown-pickle-id",
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseReferencingUnknownPickle))

			pickleWithoutSource := &messages.Pickle{
				Id:        "empty-pickle-id",
				SourceIds: []string{},
			}
			testCaseForPickleWithoutSource = makeTestCase(
				"empty-pickle-test-case",
				pickleWithoutSource.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithoutSource))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithoutSource))

			pickleWithWrongScenarioReference := &messages.Pickle{
				Id:        "unknown-scenario-pickle",
				SourceIds: []string{"this-is-not-a-scenario"},
			}
			testCaseForPickleWithWrongScenarioReference = makeTestCase(
				"unknow-scenario-test-case",
				pickleWithWrongScenarioReference.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithWrongScenarioReference))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithWrongScenarioReference))

			pickleWithWrongDocumentURI := &messages.Pickle{
				Uri:       "some-file-hardly-be-found",
				Id:        "wrong-document-uri",
				SourceIds: []string{scenario.Id},
			}
			testCaseForPickleWithWrongDocumentURI = makeTestCase(
				"wrong-document-uri",
				pickleWithWrongDocumentURI.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithWrongDocumentURI))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithWrongDocumentURI))

			pickleWithUnknownTag := &messages.Pickle{
				Id:        "wrong-tag-id-pickle",
				Uri:       document.Uri,
				SourceIds: []string{scenario.Id},
				Tags: []*messages.Pickle_PickleTag{
					&messages.Pickle_PickleTag{
						SourceId: "tag-id",
					},
					&messages.Pickle_PickleTag{
						SourceId: "wrong-tag-id",
					},
				},
			}
			testCaseForPickleWithUnknownTag = makeTestCase(
				"wrong-tag-id",
				pickleWithUnknownTag.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithUnknownTag))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithUnknownTag))
		})

		It("returns nil if the TestCase has not been defined", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: "unknown-test-case-id",
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle is Unknown", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseReferencingUnknownPickle.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle has no source", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithoutSource.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle references an unknown scenario", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithWrongScenarioReference.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle does not reference an existing Gherkin document", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithWrongDocumentURI.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns Nil at least one PickleTag references a non-existing tag", func() {
			testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithUnknownTag.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})
	})
})

var _ = Describe("TestCaseToJSON", func() {
	var (
		testCase     *TestCase
		jsonTestCase []*jsonFeatureElement
	)

	BeforeEach(func() {
		pickle := &messages.Pickle{
			Uri:  "some_examples.feature",
			Name: "A scenario (2)",
		}

		testCase = &TestCase{
			FeatureName: "My feature",
			Scenario: &messages.GherkinDocument_Feature_Scenario{
				Keyword:     "Zenario",
				Name:        "A scenario (<exampleId>)",
				Description: "This is a scenario",
				Location: &messages.Location{
					Line: 42,
				},
			},
			Pickle: pickle,
			TestCase: makeTestCase(
				"test-case-id",
				"pickle-id",
				[]*messages.TestCase_TestStep{},
			),
			Tags: []*messages.GherkinDocument_Feature_Tag{
				&messages.GherkinDocument_Feature_Tag{
					Location: &messages.Location{
						Line: 3,
					},
					Name: "@foo",
				},
			},
		}

		testCase.appendStep(&TestStep{
			Step: &messages.GherkinDocument_Feature_Step{
				Id:      "some-id",
				Keyword: "Given",
				Text:    "a <status> step",
				Location: &messages.Location{
					Line: 5,
				},
			},
			Pickle: pickle,
			PickleStep: &messages.Pickle_PickleStep{
				Text: "a passed step",
			},
			Result: &messages.TestResult{
				Status: messages.TestResult_FAILED,
			},
		})
		jsonTestCase = TestCaseToJSON(testCase)
	})

	It("computes the ID from the FeatureName and Scenario name", func() {
		Expect(jsonTestCase[0].ID).To(Equal("my-feature;a-scenario-(<exampleid>)"))
	})

	It("has the Scenario keyword", func() {
		Expect(jsonTestCase[0].Keyword).To(Equal("Zenario"))
	})

	It("has the Pickle name", func() {
		Expect(jsonTestCase[0].Name).To(Equal("A scenario (2)"))
	})

	It("has the Scenario description", func() {
		Expect(jsonTestCase[0].Description).To(Equal("This is a scenario"))
	})

	It("has the Scenario line", func() {
		Expect(jsonTestCase[0].Line).To(Equal(uint32(42)))
	})

	It("has the steps rendered in Steps", func() {
		Expect(len(jsonTestCase[0].Steps)).To(Equal(1))
		Expect(jsonTestCase[0].Steps[0].Name).To(Equal("a passed step"))
	})

	It("has the Tags", func() {
		Expect(len(jsonTestCase[0].Tags)).To(Equal(1))
		Expect(jsonTestCase[0].Tags[0].Line).To(Equal(uint32(3)))
		Expect(jsonTestCase[0].Tags[0].Name).To(Equal("@foo"))
	})
})

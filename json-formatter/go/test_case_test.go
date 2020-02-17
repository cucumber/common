package json

import (
	"github.com/cucumber/messages-go/v10"
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
		testCase = &TestCase{
			Steps: make([]*TestStep, 0),
		}
		hookTestStep = &TestStep{
			Hook: &messages.Hook{
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
			Hook: &messages.Hook{
				Id: "hook-1",
			},
		}
		secondBeforeHookStep = &TestStep{
			Hook: &messages.Hook{
				Id: "hook-2",
			},
		}

		background := &messages.GherkinDocument_Feature_Background{}
		firstBackgroundStep = &TestStep{
			Background: background,
			PickleStep: &messages.Pickle_PickleStep{
				Id: "step-1",
			},
		}

		secondBackgroundStep = &TestStep{
			Background: background,
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
			Hook: &messages.Hook{
				Id: "hook-3",
			},
		}
		secondAfterHookStep = &TestStep{
			Hook: &messages.Hook{
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
		pickle   *messages.Pickle
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

		pickle = &messages.Pickle{
			Id:         "pickle-id",
			Uri:        document.Uri,
			AstNodeIds: []string{scenario.Id},
			Tags: []*messages.Pickle_PickleTag{
				{
					AstNodeId: tag.Id,
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

		_, testCase = ProcessTestCaseStarted(&messages.TestCaseStarted{
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
				Id:         "empty-pickle-id",
				AstNodeIds: []string{},
			}
			testCaseForPickleWithoutSource = makeTestCase(
				"empty-pickle-test-case",
				pickleWithoutSource.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithoutSource))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithoutSource))

			pickleWithWrongScenarioReference := &messages.Pickle{
				Id:         "unknown-scenario-pickle",
				AstNodeIds: []string{"this-is-not-a-scenario"},
			}
			testCaseForPickleWithWrongScenarioReference = makeTestCase(
				"unknow-scenario-test-case",
				pickleWithWrongScenarioReference.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithWrongScenarioReference))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithWrongScenarioReference))

			pickleWithWrongDocumentURI := &messages.Pickle{
				Uri:        "some-file-hardly-be-found",
				Id:         "wrong-document-uri",
				AstNodeIds: []string{scenario.Id},
			}
			testCaseForPickleWithWrongDocumentURI = makeTestCase(
				"wrong-document-uri",
				pickleWithWrongDocumentURI.Id,
				[]*messages.TestCase_TestStep{},
			)
			lookup.ProcessMessage(makePickleEnvelope(pickleWithWrongDocumentURI))
			lookup.ProcessMessage(makeTestCaseEnvelope(testCaseForPickleWithWrongDocumentURI))

			pickleWithUnknownTag := &messages.Pickle{
				Id:         "wrong-tag-id-pickle",
				Uri:        document.Uri,
				AstNodeIds: []string{scenario.Id},
				Tags: []*messages.Pickle_PickleTag{
					{
						AstNodeId: "tag-id",
					},
					{
						AstNodeId: "wrong-tag-id",
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
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: "unknown-test-case-id",
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle is Unknown", func() {
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseReferencingUnknownPickle.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle has no source", func() {
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithoutSource.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle references an unknown scenario", func() {
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithWrongScenarioReference.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns nil if the Pickle does not reference an existing Gherkin document", func() {
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithWrongDocumentURI.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})

		It("returns Nil at least one PickleTag references a non-existing tag", func() {
			_, testCase := ProcessTestCaseStarted(&messages.TestCaseStarted{
				TestCaseId: testCaseForPickleWithUnknownTag.Id,
			}, lookup)

			Expect(testCase).To(BeNil())
		})
	})
})

var _ = Describe("TestCaseToJSON", func() {
	var (
		pickle       *messages.Pickle
		testCase     *TestCase
		jsonTestCase []*jsonFeatureElement
	)

	BeforeEach(func() {
		scenario := &messages.GherkinDocument_Feature_Scenario{
			Id:          "scenario-id",
			Keyword:     "Eksempel",
			Name:        "A scenario (<exampleId>)",
			Description: "This is a scenario",
			Location: &messages.Location{
				Line: 11,
			},
		}

		pickle = &messages.Pickle{
			Uri:        "some_examples.feature",
			Name:       "A scenario (2)",
			AstNodeIds: []string{scenario.Id},
		}

		testCase = &TestCase{
			FeatureName: "My feature",
			Scenario:    scenario,
			Pickle:      pickle,
			TestCase: makeTestCase(
				"test-case-id",
				"pickle-id",
				[]*messages.TestCase_TestStep{},
			),
			Tags: []*messages.GherkinDocument_Feature_Tag{
				{
					Location: &messages.Location{
						Line: 3,
					},
					Name: "@foo",
				},
			},
			Steps: make([]*TestStep, 0),
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
			Result: &messages.TestStepResult{
				Status: messages.TestStepResult_FAILED,
			},
		})
		jsonTestCase = TestCaseToJSON(testCase)
	})

	It("computes the ID from the FeatureName and Scenario name", func() {
		Expect(jsonTestCase[0].ID).To(Equal("my-feature;a-scenario-(<exampleid>)"))
	})

	It("has the Scenario keyword", func() {
		Expect(jsonTestCase[0].Keyword).To(Equal("Eksempel"))
	})

	// It does not sadly: we use Cucumber-ruby for producing the
	// acceptance tests, which does not support that (but Cucumber-JVM,
	// Cucumber-JS do ...)
	XIt("should have the Pickle name", func() {})

	It("has the Scenario name", func() {
		Expect(jsonTestCase[0].Name).To(Equal("A scenario (<exampleId>)"))
	})

	It("has the Scenario description", func() {
		Expect(jsonTestCase[0].Description).To(Equal("This is a scenario"))
	})

	It("has the Scenario line", func() {
		Expect(jsonTestCase[0].Line).To(Equal(uint32(11)))
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

	Context("when there is a Background", func() {
		BeforeEach(func() {
			testCase.Steps = []*TestStep{
				{
					Step: &messages.GherkinDocument_Feature_Step{
						Id:      "background-step-id",
						Keyword: "Given",
						Text:    "a passed step",
						Location: &messages.Location{
							Line: 3,
						},
					},
					Pickle: pickle,
					PickleStep: &messages.Pickle_PickleStep{
						Text: "a passed step",
					},
					Result: &messages.TestStepResult{
						Status: messages.TestStepResult_PASSED,
						Duration: &messages.Duration{
							Seconds: 123,
							Nanos:   456,
						},
					},
					Background: &messages.GherkinDocument_Feature_Background{
						Keyword: "Kontext",
						Location: &messages.Location{
							Line: 3,
						},
					},
				},
				testCase.Steps[0],
			}
			jsonTestCase = TestCaseToJSON(testCase)
		})

		It("returns two jsonFeatureElements", func() {
			Expect(len(jsonTestCase)).To(Equal(2))
		})

		It("has the Background keyword", func() {
			Expect(jsonTestCase[0].Keyword).To(Equal("Kontext"))
		})

		It("has the background line", func() {
			Expect(jsonTestCase[0].Line).To(Equal(uint32(3)))
		})
	})

	Context("when pickles come from a Examples row", func() {
		BeforeEach(func() {
			exampleRow := &messages.GherkinDocument_Feature_TableRow{
				Id: "example-row-id",
				Location: &messages.Location{
					Line: 13,
				},
			}

			testCase.Scenario.Examples = []*messages.GherkinDocument_Feature_Scenario_Examples{
				{
					Name: "some examples",
					TableBody: []*messages.GherkinDocument_Feature_TableRow{
						exampleRow,
					},
				},
			}

			testCase.Pickle.AstNodeIds = append(testCase.Pickle.AstNodeIds, exampleRow.Id)
			jsonTestCase = TestCaseToJSON(testCase)
		})

		It("has the Examples table name and ExampleRow line in the Id", func() {
			Expect(jsonTestCase[0].ID).To(Equal("my-feature;a-scenario-(<exampleid>);some-examples;2"))
		})

		It("has the Example row line", func() {
			Expect(jsonTestCase[0].Line).To(Equal(uint32(13)))
		})
	})

	Context("when there is Before Hooks", func() {
		BeforeEach(func() {
			testCase.Steps = []*TestStep{
				{
					Hook: &messages.Hook{
						SourceReference: &messages.SourceReference{
							Uri: "some_hooks.rb",
							Location: &messages.Location{
								Line: 5,
							},
						},
					},
					Result: &messages.TestStepResult{
						Status: messages.TestStepResult_PASSED,
						Duration: &messages.Duration{
							Seconds: 123,
							Nanos:   456,
						},
					},
				},
				testCase.Steps[0],
			}
			jsonTestCase = TestCaseToJSON(testCase)

		})

		It("has the Hook steps in the Before field in the first Element", func() {
			Expect(jsonTestCase[0].Before[0].Match.Location).To(Equal("some_hooks.rb:5"))
		})
	})

	Context("when there is After Hooks", func() {
		BeforeEach(func() {
			testCase.Steps = append(testCase.Steps, &TestStep{
				Hook: &messages.Hook{
					SourceReference: &messages.SourceReference{
						Uri: "some_hooks.rb",
						Location: &messages.Location{
							Line: 12,
						},
					},
				},
				Result: &messages.TestStepResult{
					Status: messages.TestStepResult_PASSED,
					Duration: &messages.Duration{
						Seconds: 123,
						Nanos:   456,
					},
				},
			})
			jsonTestCase = TestCaseToJSON(testCase)
		})

		It("has the hooks in the After section of the last Element", func() {
			Expect(jsonTestCase[0].After[0].Match.Location).To(Equal("some_hooks.rb:12"))
		})
	})
})

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
		lookup.gherkinDocumentByURI[document.Uri] = document
		scenario = makeScenario("scenario-id", []*messages.GherkinDocument_Feature_Step{})
		lookup.scenarioByID[scenario.Id] = scenario

		pickle := &messages.Pickle{
			Id:        "pickle-id",
			Uri:       document.Uri,
			SourceIds: []string{scenario.Id},
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

	Context("with referencing issues", func() {
		var (
			testCaseReferencingUnknownPickle            *messages.TestCase
			testCaseForPickleWithoutSource              *messages.TestCase
			testCaseForPickleWithWrongScenarioReference *messages.TestCase
			testCaseForPickleWithWrongDocumentURI       *messages.TestCase
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
})

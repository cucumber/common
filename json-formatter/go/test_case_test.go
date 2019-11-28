package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v7"
	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

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

		lookup.ProcessMessage(
			makePickleEnvelope(&messages.Pickle{
				Id:        "pickle-id",
				Uri:       document.Uri,
				SourceIds: []string{scenario.Id},
			}),
		)

		lookup.ProcessMessage(
			makeTestCaseEnvelope(
				makeTestCase(
					"test-case-id",
					"pickle-id",
					[]*messages.TestCase_TestStep{},
				),
			),
		)

		testCase = ProcessTestCaseStarted(&messages.TestCaseStarted{
			TestCaseId: "test-case-id",
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
				TestCaseId: "unknown-id",
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
			Pickle: &messages.Pickle{
				Name: "A scenario (2)",
			},
			TestCase: makeTestCase(
				"test-case-id",
				"pickle-id",
				[]*messages.TestCase_TestStep{},
			),
		}
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
})

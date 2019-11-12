package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v6"
)

type MessageLookup struct {
	gherkinDocumentByURI     map[string]*messages.GherkinDocument
	pickleByID               map[string]*messages.Pickle
	pickleStepByID           map[string]*messages.Pickle_PickleStep
	testCaseByID             map[string]*messages.TestCase
	testStepByID             map[string]*messages.TestCase_TestStep
	testCaseStartedByID      map[string]*messages.TestCaseStarted
	stepByID                 map[string]*messages.GherkinDocument_Feature_Step
	scenarioByID             map[string]*messages.GherkinDocument_Feature_Scenario
	exampleByRowID           map[string]*messages.GherkinDocument_Feature_Scenario_Examples
	exampleRowByID           map[string]*messages.GherkinDocument_Feature_TableRow
	stepDefinitionConfigByID map[string]*messages.StepDefinitionConfig
	backgroundByStepId       map[string]*messages.GherkinDocument_Feature_Background
	tagByID                  map[string]*messages.GherkinDocument_Feature_Tag
}

func (self *MessageLookup) Initialize() {
	self.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	self.pickleByID = make(map[string]*messages.Pickle)
	self.pickleStepByID = make(map[string]*messages.Pickle_PickleStep)
	self.testCaseByID = make(map[string]*messages.TestCase)
	self.testStepByID = make(map[string]*messages.TestCase_TestStep)
	self.testCaseStartedByID = make(map[string]*messages.TestCaseStarted)
	self.stepByID = make(map[string]*messages.GherkinDocument_Feature_Step)
	self.scenarioByID = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	self.exampleByRowID = make(map[string]*messages.GherkinDocument_Feature_Scenario_Examples)
	self.exampleRowByID = make(map[string]*messages.GherkinDocument_Feature_TableRow)
	self.stepDefinitionConfigByID = make(map[string]*messages.StepDefinitionConfig)
	self.backgroundByStepId = make(map[string]*messages.GherkinDocument_Feature_Background)
	self.tagByID = make(map[string]*messages.GherkinDocument_Feature_Tag)
}

func (self *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	switch m := envelope.Message.(type) {
	case *messages.Envelope_GherkinDocument:
		self.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument
		for _, tag := range m.GherkinDocument.Feature.Tags {
			self.tagByID[tag.Id] = tag
		}

		for _, child := range m.GherkinDocument.Feature.Children {
			background := child.GetBackground()
			if background != nil {
				for _, step := range background.Steps {
					self.backgroundByStepId[step.Id] = background
					self.stepByID[step.Id] = step
				}
			}

			scenario := child.GetScenario()
			if scenario != nil {
				self.scenarioByID[scenario.Id] = scenario
				for _, tag := range scenario.Tags {
					self.tagByID[tag.Id] = tag
				}

				for _, step := range scenario.Steps {
					self.stepByID[step.Id] = step
				}

				for _, example := range scenario.Examples {
					for _, row := range example.TableBody {
						// TODO: we may also need to add IDs to the examples
						self.exampleByRowID[row.Id] = example
						self.exampleRowByID[row.Id] = row
					}
				}
			}
		}

	case *messages.Envelope_Pickle:
		self.pickleByID[m.Pickle.Id] = m.Pickle

		for _, step := range m.Pickle.Steps {
			self.pickleStepByID[step.Id] = step
		}

	case *messages.Envelope_TestCase:
		self.testCaseByID[m.TestCase.Id] = m.TestCase

		for _, step := range m.TestCase.TestSteps {
			self.testStepByID[step.Id] = step
		}

	case *messages.Envelope_TestCaseStarted:
		self.testCaseStartedByID[m.TestCaseStarted.Id] = m.TestCaseStarted

	case *messages.Envelope_CommandStart:
		for _, stepDefinitionConfig := range m.CommandStart.SupportCodeConfig.StepDefinitionConfigs {
			self.stepDefinitionConfigByID[stepDefinitionConfig.Id] = stepDefinitionConfig
		}
	}

	return nil
}

func (self *MessageLookup) LookupGherkinDocument(uri string) *messages.GherkinDocument {
	return self.gherkinDocumentByURI[uri]
}

func (self *MessageLookup) LookupScenario(id string) *messages.GherkinDocument_Feature_Scenario {
	return self.scenarioByID[id]
}

func (self *MessageLookup) LookupStep(id string) *messages.GherkinDocument_Feature_Step {
	return self.stepByID[id]
}

func (self *MessageLookup) LookupExample(id string) *messages.GherkinDocument_Feature_Scenario_Examples {
	return self.exampleByRowID[id]
}

func (self *MessageLookup) LookupExampleRow(id string) *messages.GherkinDocument_Feature_TableRow {
	return self.exampleRowByID[id]
}

func (self *MessageLookup) LookupBrackgroundByStepId(id string) *messages.GherkinDocument_Feature_Background {
	return self.backgroundByStepId[id]
}

func (self *MessageLookup) LookupTagByID(id string) *messages.GherkinDocument_Feature_Tag {
	return self.tagByID[id]
}

func (self *MessageLookup) LookupTestCaseStartedByID(id string) *messages.TestCaseStarted {
	return self.testCaseStartedByID[id]
}

func (self *MessageLookup) LookupTestCaseByID(id string) *messages.TestCase {
	return self.testCaseByID[id]
}

func (self *MessageLookup) LookupTestStepByID(id string) *messages.TestCase_TestStep {
	return self.testStepByID[id]
}

func (self *MessageLookup) LookupPickleStepByID(id string) *messages.Pickle_PickleStep {
	return self.pickleStepByID[id]
}

func (self *MessageLookup) LookupStepDefinitionConfigsByIDs(ids []string) []*messages.StepDefinitionConfig {
	stepDefinitions := make([]*messages.StepDefinitionConfig, len(ids))
	for index, id := range ids {
		stepDefinitions[index] = self.LookupStepDefinitionConfigByID(id)
	}
	return stepDefinitions
}

func (self *MessageLookup) LookupStepDefinitionConfigByID(id string) *messages.StepDefinitionConfig {
	return self.stepDefinitionConfigByID[id]
}

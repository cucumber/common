package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v6"
)

type MessageLookup struct {
	gherkinDocumentByURI   map[string]*messages.GherkinDocument
	pickleByID             map[string]*messages.Pickle
	testCaseByID           map[string]*messages.TestCase
	testCaseStartedByID    map[string]*messages.TestCaseStarted
	stepByID               map[string]*messages.GherkinDocument_Feature_Step
	scenarioByID           map[string]*messages.GherkinDocument_Feature_Scenario
	exampleRowByID         map[string]*messages.GherkinDocument_Feature_TableRow
	backgroundStepIds      map[string]string
	backgroundByFeatureURI map[string]*messages.GherkinDocument_Feature_Background
}

func (self *MessageLookup) Initialize() {
	self.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	self.pickleByID = make(map[string]*messages.Pickle)
	self.testCaseByID = make(map[string]*messages.TestCase)
	self.testCaseStartedByID = make(map[string]*messages.TestCaseStarted)
	self.stepByID = make(map[string]*messages.GherkinDocument_Feature_Step)
	self.scenarioByID = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	self.exampleRowByID = make(map[string]*messages.GherkinDocument_Feature_TableRow)
	self.backgroundStepIds = make(map[string]string)
	self.backgroundByFeatureURI = make(map[string]*messages.GherkinDocument_Feature_Background)
}

func (self *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	switch m := envelope.Message.(type) {
	case *messages.Envelope_GherkinDocument:
		self.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument

		for _, child := range m.GherkinDocument.Feature.Children {
			background := child.GetBackground()
			if background != nil {
				for _, step := range background.Steps {
					self.backgroundStepIds[step.Id] = m.GherkinDocument.Uri
					self.backgroundByFeatureURI[m.GherkinDocument.Uri] = background
					self.stepByID[step.Id] = step
				}
			}

			scenario := child.GetScenario()
			if scenario != nil {
				self.scenarioByID[scenario.Id] = scenario
				for _, step := range scenario.Steps {
					self.stepByID[step.Id] = step
				}

				for _, example := range scenario.Examples {
					for _, row := range example.TableBody {
						self.exampleRowByID[row.Id] = row
					}
				}
			}
		}

	case *messages.Envelope_Pickle:
		self.pickleByID[m.Pickle.Id] = m.Pickle

	case *messages.Envelope_TestCase:
		self.testCaseByID[m.TestCase.Id] = m.TestCase

	case *messages.Envelope_TestCaseStarted:
		self.testCaseStartedByID[m.TestCaseStarted.Id] = m.TestCaseStarted
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

func (self *MessageLookup) IsBackgroundStep(id string) bool {
	_, ok := self.backgroundStepIds[id]
	return ok
}

func (self *MessageLookup) LookupBrackgroundByStepId(id string) *messages.GherkinDocument_Feature_Background {
	backgroundURI, _ := self.backgroundStepIds[id]
	return self.backgroundByFeatureURI[backgroundURI]
}

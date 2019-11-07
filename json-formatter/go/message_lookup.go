package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v6"
)

type MessageLookup struct {
	gherkinDocumentByURI map[string]*messages.GherkinDocument
	pickleByID           map[string]*messages.Pickle
	testCaseByID         map[string]*messages.TestCase
	testCaseStartedByID  map[string]*messages.TestCaseStarted
	stepByID             map[string]*messages.GherkinDocument_Feature_Step
	scenarioByID         map[string]*messages.GherkinDocument_Feature_Scenario
	exampleRowByID       map[string]*messages.GherkinDocument_Feature_TableRow
}

func (self *MessageLookup) Initialize() {
	self.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	self.pickleByID = make(map[string]*messages.Pickle)
	self.testCaseByID = make(map[string]*messages.TestCase)
	self.testCaseStartedByID = make(map[string]*messages.TestCaseStarted)
	self.stepByID = make(map[string]*messages.GherkinDocument_Feature_Step)
	self.scenarioByID = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	self.exampleRowByID = make(map[string]*messages.GherkinDocument_Feature_TableRow)
}

func (self *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	switch m := envelope.Message.(type) {
	case *messages.Envelope_GherkinDocument:
		self.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument

		for _, child := range m.GherkinDocument.Feature.Children {
			if child.GetBackground() != nil {
				//self.backgroundByUri[m.GherkinDocument.Uri] = child.GetBackground()
				for _, step := range child.GetBackground().Steps {
					self.stepByID[step.Id] = step
				}
			}

			scenario := child.GetScenario()
			if scenario != nil {
				fmt.Println("Adding scenario", scenario.Name)
				fmt.Println("Scenario ID", scenario.Id)
				self.scenarioByID[scenario.Id] = scenario
				fmt.Println("scenarios stored:", len(self.scenarioByID))
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

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
	exampleByRowID       map[string]*messages.GherkinDocument_Feature_Scenario_Examples
	exampleRowByID       map[string]*messages.GherkinDocument_Feature_TableRow

	// Temporary: need a better structure in the messages
	backgroundStepIds      map[string]string
	backgroundByFeatureURI map[string]*messages.GherkinDocument_Feature_Background
	tagByURIAndName        map[string]*messages.GherkinDocument_Feature_Tag
}

func (self *MessageLookup) Initialize() {
	self.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	self.pickleByID = make(map[string]*messages.Pickle)
	self.testCaseByID = make(map[string]*messages.TestCase)
	self.testCaseStartedByID = make(map[string]*messages.TestCaseStarted)
	self.stepByID = make(map[string]*messages.GherkinDocument_Feature_Step)
	self.scenarioByID = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	self.exampleByRowID = make(map[string]*messages.GherkinDocument_Feature_Scenario_Examples)
	self.exampleRowByID = make(map[string]*messages.GherkinDocument_Feature_TableRow)
	self.backgroundStepIds = make(map[string]string)
	self.backgroundByFeatureURI = make(map[string]*messages.GherkinDocument_Feature_Background)
	self.tagByURIAndName = make(map[string]*messages.GherkinDocument_Feature_Tag)
}

func (self *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	switch m := envelope.Message.(type) {
	case *messages.Envelope_GherkinDocument:
		self.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument
		for _, tag := range m.GherkinDocument.Feature.Tags {
			self.tagByURIAndName[tagKey(m.GherkinDocument.Uri, tag.Name)] = tag
		}

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
				for _, tag := range scenario.Tags {
					self.tagByURIAndName[tagKey(m.GherkinDocument.Uri, tag.Name)] = tag
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

func (self *MessageLookup) LookupExample(id string) *messages.GherkinDocument_Feature_Scenario_Examples {
	return self.exampleByRowID[id]
}

func (self *MessageLookup) LookupExampleRow(id string) *messages.GherkinDocument_Feature_TableRow {
	return self.exampleRowByID[id]
}

func (self *MessageLookup) IsBackgroundStep(id string) bool {
	_, ok := self.backgroundStepIds[id]
	return ok
}

func (self *MessageLookup) LookupBrackgroundByStepId(id string) *messages.GherkinDocument_Feature_Background {
	backgroundURI, _ := self.backgroundStepIds[id]
	return self.backgroundByFeatureURI[backgroundURI]
}

func (self *MessageLookup) LookupTagByURIAndName(featureURI string, name string) *messages.GherkinDocument_Feature_Tag {
	return self.tagByURIAndName[tagKey(featureURI, name)]
}

func tagKey(featureURI string, tagValue string) string {
	return fmt.Sprintf("%s-%s", featureURI, tagValue)
}

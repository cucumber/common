package json

import (
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v8"
)

type MessageLookup struct {
	gherkinDocumentByURI    map[string]*messages.GherkinDocument
	pickleByID              map[string]*messages.Pickle
	pickleStepByID          map[string]*messages.Pickle_PickleStep
	testCaseByID            map[string]*messages.TestCase
	testStepByID            map[string]*messages.TestCase_TestStep
	testCaseStartedByID     map[string]*messages.TestCaseStarted
	stepByID                map[string]*messages.GherkinDocument_Feature_Step
	scenarioByID            map[string]*messages.GherkinDocument_Feature_Scenario
	exampleByRowID          map[string]*messages.GherkinDocument_Feature_Scenario_Examples
	exampleRowByID          map[string]*messages.GherkinDocument_Feature_TableRow
	stepDefinitionByID      map[string]*messages.StepDefinition
	backgroundByStepID      map[string]*messages.GherkinDocument_Feature_Background
	tagByID                 map[string]*messages.GherkinDocument_Feature_Tag
	hookByID                map[string]*messages.Hook
	attachmentsByTestStepID map[string][]*messages.Attachment
	verbose                 bool
}

func (self *MessageLookup) Initialize(verbose bool) {
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
	self.stepDefinitionByID = make(map[string]*messages.StepDefinition)
	self.backgroundByStepID = make(map[string]*messages.GherkinDocument_Feature_Background)
	self.tagByID = make(map[string]*messages.GherkinDocument_Feature_Tag)
	self.hookByID = make(map[string]*messages.Hook)
	self.attachmentsByTestStepID = make(map[string][]*messages.Attachment)

	self.verbose = verbose
}

func (self *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	switch m := envelope.Message.(type) {
	case *messages.Envelope_GherkinDocument:
		self.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument
		self.comment(fmt.Sprintf("Stored GherkinDocument: %s", m.GherkinDocument.Uri))
		for key, _ := range self.gherkinDocumentByURI {
			self.comment(fmt.Sprintf(" - %s ", key))
		}
		for _, tag := range m.GherkinDocument.Feature.Tags {
			self.tagByID[tag.Id] = tag
		}

		for _, child := range m.GherkinDocument.Feature.Children {
			background := child.GetBackground()
			if background != nil {
				for _, step := range background.Steps {
					self.backgroundByStepID[step.Id] = background
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

	case *messages.Envelope_Attachment:
		attachments, ok := self.attachmentsByTestStepID[m.Attachment.TestStepId]
		if !ok {
			attachments = make([]*messages.Attachment, 0)
			self.attachmentsByTestStepID[m.Attachment.TestStepId] = attachments
		}
		attachments = append(attachments, m.Attachment)
		self.attachmentsByTestStepID[m.Attachment.TestStepId] = attachments

	case *messages.Envelope_StepDefinition:
		self.stepDefinitionByID[m.StepDefinition.Id] = m.StepDefinition

	case *messages.Envelope_Hook:
		self.hookByID[m.Hook.Id] = m.Hook
	}

	return nil
}

func (self *MessageLookup) LookupGherkinDocument(uri string) *messages.GherkinDocument {
	item, ok := self.gherkinDocumentByURI[uri]
	if ok {
		self.informFoundKey(uri, "gherkinDocumentByURI")
	} else {
		self.informMissingKey(uri, "gherkinDocumentByURI")
	}
	return item
}

func (self *MessageLookup) LookupScenario(id string) *messages.GherkinDocument_Feature_Scenario {
	item, ok := self.scenarioByID[id]
	if ok {
		self.informFoundKey(id, "scenarioByID")
	} else {
		self.informMissingKey(id, "scenarioByID")
	}
	return item
}

func (self *MessageLookup) LookupPickle(id string) *messages.Pickle {
	item, ok := self.pickleByID[id]
	if ok {
		self.informFoundKey(id, "pickleByID")
	} else {
		self.informMissingKey(id, "pickleByID")
	}
	return item
}

func (self *MessageLookup) LookupStep(id string) *messages.GherkinDocument_Feature_Step {
	item, ok := self.stepByID[id]
	if ok {
		self.informFoundKey(id, "stepByID")
	} else {
		self.informMissingKey(id, "stepByID")
	}
	return item
}

func (self *MessageLookup) LookupExample(id string) *messages.GherkinDocument_Feature_Scenario_Examples {
	item, ok := self.exampleByRowID[id]
	if ok {
		self.informFoundKey(id, "exampleByRowID")
	} else {
		self.informMissingKey(id, "exampleByRowID")
	}
	return item
}

func (self *MessageLookup) LookupExampleRow(id string) *messages.GherkinDocument_Feature_TableRow {
	item, ok := self.exampleRowByID[id]
	if ok {
		self.informFoundKey(id, "exampleRowByID")
	} else {
		self.informMissingKey(id, "exampleRowByID")
	}
	return item
}

func (self *MessageLookup) LookupBackgroundByStepID(id string) *messages.GherkinDocument_Feature_Background {
	item, ok := self.backgroundByStepID[id]
	if ok {
		self.informFoundKey(id, "backgroundByStepID")
	} else {
		self.informMissingKey(id, "backgroundByStepID")
	}
	return item
}

func (self *MessageLookup) LookupTag(id string) *messages.GherkinDocument_Feature_Tag {
	item, ok := self.tagByID[id]
	if ok {
		self.informFoundKey(id, "tagByID")
	} else {
		self.informMissingKey(id, "tagByID")
	}
	return item
}

func (self *MessageLookup) LookupTestCaseStarted(id string) *messages.TestCaseStarted {
	item, ok := self.testCaseStartedByID[id]
	if ok {
		self.informFoundKey(id, "testCaseStartedByID")
	} else {
		self.informMissingKey(id, "testCaseStartedByID")
	}
	return item
}

func (self *MessageLookup) LookupTestCase(id string) *messages.TestCase {
	item, ok := self.testCaseByID[id]
	if ok {
		self.informFoundKey(id, "testCaseByID")
	} else {
		self.informMissingKey(id, "testCaseByID")
	}
	return item
}

func (self *MessageLookup) LookupTestStep(id string) *messages.TestCase_TestStep {
	item, ok := self.testStepByID[id]
	if ok {
		self.informFoundKey(id, "testStepByID")
	} else {
		self.informMissingKey(id, "testStepByID")
	}
	return item
}

func (self *MessageLookup) LookupPickleStep(id string) *messages.Pickle_PickleStep {
	item, ok := self.pickleStepByID[id]
	if ok {
		self.informFoundKey(id, "pickleStepByID")
	} else {
		self.informMissingKey(id, "pickleStepByID")
	}
	return item
}

func (self *MessageLookup) LookupStepDefinitions(ids []string) []*messages.StepDefinition {
	stepDefinitions := make([]*messages.StepDefinition, len(ids))
	for index, id := range ids {
		stepDefinitions[index] = self.LookupStepDefinition(id)
	}
	return stepDefinitions
}

func (self *MessageLookup) LookupStepDefinition(id string) *messages.StepDefinition {
	item, ok := self.stepDefinitionByID[id]
	if ok {
		self.informFoundKey(id, "stepDefinitionByID")
	} else {
		self.informMissingKey(id, "stepDefinitionByID")
	}
	return item
}

func (self *MessageLookup) LookupHook(id string) *messages.Hook {
	item, ok := self.hookByID[id]
	if ok {
		self.informFoundKey(id, "hookByID")
	} else {
		self.informMissingKey(id, "hookByID")
	}
	return item
}

func (self *MessageLookup) LookupAttachments(testStepId string) []*messages.Attachment {
	item, ok := self.attachmentsByTestStepID[testStepId]
	if ok {
		self.informFoundKey(testStepId, "attachmentsByTestStepID")
	} else {
		self.informMissingKey(testStepId, "attachmentsByTestStepID")
	}
	return item
}

func (self *MessageLookup) informFoundKey(key string, mapName string) {
	self.comment((fmt.Sprintf("Found item'%s' in %s", key, mapName)))
}

func (self *MessageLookup) informMissingKey(key string, mapName string) {
	self.comment((fmt.Sprintf("Unable to find '%s' in %s", key, mapName)))
}

func (self *MessageLookup) comment(message string) {
	if self.verbose {
		fmt.Println(fmt.Sprintf("// LookUp: %s", message))
	}
}

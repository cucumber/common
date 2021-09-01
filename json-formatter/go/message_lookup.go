package json

import (
	"fmt"

	"github.com/cucumber/common/messages/go/v17"
)

type MessageLookup struct {
	gherkinDocumentByURI    map[string]*messages.GherkinDocument
	pickleByID              map[string]*messages.Pickle
	pickleStepByID          map[string]*messages.PickleStep
	testCaseByID            map[string]*messages.TestCase
	testStepByID            map[string]*messages.TestStep
	testCaseStartedByID     map[string]*messages.TestCaseStarted
	stepByID                map[string]*messages.Step
	scenarioByID            map[string]*messages.Scenario
	exampleByRowID          map[string]*messages.Examples
	exampleRowByID          map[string]*messages.TableRow
	stepDefinitionByID      map[string]*messages.StepDefinition
	backgroundByStepID      map[string]*messages.Background
	tagByID                 map[string]*messages.Tag
	hookByID                map[string]*messages.Hook
	attachmentsByTestStepID map[string][]*messages.Attachment
	verbose                 bool
}

func (ml *MessageLookup) Initialize(verbose bool) {
	ml.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	ml.pickleByID = make(map[string]*messages.Pickle)
	ml.pickleStepByID = make(map[string]*messages.PickleStep)
	ml.testCaseByID = make(map[string]*messages.TestCase)
	ml.testStepByID = make(map[string]*messages.TestStep)
	ml.testCaseStartedByID = make(map[string]*messages.TestCaseStarted)
	ml.stepByID = make(map[string]*messages.Step)
	ml.scenarioByID = make(map[string]*messages.Scenario)
	ml.exampleByRowID = make(map[string]*messages.Examples)
	ml.exampleRowByID = make(map[string]*messages.TableRow)
	ml.stepDefinitionByID = make(map[string]*messages.StepDefinition)
	ml.backgroundByStepID = make(map[string]*messages.Background)
	ml.tagByID = make(map[string]*messages.Tag)
	ml.hookByID = make(map[string]*messages.Hook)
	ml.attachmentsByTestStepID = make(map[string][]*messages.Attachment)

	ml.verbose = verbose
}

func (ml *MessageLookup) ProcessMessage(envelope *messages.Envelope) (err error) {
	if envelope.GherkinDocument != nil {
		ml.gherkinDocumentByURI[envelope.GherkinDocument.Uri] = envelope.GherkinDocument
		ml.comment(fmt.Sprintf("Stored GherkinDocument: %s", envelope.GherkinDocument.Uri))
		for key := range ml.gherkinDocumentByURI {
			ml.comment(fmt.Sprintf(" - %s ", key))
		}
		if envelope.GherkinDocument.Feature == nil {
			return nil
		}
		ml.processTags(envelope.GherkinDocument.Feature.Tags)

		for _, child := range envelope.GherkinDocument.Feature.Children {
			ml.processRule(child.Rule)
			ml.processBackground(child.Background)
			ml.processScenario(child.Scenario)
		}
	}

	if envelope.Pickle != nil {
		ml.pickleByID[envelope.Pickle.Id] = envelope.Pickle

		for _, step := range envelope.Pickle.Steps {
			ml.pickleStepByID[step.Id] = step
		}
	}

	if envelope.TestCase != nil {
		ml.testCaseByID[envelope.TestCase.Id] = envelope.TestCase

		for _, step := range envelope.TestCase.TestSteps {
			ml.testStepByID[step.Id] = step
		}
	}

	if envelope.TestCaseStarted != nil {
		ml.testCaseStartedByID[envelope.TestCaseStarted.Id] = envelope.TestCaseStarted
	}

	if envelope.Attachment != nil {
		attachments, ok := ml.attachmentsByTestStepID[envelope.Attachment.TestStepId]
		if !ok {
			attachments = make([]*messages.Attachment, 0)
			ml.attachmentsByTestStepID[envelope.Attachment.TestStepId] = attachments
		}
		attachments = append(attachments, envelope.Attachment)
		ml.attachmentsByTestStepID[envelope.Attachment.TestStepId] = attachments
	}

	if envelope.StepDefinition != nil {
		ml.stepDefinitionByID[envelope.StepDefinition.Id] = envelope.StepDefinition
	}

	if envelope.Hook != nil {
		ml.hookByID[envelope.Hook.Id] = envelope.Hook
	}

	return nil
}

func (ml *MessageLookup) processTags(tags []*messages.Tag) {
	for _, tag := range tags {
		ml.tagByID[tag.Id] = tag
	}
}

func (ml *MessageLookup) processRule(rule *messages.Rule) {
	if rule != nil {
		for _, ruleChild := range rule.Children {
			ml.processBackground(ruleChild.Background)
			ml.processScenario(ruleChild.Scenario)
		}
	}
}

func (ml *MessageLookup) processBackground(background *messages.Background) {
	if background != nil {
		for _, step := range background.Steps {
			ml.backgroundByStepID[step.Id] = background
			ml.stepByID[step.Id] = step
		}
	}
}

func (ml *MessageLookup) processScenario(scenario *messages.Scenario) {
	if scenario != nil {
		ml.scenarioByID[scenario.Id] = scenario
		ml.processTags(scenario.Tags)

		for _, step := range scenario.Steps {
			ml.stepByID[step.Id] = step
		}

		for _, example := range scenario.Examples {
			ml.processTags(example.Tags)

			for _, row := range example.TableBody {
				// TODO: we may also need to add IDs to the examples
				ml.exampleByRowID[row.Id] = example
				ml.exampleRowByID[row.Id] = row
			}
		}
	}
}

func (ml *MessageLookup) LookupGherkinDocument(uri string) *messages.GherkinDocument {
	item, ok := ml.gherkinDocumentByURI[uri]
	if ok {
		ml.informFoundKey(uri, "gherkinDocumentByURI")
	} else {
		ml.informMissingKey(uri, "gherkinDocumentByURI")
	}
	return item
}

func (ml *MessageLookup) LookupScenario(id string) *messages.Scenario {
	item, ok := ml.scenarioByID[id]
	if ok {
		ml.informFoundKey(id, "scenarioByID")
	} else {
		ml.informMissingKey(id, "scenarioByID")
	}
	return item
}

func (ml *MessageLookup) LookupPickle(id string) *messages.Pickle {
	item, ok := ml.pickleByID[id]
	if ok {
		ml.informFoundKey(id, "pickleByID")
	} else {
		ml.informMissingKey(id, "pickleByID")
	}
	return item
}

func (ml *MessageLookup) LookupStep(id string) *messages.Step {
	item, ok := ml.stepByID[id]
	if ok {
		ml.informFoundKey(id, "stepByID")
	} else {
		ml.informMissingKey(id, "stepByID")
	}
	return item
}

func (ml *MessageLookup) LookupExample(id string) *messages.Examples {
	item, ok := ml.exampleByRowID[id]
	if ok {
		ml.informFoundKey(id, "exampleByRowID")
	} else {
		ml.informMissingKey(id, "exampleByRowID")
	}
	return item
}

func (ml *MessageLookup) LookupExampleRow(id string) *messages.TableRow {
	item, ok := ml.exampleRowByID[id]
	if ok {
		ml.informFoundKey(id, "exampleRowByID")
	} else {
		ml.informMissingKey(id, "exampleRowByID")
	}
	return item
}

func (ml *MessageLookup) LookupBackgroundByStepID(id string) *messages.Background {
	item, ok := ml.backgroundByStepID[id]
	if ok {
		ml.informFoundKey(id, "backgroundByStepID")
	} else {
		ml.informMissingKey(id, "backgroundByStepID")
	}
	return item
}

func (ml *MessageLookup) LookupTag(id string) *messages.Tag {
	item, ok := ml.tagByID[id]
	if ok {
		ml.informFoundKey(id, "tagByID")
	} else {
		ml.informMissingKey(id, "tagByID")
	}
	return item
}

func (ml *MessageLookup) LookupTestCaseStarted(id string) *messages.TestCaseStarted {
	item, ok := ml.testCaseStartedByID[id]
	if ok {
		ml.informFoundKey(id, "testCaseStartedByID")
	} else {
		ml.informMissingKey(id, "testCaseStartedByID")
	}
	return item
}

func (ml *MessageLookup) LookupTestCase(id string) *messages.TestCase {
	item, ok := ml.testCaseByID[id]
	if ok {
		ml.informFoundKey(id, "testCaseByID")
	} else {
		ml.informMissingKey(id, "testCaseByID")
	}
	return item
}

func (ml *MessageLookup) LookupTestStep(id string) *messages.TestStep {
	item, ok := ml.testStepByID[id]
	if ok {
		ml.informFoundKey(id, "testStepByID")
	} else {
		ml.informMissingKey(id, "testStepByID")
	}
	return item
}

func (ml *MessageLookup) LookupPickleStep(id string) *messages.PickleStep {
	item, ok := ml.pickleStepByID[id]
	if ok {
		ml.informFoundKey(id, "pickleStepByID")
	} else {
		ml.informMissingKey(id, "pickleStepByID")
	}
	return item
}

func (ml *MessageLookup) LookupStepDefinitions(ids []string) []*messages.StepDefinition {
	stepDefinitions := make([]*messages.StepDefinition, len(ids))
	for index, id := range ids {
		stepDefinitions[index] = ml.LookupStepDefinition(id)
	}
	return stepDefinitions
}

func (ml *MessageLookup) LookupStepDefinition(id string) *messages.StepDefinition {
	item, ok := ml.stepDefinitionByID[id]
	if ok {
		ml.informFoundKey(id, "stepDefinitionByID")
	} else {
		ml.informMissingKey(id, "stepDefinitionByID")
	}
	return item
}

func (ml *MessageLookup) LookupHook(id string) *messages.Hook {
	item, ok := ml.hookByID[id]
	if ok {
		ml.informFoundKey(id, "hookByID")
	} else {
		ml.informMissingKey(id, "hookByID")
	}
	return item
}

func (ml *MessageLookup) LookupAttachments(testStepId string) []*messages.Attachment {
	item, ok := ml.attachmentsByTestStepID[testStepId]
	if ok {
		ml.informFoundKey(testStepId, "attachmentsByTestStepID")
	} else {
		ml.informMissingKey(testStepId, "attachmentsByTestStepID")
	}
	return item
}

func (ml *MessageLookup) informFoundKey(key string, mapName string) {
	ml.comment(fmt.Sprintf("Found item'%s' in %s", key, mapName))
}

func (ml *MessageLookup) informMissingKey(key string, mapName string) {
	ml.comment(fmt.Sprintf("Unable to find '%s' in %s", key, mapName))
}

func (ml *MessageLookup) comment(message string) {
	if ml.verbose {
		fmt.Println(fmt.Sprintf("// LookUp: %s", message))
	}
}

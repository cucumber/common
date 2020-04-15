package json

import (
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/cucumber/messages-go/v12"
	"strings"
)

type TestStep struct {
	TestCaseID      string
	Hook            *messages.Hook
	Pickle          *messages.Pickle
	PickleStep      *messages.Pickle_PickleStep
	Step            *messages.GherkinDocument_Feature_Step
	StepDefinitions []*messages.StepDefinition
	Result          *messages.TestStepFinished_TestStepResult
	Background      *messages.GherkinDocument_Feature_Background
	Attachments     []*messages.Attachment
	ExampleRow      *messages.GherkinDocument_Feature_TableRow
}

func ProcessTestStepFinished(testStepFinished *messages.TestStepFinished, lookup *MessageLookup) (error, *TestStep) {
	testCaseStarted := lookup.LookupTestCaseStarted(testStepFinished.TestCaseStartedId)
	if testCaseStarted == nil {
		return errors.New("No testCaseStarted for " + testStepFinished.TestCaseStartedId), nil
	}

	testCase := lookup.LookupTestCase(testCaseStarted.TestCaseId)
	if testCase == nil {
		return errors.New("No testCase for " + testCaseStarted.TestCaseId), nil
	}

	testStep := lookup.LookupTestStep(testStepFinished.TestStepId)
	if testStep == nil {
		return errors.New("No testStep for " + testStepFinished.TestStepId), nil
	}

	if testStep.HookId != "" {
		hook := lookup.LookupHook(testStep.HookId)
		if hook == nil {
			return errors.New("No hook for " + testStep.HookId), nil
		}

		return nil, &TestStep{
			TestCaseID: testCase.Id,
			Hook:       hook,
			Result:     testStepFinished.TestStepResult,
		}
	}

	pickle := lookup.LookupPickle(testCase.PickleId)
	if pickle == nil {
		return errors.New("No pickle for " + testCase.PickleId), nil
	}

	pickleStep := lookup.LookupPickleStep(testStep.PickleStepId)
	if pickleStep == nil {
		return errors.New("No pickleStep for " + testStep.PickleStepId), nil
	}

	var exampleRow *messages.GherkinDocument_Feature_TableRow
	if len(pickle.AstNodeIds) > 1 {
		exampleRow = lookup.LookupExampleRow(pickle.AstNodeIds[1])
	}

	var background *messages.GherkinDocument_Feature_Background
	scenarioStep := lookup.LookupStep(pickleStep.AstNodeIds[0])
	if scenarioStep != nil {
		background = lookup.LookupBackgroundByStepID(scenarioStep.Id)
	}

	return nil, &TestStep{
		TestCaseID:      testCase.Id,
		Step:            lookup.LookupStep(pickleStep.AstNodeIds[0]),
		Pickle:          pickle,
		PickleStep:      pickleStep,
		ExampleRow:      exampleRow,
		Result:          testStepFinished.TestStepResult,
		StepDefinitions: lookup.LookupStepDefinitions(testStep.StepDefinitionIds),
		Background:      background,
		Attachments:     lookup.LookupAttachments(testStepFinished.TestStepId),
	}
}

func TestStepToJSON(step *TestStep) *jsonStep {
	status := strings.ToLower(step.Result.Status.String())
	duration := uint64(0)
	if step.Result.Duration != nil {
		duration = uint64(messages.DurationToGoDuration(*step.Result.Duration))
	}

	if step.Hook != nil {
		return &jsonStep{
			Match: &jsonStepMatch{
				Location: makeLocation(step.Hook.SourceReference.Uri, step.Hook.SourceReference.Location.Line),
			},
			Result: &jsonStepResult{
				Status:       status,
				ErrorMessage: step.Result.Message,
				Duration:     duration,
			},
		}
	}

	location := makeLocation(step.Pickle.Uri, step.Step.Location.Line)
	if step.ExampleRow != nil {
		location = makeLocation(step.Pickle.Uri, step.ExampleRow.Location.Line)
	}

	if len(step.StepDefinitions) == 1 {
		location = makeLocation(
			step.StepDefinitions[0].SourceReference.Uri,
			step.StepDefinitions[0].SourceReference.Location.Line,
		)
	}

	jsonStep := &jsonStep{
		Keyword: step.Step.Keyword,
		Name:    step.PickleStep.Text,
		Line:    step.Step.Location.Line,
		Match: &jsonStepMatch{
			Location: location,
		},
		Result: &jsonStepResult{
			Status:       status,
			ErrorMessage: step.Result.Message,
			Duration:     duration,
		},
		Embeddings: makeEmbeddings(step.Attachments),
		Output:     makeOutput(step.Attachments),
	}

	docString := step.Step.GetDocString()
	if docString != nil {
		jsonStep.DocString = &jsonDocString{
			Line:        docString.Location.Line,
			ContentType: docString.MediaType,
			Value:       docString.Content,
		}
	}

	datatable := step.Step.GetDataTable()
	if datatable != nil {
		jsonStep.Rows = make([]*jsonDatatableRow, len(datatable.GetRows()))
		for rowIndex, row := range datatable.GetRows() {
			cells := make([]string, len(row.Cells))
			for cellIndex, cell := range row.Cells {
				cells[cellIndex] = cell.Value
			}

			jsonStep.Rows[rowIndex] = &jsonDatatableRow{
				Cells: cells,
			}
		}
	}

	return jsonStep
}

func makeEmbeddings(attachments []*messages.Attachment) []*jsonEmbedding {
	embeddableAttachments := filterAttachments(attachments, isEmbeddable)
	jsonEmbeddings := make([]*jsonEmbedding, len(embeddableAttachments))

	for index, attachment := range embeddableAttachments {
		var data string
		if attachment.ContentEncoding == messages.Attachment_BASE64 {
			data = attachment.Body
		} else {
			data = base64.StdEncoding.EncodeToString([]byte(attachment.Body))
		}
		jsonEmbeddings[index] = &jsonEmbedding{
			Data:     data,
			MimeType: attachment.MediaType,
		}
	}

	return jsonEmbeddings
}

func makeOutput(attachments []*messages.Attachment) []string {
	outputAttachments := filterAttachments(attachments, isOutput)
	output := make([]string, len(outputAttachments))

	for index, attachment := range outputAttachments {
		output[index] = attachment.GetBody()
	}

	return output
}

func filterAttachments(attachments []*messages.Attachment, filter func(*messages.Attachment) bool) []*messages.Attachment {
	matches := make([]*messages.Attachment, 0)
	for _, attachment := range attachments {
		if filter(attachment) {
			matches = append(matches, attachment)
		}
	}
	return matches
}

func isEmbeddable(attachment *messages.Attachment) bool {
	return !isOutput(attachment)
}

func isOutput(attachment *messages.Attachment) bool {
	return attachment.GetMediaType() == "text/x.cucumber.log+plain"
}

func makeLocation(file string, line uint32) string {
	return fmt.Sprintf("%s:%d", file, line)
}

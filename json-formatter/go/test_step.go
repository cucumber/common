package json

import (
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/cucumber/messages-go/v9"
	"strings"
)

type TestStep struct {
	TestCaseID      string
	Hook            *messages.Hook
	Pickle          *messages.Pickle
	PickleStep      *messages.Pickle_PickleStep
	Step            *messages.GherkinDocument_Feature_Step
	StepDefinitions []*messages.StepDefinition
	Result          *messages.TestResult
	Background      *messages.GherkinDocument_Feature_Background
	Attachments     []*messages.Attachment
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
			Result:     testStepFinished.TestResult,
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
		Result:          testStepFinished.TestResult,
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
	jsonEmbeddings := make([]*jsonEmbedding, len(attachments))
	for index, attachment := range attachments {
		var data []byte
		if attachment.GetBinary() != nil {
			data = attachment.GetBinary()
		} else {
			data = []byte(attachment.GetText())
		}
		jsonEmbeddings[index] = &jsonEmbedding{
			Data:     base64.StdEncoding.EncodeToString(data),
			MimeType: attachment.MediaType,
		}
	}

	return jsonEmbeddings
}

func makeLocation(file string, line uint32) string {
	return fmt.Sprintf("%s:%d", file, line)
}

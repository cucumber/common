package json

import (
	"encoding/json"
	//"errors"
	"fmt"
	"io"
	"strings"

	messages "github.com/cucumber/cucumber-messages-go/v6"
	gio "github.com/gogo/protobuf/io"
)

type jsonFeature struct {
	Description string                `json:"description"`
	Elements    []*jsonFeatureElement `json:"elements"`
	ID          string                `json:"id"`
	Keyword     string                `json:"keyword"`
	Line        uint32                `json:"line"`
	Name        string                `json:"name"`
	URI         string                `json:"uri"`
	Tags        []*jsonTag            `json:"tags,omitempty"`
}

type jsonFeatureElement struct {
	Description string      `json:"description"`
	ID          string      `json:"id,omitempty"`
	Keyword     string      `json:"keyword"`
	Line        uint32      `json:"line"`
	Name        string      `json:"name"`
	Steps       []*jsonStep `json:"steps"`
	Type        string      `json:"type"`
	Tags        []*jsonTag  `json:"tags,omitempty"`
}

type jsonStep struct {
	Keyword   string              `json:"keyword"`
	Line      uint32              `json:"line"`
	Name      string              `json:"name"`
	Result    *jsonStepResult     `json:"result"`
	Match     *jsonStepMatch      `json:"match,omitempty"`
	DocString *jsonDocString      `json:"doc_string,omitempty"`
	Rows      []*jsonDatatableRow `json:"rows,omitempty"`
}

type jsonDocString struct {
	ContentType string `json:"content_type"`
	Line        uint32 `json:"line"`
	Value       string `json:"value"`
}

type jsonDatatableRow struct {
	Cells []string `json:"cells"`
}

type jsonStepResult struct {
	Duration     uint64 `json:"duration,omitempty"`
	Status       string `json:"status"`
	ErrorMessage string `json:"error_message,omitempty"`
}

type jsonStepMatch struct {
	Location string `json:"location"`
}

type jsonTag struct {
	Line uint32 `json:"line"`
	Name string `json:"name"`
}

type Formatter struct {
	lookup *MessageLookup

	testCaseByID        map[string]*messages.TestCase
	testCaseStartedById map[string]*messages.TestCaseStarted

	backgroundByUri      map[string]*messages.GherkinDocument_Feature_Background
	backgroundStepsByKey map[string]*messages.GherkinDocument_Feature_Step
	exampleByRowKey      map[string]*messages.GherkinDocument_Feature_Scenario_Examples
	exampleRowIndexByKey map[string]int
	gherkinDocumentByURI map[string]*messages.GherkinDocument
	jsonFeatures         []*jsonFeature
	jsonFeaturesByURI    map[string]*jsonFeature
	jsonStepsByKey       map[string]*jsonStep
	pickleById           map[string]*messages.Pickle
	pickleByTestCaseId   map[string]*messages.Pickle
	scenariosByKey       map[string]*messages.GherkinDocument_Feature_Scenario
	scenarioStepsByKey   map[string]*messages.GherkinDocument_Feature_Step
}

// ProcessMessages writes a JSON report to STDOUT
func (formatter *Formatter) ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	formatter.lookup = &MessageLookup{}
	formatter.lookup.Initialize()

	formatter.testCaseByID = make(map[string]*messages.TestCase, 0)
	formatter.testCaseStartedById = make(map[string]*messages.TestCaseStarted, 0)

	formatter.jsonFeatures = make([]*jsonFeature, 0)
	formatter.jsonFeaturesByURI = make(map[string]*jsonFeature)
	formatter.jsonStepsByKey = make(map[string]*jsonStep)

	formatter.backgroundByUri = make(map[string]*messages.GherkinDocument_Feature_Background)
	formatter.backgroundStepsByKey = make(map[string]*messages.GherkinDocument_Feature_Step)
	formatter.exampleByRowKey = make(map[string]*messages.GherkinDocument_Feature_Scenario_Examples)
	formatter.exampleRowIndexByKey = make(map[string]int)
	formatter.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	formatter.pickleById = make(map[string]*messages.Pickle)
	formatter.pickleByTestCaseId = make(map[string]*messages.Pickle)
	formatter.scenariosByKey = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	formatter.scenarioStepsByKey = make(map[string]*messages.GherkinDocument_Feature_Step)

	reader := gio.NewDelimitedReader(stdin, 4096)

	for {
		envelope := &messages.Envelope{}
		err := reader.ReadMsg(envelope)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		formatter.lookup.ProcessMessage(envelope)

		switch m := envelope.Message.(type) {

		case *messages.Envelope_Pickle:
			pickle := m.Pickle
			jsonFeature := formatter.findOrCreateJsonFeature(pickle)
			scenario := formatter.lookup.LookupScenario(pickle.SourceIds[0])
			// TODO: find a better way to get backgrounds
			background := &messages.GherkinDocument_Feature_Background{}
			scenarioJsonSteps := make([]*jsonStep, 0)
			backgroundJsonSteps := make([]*jsonStep, 0)

			for _, pickleStep := range pickle.Steps {
				step := formatter.lookup.LookupStep(pickleStep.StepId)
				jsonStep := &jsonStep{
					Keyword: step.Keyword,
					Line:    step.Location.Line,
					Name:    pickleStep.Text,
					// The match field defaults to the Gherkin step itself for some curious reason
					Match: &jsonStepMatch{
						Location: fmt.Sprintf("%s", pickle.Uri),
					},
				}

				docString := step.GetDocString()
				if docString != nil {
					jsonStep.DocString = &jsonDocString{
						Line:        docString.Location.Line,
						ContentType: docString.ContentType,
						Value:       docString.Content,
					}
				}

				datatable := step.GetDataTable()
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
				if formatter.lookup.IsBackgroundStep(step.Id) {
					backgroundJsonSteps = append(backgroundJsonSteps, jsonStep)
					background = formatter.lookup.LookupBrackgroundByStepId(step.Id)
				} else {
					scenarioJsonSteps = append(scenarioJsonSteps, jsonStep)
				}
				formatter.jsonStepsByKey[key(pickle.Uri)] = jsonStep
			}

			if len(backgroundJsonSteps) > 0 {
				jsonFeature.Elements = append(jsonFeature.Elements, &jsonFeatureElement{
					Description: background.Description,
					Keyword:     background.Keyword,
					Line:        background.Location.Line,
					Steps:       backgroundJsonSteps,
					Type:        "background",
				})
			}

			scenarioID := fmt.Sprintf("%s;%s", jsonFeature.ID, makeId(scenario.Name))

			// if len(scenario.Examples) > 0 {
			// 	exampleKey := key(pickle.Uri)
			// 	exampleRowIndex, ok := formatter.exampleRowIndexByKey[exampleKey]
			// 	if !ok {
			// 		return errors.New(fmt.Sprintf("No example row index for: %s", exampleKey))
			// 	}
			// 	example, eok := formatter.exampleByRowKey[exampleKey]
			// 	if !eok {
			// 		return errors.New(fmt.Sprintf("No example for: %s", exampleKey))
			// 	}
			// 	scenarioID = fmt.Sprintf(
			// 		"%s;%s;%s;%d",
			// 		jsonFeature.ID,
			// 		makeId(scenario.Name),
			// 		makeId(example.Name),
			// 		exampleRowIndex)
			// }

			scenarioTags := make([]*jsonTag, len(pickle.Tags))
			for tagIndex, tag := range pickle.Tags {
				scenarioTags[tagIndex] = &jsonTag{
					Line: 987,
					Name: tag.Name,
				}
			}

			jsonFeature.Elements = append(jsonFeature.Elements, &jsonFeatureElement{
				Description: scenario.Description,
				ID:          scenarioID,
				Keyword:     scenario.Keyword,
				Line:        scenario.Location.Line,
				Name:        scenario.Name,
				Steps:       scenarioJsonSteps,
				Type:        "scenario",
				Tags:        scenarioTags,
			})

		case *messages.Envelope_TestCase:
			formatter.testCaseByID[m.TestCase.Id] = m.TestCase

		case *messages.Envelope_TestCaseStarted:
			formatter.testCaseStartedById[m.TestCaseStarted.Id] = m.TestCaseStarted

			// testCase := formatter.testCaseByID[m.TestCaseStarted.TestCaseId]
			// pickle := formatter.pickleById[testCase.PickleId]
			// formatter.pickleByTestCaseId[m.TestCaseStarted.TestCaseId] = pickle

			// case *messages.Envelope_TestStepMatched:
			// 	pickle := formatter.pickleById[m.TestStepMatched.PickleId]
			// 	pickleStep := pickle.Steps[m.TestStepMatched.Index]
			// 	step := formatter.jsonStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]

			// 	step.Match = &jsonStepMatch{
			// 		Location: fmt.Sprintf(
			// 			"%s:%d",
			// 			m.TestStepMatched.StepDefinitionReference.Uri,
			// 			m.TestStepMatched.StepDefinitionReference.Location.Line,
			// 		),
			// 	}

			// case *messages.Envelope_TestStepFinished:
			// 	testCaseStarted := formatter.testCaseStartedById[m.TestStepFinished.TestCaseStartedId]
			// 	testCase := formatter.testCaseByID[testCaseStarted.TestCaseId]

			// 	pickle := formatter.pickleByTestCaseId[m.TestStepFinished.TestCaseId]
			// 	pickleStep := pickle.Steps[m.TestStepFinished.Index]
			// 	jsonStep := formatter.jsonStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]

			// 	status := strings.ToLower(m.TestStepFinished.TestResult.Status.String())
			// 	jsonStep.Result = &jsonStepResult{
			// 		Duration:     durationToNanos(m.TestStepFinished.TestResult.Duration),
			// 		Status:       status,
			// 		ErrorMessage: m.TestStepFinished.TestResult.Message,
			// 	}
		}
	}

	output, _ := json.MarshalIndent(formatter.jsonFeatures, "", "  ")
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

func (formatter *Formatter) findOrCreateJsonFeature(pickle *messages.Pickle) *jsonFeature {
	jFeature, ok := formatter.jsonFeaturesByURI[pickle.Uri]
	if !ok {
		gherkinDocumentFeature := formatter.lookup.LookupGherkinDocument(pickle.Uri).Feature

		jFeature = &jsonFeature{
			Description: gherkinDocumentFeature.Description,
			Elements:    make([]*jsonFeatureElement, 0),
			ID:          makeId(gherkinDocumentFeature.Name),
			Keyword:     gherkinDocumentFeature.Keyword,
			Line:        gherkinDocumentFeature.Location.Line,
			Name:        gherkinDocumentFeature.Name,
			URI:         pickle.Uri,
			Tags:        make([]*jsonTag, len(gherkinDocumentFeature.Tags)),
		}

		for tagIndex, tag := range gherkinDocumentFeature.Tags {
			jFeature.Tags[tagIndex] = &jsonTag{
				Line: tag.Location.Line,
				Name: tag.Name,
			}
		}

		formatter.jsonFeaturesByURI[pickle.Uri] = jFeature
		formatter.jsonFeatures = append(formatter.jsonFeatures, jFeature)
	}
	return jFeature
}

func key(uri string) string {
	return fmt.Sprintf("%s", uri)
}

func makeId(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

func durationToNanos(d *messages.Duration) uint64 {
	return uint64(d.Seconds*1000000000 + int64(d.Nanos))
}

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

	jsonFeatures         []*jsonFeature
	jsonFeaturesByURI    map[string]*jsonFeature
	jsonStepsByPickleStepId map[string]*jsonStep
	exampleRowIndexById     map[string]int
}

// ProcessMessages writes a JSON report to STDOUT
func (formatter *Formatter) ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	formatter.lookup = &MessageLookup{}
	formatter.lookup.Initialize()

	formatter.jsonFeatures = make([]*jsonFeature, 0)
	formatter.jsonFeaturesByURI = make(map[string]*jsonFeature)
	formatter.jsonStepsByPickleStepId = make(map[string]*jsonStep)
	formatter.exampleRowIndexById = make(map[string]int)

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
		case *messages.Envelope_GherkinDocument:
			for _, child := range m.GherkinDocument.Feature.Children {
				scenario := child.GetScenario()
				if scenario != nil {
					for _, example := range scenario.Examples {
						for index, row := range example.TableBody {
							// index + 2: it's a 1 based index and the header is counted too.
							formatter.exampleRowIndexById[row.Id] = index + 2
						}
					}
				}
			}

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

				formatter.jsonStepsByPickleStepId[pickleStep.Id] = jsonStep
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

			if len(pickle.SourceIds) > 1 {
				exampleRow := formatter.lookup.LookupExampleRow(pickle.SourceIds[1])
				example := formatter.lookup.LookupExample(pickle.SourceIds[1])
				scenarioID = fmt.Sprintf(
					"%s;%s;%s;%d",
					jsonFeature.ID,
					makeId(scenario.Name),
					makeId(example.Name),
					formatter.exampleRowIndexById[exampleRow.Id])
			}

			scenarioTags := make([]*jsonTag, len(pickle.Tags))
			for tagIndex, pickleTag := range pickle.Tags {
				tag := formatter.lookup.LookupTagByURIAndName(pickle.Uri, pickleTag.Name)

				scenarioTags[tagIndex] = &jsonTag{
					Line: tag.Location.Line,
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

		case *messages.Envelope_TestStepFinished:
			testStep := formatter.lookup.LookupTestStepByID(m.TestStepFinished.TestStepId)
			pickleStep := formatter.lookup.LookupPickleStepByID(testStep.PickleStepId)
			jsonStep := formatter.jsonStepsByPickleStepId[pickleStep.Id]

			status := strings.ToLower(m.TestStepFinished.TestResult.Status.String())
			jsonStep.Result = &jsonStepResult{
				Duration:     durationToNanos(m.TestStepFinished.TestResult.Duration),
				Status:       status,
				ErrorMessage: m.TestStepFinished.TestResult.Message,
			}

			stepDefinitions := formatter.lookup.LookupStepDefinitionConfigsByIDs(testStep.StepDefinitionId)
			if len(stepDefinitions) > 0 {
				jsonStep.Match = &jsonStepMatch{
					Location: fmt.Sprintf(
						"%s:%d",
						stepDefinitions[0].Location.Uri,
						stepDefinitions[0].Location.Location.Line,
					)
				}
			}
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

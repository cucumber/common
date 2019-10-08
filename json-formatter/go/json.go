package json

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"strings"

	messages "github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
)

type jsonFeature struct {
	Description string               `json:"description"`
	Elements    []jsonFeatureElement `json:"elements"`
	ID          string               `json:"id"`
	Keyword     string               `json:"keyword"`
	Line        uint32               `json:"line"`
	Name        string               `json:"name"`
	URI         string               `json:"uri"`
}

type jsonFeatureElement struct {
	Description string      `json:"description"`
	ID          string      `json:"id,omitempty"`
	Keyword     string      `json:"keyword"`
	Line        uint32      `json:"line"`
	Name        string      `json:"name"`
	Steps       []*jsonStep `json:"steps"`
	Type        string      `json:"type"`
}

type jsonStep struct {
	Keyword string          `json:"keyword"`
	Line    uint32          `json:"line"`
	Name    string          `json:"name"`
	Result  *jsonStepResult `json:"result"`
	Match   *jsonStepMatch  `json:"match,omitempty"`
}

type jsonStepResult struct {
	Duration     uint64 `json:"duration,omitempty"`
	Status       string `json:"status"`
	ErrorMessage string `json:"error_message,omitempty"`
}

type jsonStepMatch struct {
	Location string `json:"location"`
}

type Formatter struct {
	backgroundByUri      map[string]*messages.GherkinDocument_Feature_Background
	backgroundStepsByKey map[string]*messages.GherkinDocument_Feature_Step
	exampleByRowKey      map[string]*messages.GherkinDocument_Feature_Scenario_Examples
	exampleRowIndexByKey map[string]int
	gherkinDocumentByURI map[string]*messages.GherkinDocument
	jsonFeatures         []*jsonFeature
	jsonFeaturesByURI    map[string]*jsonFeature
	jsonStepsByKey       map[string]*jsonStep
	pickleById           map[string]*messages.Pickle
	scenariosByKey       map[string]*messages.GherkinDocument_Feature_Scenario
	scenarioStepsByKey   map[string]*messages.GherkinDocument_Feature_Step
}

// ProcessMessages writes a JSON report to STDOUT
func (formatter *Formatter) ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	formatter.jsonFeatures = make([]*jsonFeature, 0)
	formatter.jsonFeaturesByURI = make(map[string]*jsonFeature)
	formatter.jsonStepsByKey = make(map[string]*jsonStep)

	formatter.backgroundByUri = make(map[string]*messages.GherkinDocument_Feature_Background)
	formatter.backgroundStepsByKey = make(map[string]*messages.GherkinDocument_Feature_Step)
	formatter.exampleByRowKey = make(map[string]*messages.GherkinDocument_Feature_Scenario_Examples)
	formatter.exampleRowIndexByKey = make(map[string]int)
	formatter.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	formatter.pickleById = make(map[string]*messages.Pickle)
	formatter.scenariosByKey = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	formatter.scenarioStepsByKey = make(map[string]*messages.GherkinDocument_Feature_Step)

	r := gio.NewDelimitedReader(stdin, 4096)

	for {
		wrapper := &messages.Envelope{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		switch m := wrapper.Message.(type) {
		case *messages.Envelope_GherkinDocument:
			formatter.gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument
			for _, child := range m.GherkinDocument.Feature.Children {
				if child.GetBackground() != nil {
					formatter.backgroundByUri[m.GherkinDocument.Uri] = child.GetBackground()
					for _, step := range child.GetBackground().Steps {
						formatter.backgroundStepsByKey[key(m.GherkinDocument.Uri, step.Location)] = step
					}
				}

				if child.GetScenario() != nil {
					formatter.scenariosByKey[key(m.GherkinDocument.Uri, child.GetScenario().Location)] = child.GetScenario()
					for _, step := range child.GetScenario().Steps {
						formatter.scenarioStepsByKey[key(m.GherkinDocument.Uri, step.Location)] = step
					}

					for _, example := range child.GetScenario().Examples {
						for rowIndex, row := range example.TableBody {
							rowKey := key(m.GherkinDocument.Uri, row.Location)
							formatter.exampleByRowKey[rowKey] = example
							// Add 1 for the row header, and another 1 because the id is 1-based
							formatter.exampleRowIndexByKey[rowKey] = rowIndex + 2
						}
					}
				}
			}

		case *messages.Envelope_Pickle:
			pickle := m.Pickle
			formatter.pickleById[pickle.Id] = pickle
			jsonFeature := formatter.findOrCreateJsonFeature(pickle)

			scenario := formatter.scenariosByKey[key(pickle.Uri, pickle.Locations[0])]

			scenarioJsonSteps := make([]*jsonStep, 0)
			backgroundJsonSteps := make([]*jsonStep, 0)

			for _, pickleStep := range pickle.Steps {
				isBackgroundStep := false
				step := formatter.scenarioStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]

				if step == nil {
					step = formatter.backgroundStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]
					isBackgroundStep = true
				}

				jsonStep := &jsonStep{
					Keyword: step.Keyword,
					Line:    step.Location.Line,
					Name:    pickleStep.Text,
					// The match field defaults to the Gherkin step itself for some curious reason
					Match: &jsonStepMatch{
						Location: fmt.Sprintf("%s:%d", pickle.Uri, pickleStep.Locations[len(pickleStep.Locations)-1].Line),
					},
				}
				if isBackgroundStep {
					backgroundJsonSteps = append(backgroundJsonSteps, jsonStep)
				} else {
					scenarioJsonSteps = append(scenarioJsonSteps, jsonStep)
				}

				formatter.jsonStepsByKey[key(pickle.Uri, step.Location)] = jsonStep
			}

			if len(backgroundJsonSteps) > 0 {
				background := formatter.backgroundByUri[pickle.Uri]
				jsonFeature.Elements = append(jsonFeature.Elements, jsonFeatureElement{
					Description: background.Description,
					Keyword:     background.Keyword,
					Line:        background.Location.Line,
					Steps:       backgroundJsonSteps,
					Type:        "background",
				})
			}

			pickleLine := pickle.Locations[0].Line
			scenarioID := fmt.Sprintf("%s;%s", jsonFeature.ID, makeId(scenario.Name))

			if len(scenario.Examples) > 0 {
				pickleLine = pickle.Locations[1].Line
				exampleKey := key(pickle.Uri, pickle.Locations[1])
				exampleRowIndex, ok := formatter.exampleRowIndexByKey[exampleKey]
				if !ok {
					return errors.New(fmt.Sprintf("No example row index for: %s", exampleKey))
				}
				example, eok := formatter.exampleByRowKey[exampleKey]
				if !eok {
					return errors.New(fmt.Sprintf("No example for: %s", exampleKey))
				}
				scenarioID = fmt.Sprintf(
					"%s;%s;%s;%d",
					jsonFeature.ID,
					makeId(scenario.Name),
					makeId(example.Name),
					exampleRowIndex)
			}

			jsonFeature.Elements = append(jsonFeature.Elements, jsonFeatureElement{
				Description: scenario.Description,
				ID:          scenarioID,
				Keyword:     scenario.Keyword,
				Line:        pickleLine,
				Name:        scenario.Name,
				Steps:       scenarioJsonSteps,
				Type:        "scenario",
			})

		case *messages.Envelope_TestStepMatched:
			pickle := formatter.pickleById[m.TestStepMatched.PickleId]
			pickleStep := pickle.Steps[m.TestStepMatched.Index]
			step := formatter.jsonStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]

			step.Match = &jsonStepMatch{
				Location: fmt.Sprintf(
					"%s:%d",
					m.TestStepMatched.StepDefinitionReference.Uri,
					m.TestStepMatched.StepDefinitionReference.Location.Line,
				),
			}

		case *messages.Envelope_TestStepFinished:
			pickle := formatter.pickleById[m.TestStepFinished.PickleId]
			pickleStep := pickle.Steps[m.TestStepFinished.Index]
			step := formatter.jsonStepsByKey[key(pickle.Uri, pickleStep.Locations[0])]

			status := strings.ToLower(m.TestStepFinished.TestResult.Status.String())
			step.Result = &jsonStepResult{
				Duration:     durationToNanos(m.TestStepFinished.TestResult.Duration),
				Status:       status,
				ErrorMessage: m.TestStepFinished.TestResult.Message,
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
		gherkinDocumentFeature := formatter.gherkinDocumentByURI[pickle.Uri].Feature

		jFeature = &jsonFeature{
			Description: gherkinDocumentFeature.Description,
			Elements:    make([]jsonFeatureElement, 0),
			ID:          makeId(gherkinDocumentFeature.Name),
			Keyword:     gherkinDocumentFeature.Keyword,
			Line:        gherkinDocumentFeature.Location.Line,
			Name:        gherkinDocumentFeature.Name,
			URI:         pickle.Uri,
		}
		formatter.jsonFeaturesByURI[pickle.Uri] = jFeature
		formatter.jsonFeatures = append(formatter.jsonFeatures, jFeature)
	}
	return jFeature
}

func key(uri string, location *messages.Location) string {
	return fmt.Sprintf("%s:%d", uri, location.Line)
}

func makeId(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

func durationToNanos(d *messages.Duration) uint64 {
	return uint64(d.Seconds*1000000000 + int64(d.Nanos))
}

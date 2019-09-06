package json

import (
	"encoding/json"
	"fmt"
	"io"

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
}

type jsonStepResult struct {
	Duration     uint64 `json:"duration"`
	Status       string `json:"status"`
	ErrorMessage string `json:"error_message,omitempty"`
}

type Formatter struct {
	jsonFeatures         []*jsonFeature
	jsonFeaturesByURI    map[string]*jsonFeature
	gherkinDocumentByURI map[string]*messages.GherkinDocument
	scenariosByKey       map[string]*messages.GherkinDocument_Feature_Scenario
	stepsByKey           map[string]*messages.GherkinDocument_Feature_Step
}

// ProcessMessages writes a JSON report to STDOUT
func (formatter *Formatter) ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	formatter.jsonFeatures = make([]*jsonFeature, 0)
	formatter.jsonFeaturesByURI = make(map[string]*jsonFeature)
	formatter.gherkinDocumentByURI = make(map[string]*messages.GherkinDocument)
	formatter.scenariosByKey = make(map[string]*messages.GherkinDocument_Feature_Scenario)
	formatter.stepsByKey = make(map[string]*messages.GherkinDocument_Feature_Step)

	// elementsByURIAndLineNumber := make(map[string]jsonFeatureElement)
	picklesByID := make(map[string]*messages.Pickle)

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
				if child.GetScenario() != nil {
					formatter.scenariosByKey[key(m.GherkinDocument.Uri, child.GetScenario().Location)] = child.GetScenario()
					for _, step := range child.GetScenario().Steps {
						formatter.stepsByKey[key(m.GherkinDocument.Uri, step.Location)] = step
					}
				}
			}

		case *messages.Envelope_Pickle:
			pickle := m.Pickle
			picklesByID[pickle.Id] = pickle
			jsonFeature := formatter.findOrCreateJsonFeature(pickle)

			scenario := formatter.findScenario(pickle.Uri, pickle.Locations[0])

			jsonSteps := make([]*jsonStep, 0)
			for _, pickleStep := range pickle.Steps {
				step := formatter.findStep(pickle.Uri, pickleStep.Locations[0])

				jsonSteps = append(jsonSteps, &jsonStep{
					Keyword: step.Keyword,
					Name:    pickleStep.Text,
				})
			}

			jsonFeature.Elements = append(jsonFeature.Elements, jsonFeatureElement{
				Description: scenario.Description,
				Keyword:     scenario.Keyword,
				Line:        scenario.Location.Line,
				Name:        scenario.Name,
				Steps:       jsonSteps,
				Type:        "scenario",
			})

			// case *messages.Envelope_TestStepFinished:
			// step := lookupStep(m.TestStepFinished.PickleId, m.TestStepFinished.Index, picklesByID, elementsByURIAndLineNumber)
			// status := strings.ToLower(m.TestStepFinished.TestResult.Status.String())

			// step.Result = &jsonStepResult{
			// 	Duration:     m.TestStepFinished.TestResult.DurationNanoseconds,
			// 	Status:       status,
			// 	ErrorMessage: m.TestStepFinished.TestResult.Message,
			// }
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
			ID:          "some-id",
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

func (formatter *Formatter) pickleToURIAndLineNumber(pickle *messages.Pickle) string {
	return fmt.Sprintf("%s:%d", pickle.Uri, pickle.Locations[0].Line)
}

func (formatter *Formatter) findScenario(uri string, location *messages.Location) *messages.GherkinDocument_Feature_Scenario {
	return formatter.scenariosByKey[key(uri, location)]
}

func (formatter *Formatter) findStep(uri string, location *messages.Location) *messages.GherkinDocument_Feature_Step {
	return formatter.stepsByKey[key(uri, location)]
}

func key(uri string, location *messages.Location) string {
	return fmt.Sprintf("%s:%d", uri, location.Line)
}

package json

import (
	"encoding/json"
	"fmt"
	"io"
	//	"strings"

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
	Description string     `json:"description"`
	Keyword     string     `json:"keyword"`
	Line        uint32     `json:"line"`
	Name        string     `json:"name"`
	Steps       []jsonStep `json:"steps"`
	Type        string     `json:"type"`
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

// ProcessMessages writes a JSON report to STDOUT
func ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	jsonFeatures := make([]jsonFeature, 0)
	jsonFeaturesByURI := make(map[string]*jsonFeature)
	gherkinDocumentByURI := make(map[string]*messages.GherkinDocument)

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
			gherkinDocumentByURI[m.GherkinDocument.Uri] = m.GherkinDocument
			// elements := make([]jsonFeatureElement, 0)

			// for _, child := range m.GherkinDocument.Feature.Children {
			// 	background := child.GetBackground()
			// 	if background != nil {
			// 		element := backgroundTojsonFeatureElement(background)
			// 		elementsByURIAndLineNumber[fmt.Sprintf("%s:%d", m.GherkinDocument.Uri, element.Line)] = element

			// 		elements = append(elements, element)
			// 	}

			// 	scenario := child.GetScenario()
			// 	if scenario != nil {
			// 		element := scenarioTojsonFeatureElement(scenario)
			// 		elementsByURIAndLineNumber[fmt.Sprintf("%s:%d", m.GherkinDocument.Uri, element.Line)] = element

			// 		elements = append(elements, element)
			// 	}
			// }

			// feature := &feature{
			// 	Description: m.GherkinDocument.Feature.Description,
			// 	Elements:    elements,
			// 	ID:          "some-id",
			// 	Keyword:     m.GherkinDocument.Feature.Keyword,
			// 	Line:        m.GherkinDocument.Feature.Location.Line,
			// 	Name:        m.GherkinDocument.Feature.Name,
			// 	URI:         m.GherkinDocument.Uri,
			// }
			// features = append(features, *feature)

		case *messages.Envelope_Pickle:
			pickle := m.Pickle
			picklesByID[pickle.Id] = pickle
			var jsonFeature *jsonFeature

			jsonFeature, jsonFeaturesByURI, jsonFeatures = findOrCreateJsonFeature(
				pickle,
				jsonFeaturesByURI,
				jsonFeatures,
				gherkinDocumentByURI,
			)

			jsonFeature.Elements = append(jsonFeature.Elements, jsonFeatureElement{
				Description: "hello :)",
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

	output, _ := json.Marshal(jsonFeatures)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

func findOrCreateJsonFeature(
	pickle *messages.Pickle,
	jsonFeaturesByURI map[string]*jsonFeature,
	jsonFeatures []jsonFeature,
	gherkinDocumentByURI map[string]*messages.GherkinDocument,
) (
	*jsonFeature,
	map[string]*jsonFeature,
	[]jsonFeature,
) {
	f, ok := jsonFeaturesByURI[pickle.Uri]
	if !ok {
		gherkinDocumentFeature := gherkinDocumentByURI[pickle.Uri].Feature

		f = &jsonFeature{
			Description: gherkinDocumentFeature.Description,
			Elements:    make([]jsonFeatureElement, 0),
			ID:          "some-id",
			Keyword:     gherkinDocumentFeature.Keyword,
			Line:        gherkinDocumentFeature.Location.Line,
			Name:        gherkinDocumentFeature.Name,
			URI:         pickle.Uri,
		}
		jsonFeaturesByURI[pickle.Uri] = f
		jsonFeatures = append(jsonFeatures, *f)
	}
	return f, jsonFeaturesByURI, jsonFeatures
}

func lookupStep(pickleID string, stepIndex uint32, picklesByID map[string]*messages.Pickle, elementsByURIAndLineNumber map[string]jsonFeatureElement) *jsonStep {
	element := lookupjsonFeatureElement(pickleID, picklesByID, elementsByURIAndLineNumber)
	return &element.Steps[stepIndex]
}

func lookupjsonFeatureElement(pickleID string, picklesByID map[string]*messages.Pickle, elementsByURIAndLineNumber map[string]jsonFeatureElement) jsonFeatureElement {
	pickle := picklesByID[pickleID]

	return elementsByURIAndLineNumber[pickleToURIAndLineNumber(pickle)]
}

func pickleToURIAndLineNumber(pickle *messages.Pickle) string {
	return fmt.Sprintf("%s:%d", pickle.Uri, pickle.Locations[0].Line)
}

func backgroundTojsonFeatureElement(background *messages.GherkinDocument_Feature_Background) jsonFeatureElement {
	return makeJsonFeatureElement(
		background.Description,
		background.Keyword,
		background.Location.Line,
		background.Name,
		makeJsonSteps(background.GetSteps()),
		"background",
	)
}

func makeJsonFeatureElement(description string, keyword string, line uint32, name string, steps []jsonStep, elementType string) jsonFeatureElement {
	return jsonFeatureElement{
		Description: description,
		Keyword:     keyword,
		Line:        line,
		Name:        name,
		Steps:       steps,
		Type:        elementType,
	}
}

func scenarioTojsonFeatureElement(scenario *messages.GherkinDocument_Feature_Scenario) jsonFeatureElement {
	return makeJsonFeatureElement(
		scenario.Description,
		scenario.Keyword,
		scenario.Location.Line,
		scenario.Name,
		makeJsonSteps(scenario.GetSteps()),
		"scenario",
	)
}

func makeJsonSteps(steps []*messages.GherkinDocument_Feature_Step) []jsonStep {
	jsonSteps := make([]jsonStep, 0)

	for _, step := range steps {
		jsonStep := &jsonStep{
			Keyword: step.Keyword,
			Line:    step.Location.Line,
			Name:    step.Text,
		}

		jsonSteps = append(jsonSteps, *jsonStep)
	}

	return jsonSteps
}

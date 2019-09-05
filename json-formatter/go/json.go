package json

import (
	"encoding/json"
	"fmt"
	"io"
	"runtime"
	"strings"

	messages "github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
)

type feature struct {
	Description string           `json:"description"`
	Elements    []featureElement `json:"elements"`
	ID          string           `json:"id"`
	Keyword     string           `json:"keyword"`
	Line        uint32           `json:"line"`
	Name        string           `json:"name"`
	URI         string           `json:"uri"`
}

type featureElement struct {
	Description string               `json:"description"`
	Keyword     string               `json:"keyword"`
	Line        uint32               `json:"line"`
	Name        string               `json:"name"`
	Steps       []featureElementStep `json:"steps"`
	Type        string               `json:"type"`
}

type featureElementStep struct {
	Keyword string      `json:"keyword"`
	Line    uint32      `json:"line"`
	Name    string      `json:"name"`
	Result  *stepResult `json:"result"`
}

type stepResult struct {
	Duration uint64 `json:"duration"`
	Status   string `json:"status"`
}

// ProcessMessages writes a JSON report to STDOUT
func ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	features := make([]feature, 0)
	elementsByURIAndLineNumber := make(map[string]featureElement)
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
			elements := make([]featureElement, 0)

			for _, child := range m.GherkinDocument.Feature.Children {
				background := child.GetBackground()
				if background != nil {
					element := backgroundToFeatureElement(background)
					elementsByURIAndLineNumber[fmt.Sprintf("%s:%d", m.GherkinDocument.Uri, element.Line)] = element

					elements = append(elements, element)
				}

				scenario := child.GetScenario()
				if scenario != nil {
					element := scenarioToFeatureElement(scenario)
					elementsByURIAndLineNumber[fmt.Sprintf("%s:%d", m.GherkinDocument.Uri, element.Line)] = element

					elements = append(elements, element)
				}
			}

			feature := &feature{
				Description: m.GherkinDocument.Feature.Description,
				Elements:    elements,
				ID:          "some-id",
				Keyword:     m.GherkinDocument.Feature.Keyword,
				Line:        m.GherkinDocument.Feature.Location.Line,
				Name:        m.GherkinDocument.Feature.Name,
				URI:         m.GherkinDocument.Uri,
			}
			features = append(features, *feature)

		case *messages.Envelope_Pickle:
			pickle := m.Pickle
			picklesByID[pickle.Id] = pickle

		case *messages.Envelope_TestStepFinished:
			step := lookupStep(m.TestStepFinished.PickleId, m.TestStepFinished.Index, picklesByID, elementsByURIAndLineNumber)

			step.Result = &stepResult{
				Duration: m.TestStepFinished.TestResult.DurationNanoseconds,
				Status:   strings.ToLower(m.TestStepFinished.TestResult.Status.String()),
			}
		}
	}

	output, _ := json.Marshal(features)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

func lookupStep(pickleID string, stepIndex uint32, picklesByID map[string]*messages.Pickle, elementsByURIAndLineNumber map[string]featureElement) featureElementStep {
	runtime.Breakpoint()
	element := lookupFeatureElement(pickleID, picklesByID, elementsByURIAndLineNumber)
	return element.Steps[stepIndex]
}

func lookupFeatureElement(pickleID string, picklesByID map[string]*messages.Pickle, elementsByURIAndLineNumber map[string]featureElement) featureElement {
	pickle := picklesByID[pickleID]

	return elementsByURIAndLineNumber[pickleToURIAndLineNumber(pickle)]
}

func pickleToURIAndLineNumber(pickle *messages.Pickle) string {
	return fmt.Sprintf("%s:%d", pickle.Uri, pickle.Locations[0].Line)
}

func backgroundToFeatureElement(background *messages.GherkinDocument_Feature_Background) featureElement {
	return makeFeatureElement(
		background.Description,
		background.Keyword,
		background.Location.Line,
		background.Name,
		makefeatureElementSteps(background.GetSteps()),
		"background",
	)
}

func makeFeatureElement(description string, keyword string, line uint32, name string, steps []featureElementStep, elementType string) featureElement {
	return featureElement{
		Description: description,
		Keyword:     keyword,
		Line:        line,
		Name:        name,
		Steps:       steps,
		Type:        elementType,
	}
}

func scenarioToFeatureElement(scenario *messages.GherkinDocument_Feature_Scenario) featureElement {
	return makeFeatureElement(
		scenario.Description,
		scenario.Keyword,
		scenario.Location.Line,
		scenario.Name,
		makefeatureElementSteps(scenario.GetSteps()),
		"scenario",
	)
}

func makefeatureElementSteps(steps []*messages.GherkinDocument_Feature_Step) []featureElementStep {
	elementSteps := make([]featureElementStep, 0)

	for _, step := range steps {
		stepElement := &featureElementStep{
			Keyword: step.Keyword,
			Line:    step.Location.Line,
			Name:    step.Text,
		}

		elementSteps = append(elementSteps, *stepElement)
	}

	return elementSteps
}

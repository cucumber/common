package json

import (
	"encoding/json"
	"fmt"
	"io"

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
	Keyword string `json:"keyword"`
	Line    uint32 `json:"line"`
	Name    string `json:"name"`
}

// ProcessMessages writes a JSON report to STDOUT
func ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	features := make([]feature, 0)
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
					elements = append(elements, backgroundToFeatureElement(background))
				}

				scenario := child.GetScenario()
				if scenario != nil {
					elements = append(elements, scenarioToFeatureElement(scenario))
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
		}
	}

	output, _ := json.Marshal(features)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
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

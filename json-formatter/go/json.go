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
	Description string `json:"description"`
	Keyword     string `json:"keyword"`
	Line        uint32 `json:"line"`
	Name        string `json:"name"`
	Type        string `json:"type"`
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
				element := &featureElement{
					Description: child.GetScenario().Description,
					Keyword:     child.GetScenario().Keyword,
					Line:        child.GetScenario().Location.Line,
					Name:        child.GetScenario().Name,
					Type:        "scenario",
				}

				elements = append(elements, *element)
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

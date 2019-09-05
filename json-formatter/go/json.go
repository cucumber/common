package json

import (
	"encoding/json"
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
	"io"
)

type Feature struct {
	Description string `json:"description"`
	Id          string `json:"id"`
	Keyword     string `json:"keyword"`
	Line        uint32 `json:"line"`
	Name        string `json:"name"`
	Uri         string `json:"uri"`
}

func ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
	features := make([]Feature, 0)
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
			feature := &Feature{
				Description: m.GherkinDocument.Feature.Description,
				Id:          "some-id",
				Keyword:     m.GherkinDocument.Feature.Keyword,
				Line:        m.GherkinDocument.Feature.Location.Line,
				Name:        m.GherkinDocument.Feature.Name,
				Uri:         m.GherkinDocument.Uri,
			}
			features = append(features, *feature)
		}
	}

	output, _ := json.Marshal(features)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

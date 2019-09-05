package json

import (
	"encoding/json"
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
	"io"
)

type Feature struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	Uri  string `json:"uri"`
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
				Id:   "some-id",
				Name: m.GherkinDocument.Feature.Name,
				Uri:  m.GherkinDocument.Uri,
			}
			features = append(features, *feature)
		}
	}

	output, _ := json.Marshal(features)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

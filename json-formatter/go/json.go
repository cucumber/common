package json

import (
	"encoding/json"
	"fmt"
	messages "github.com/cucumber/cucumber-messages-go/v5"
	gio "github.com/gogo/protobuf/io"
	"io"
)

type Feature struct {
	Uri string `json:"uri"`
	Id  string `json:"id"`
}

func ProcessMessages(stdin io.Reader, stdout io.Writer) (err error) {
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
	}

	feature := &Feature{
		Uri: "features/hello.feature",
		Id:  "some-id",
	}

	output, _ := json.Marshal(feature)
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

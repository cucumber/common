// +build wasm

package main

import (
	"bytes"
	"encoding/json"
	messages "github.com/cucumber/cucumber-messages-go/v2"
	"github.com/cucumber/gherkin-go"
	gio "github.com/gogo/protobuf/io"
	"github.com/gogo/protobuf/jsonpb"
	"syscall/js"
)

func parseGherkin(this js.Value, args []js.Value) interface{} {
	stdin := &bytes.Buffer{}
	writer := gio.NewDelimitedWriter(stdin)

	source := `Feature: Minimal

  Scenario: a
    Given a

  Scenario: b
    Given b
`

	wrapper := &messages.Wrapper{
		Message: &messages.Wrapper_Source{
			Source: &messages.Source{
				Uri:  "features/test.feature",
				Data: source,
				Media: &messages.Media{
					Encoding:    "UTF-8",
					ContentType: "text/x.cucumber.gherkin+plain",
				},
			},
		},
	}

	err := writer.WriteMsg(wrapper)
	if err != nil {
		panic(err)
	}

	wrappers, err := gherkin.Messages(
		nil,
		stdin,
		"en",
		true,
		true,
		true,
		nil,
		false,
	)
	if err != nil {
		panic(err)
	}

	jsObjects := make([]interface{}, len(wrappers))
	ma := jsonpb.Marshaler{}
	for i, wrapper := range wrappers {
		msgJson, err := ma.MarshalToString(&wrapper)
		if err != nil {
			panic(err)
		}

		var dat map[string]interface{}
		if err := json.Unmarshal([]byte(msgJson), &dat); err != nil {
			panic(err)
		}
		jsObjects[i] = dat
	}
	return js.ValueOf(jsObjects)
}

func main() {
	//c := make(chan struct{}, 0)

	println("Go WebAssembly Initialised")
	fn := js.FuncOf(parseGherkin)
	js.Global().Set("gherkin", fn)

	//<-c
}

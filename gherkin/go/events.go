package gherkin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"runtime"
)

type (
	MediaType struct {
		Encoding string `json:"encoding"`
		Type     string `json:"type"`
	}

	SourceReference struct {
		URI      string   `json:"uri"`
		Location Location `json:"location"` // from gherkin AST
	}

	CucumberEvent interface{}

	SourceEvent struct {
		URI  string
		Data string
	}

	GherkinDocumentEvent struct {
		Document *GherkinDocument
		URI      string
	}

	AttachmentEvent struct {
		Source SourceReference
		Data   string
		Media  MediaType
	}
)

var (
	gherkinMedia = MediaType{"utf-8", "text/vnd.cucumber.gherkin+plain"}
	errorMedia   = MediaType{"utf-8", "text/vnd.cucumber.stacktrace+plain"}
)

func (se *SourceEvent) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Type  string    `json:"type"`
		URI   string    `json:"uri"`
		Data  string    `json:"data"`
		Media MediaType `json:"media"`
	}{
		Type:  "source",
		URI:   se.URI,
		Data:  se.Data,
		Media: gherkinMedia,
	})
}

func (gde *GherkinDocumentEvent) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Type     string           `json:"type"`
		URI      string           `json:"uri"`
		Document *GherkinDocument `json:"document"`
	}{
		Type:     "gherkin-document",
		URI:      gde.URI,
		Document: gde.Document,
	})
}

func (ae *AttachmentEvent) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Type   string          `json:"type"`
		Source SourceReference `json:"source"`
		Data   string          `json:"data"`
		Media  MediaType       `json:"media"`
	}{
		Type:   "attachment",
		Source: ae.Source,
		Data:   ae.Data,
		Media:  ae.Media,
	})
}

func GherkinEvents(paths ...string) <-chan CucumberEvent {
	ch := make(chan CucumberEvent)
	go func() {
		// @TODO can be run concurrently if supported, by consumer
		for _, p := range paths {
			in, err := os.Open(p)
			if err != nil {
				ch <- newErrorEvent(fmt.Errorf("open feature file: %v", err), p)
				continue
			}

			var buf bytes.Buffer
			doc, err := ParseGherkinDocument(io.TeeReader(in, &buf))
			if err != nil {
				in.Close()
				ch <- newErrorEvent(fmt.Errorf("parse feature file: %v", err), p)
				continue
			}

			ch <- &SourceEvent{
				URI:  p,
				Data: buf.String(),
			}

			ch <- &GherkinDocumentEvent{
				URI:      p,
				Document: doc,
			}

			in.Close()
		}
		close(ch)
	}()
	return ch
}

func newErrorEvent(err error, uri string) *AttachmentEvent {
	_, _, ln, _ := runtime.Caller(1)
	return &AttachmentEvent{
		Data:  fmt.Sprintf("%+v", err), // @TODO: may implement rules to format with stacktrace
		Media: errorMedia,
		Source: SourceReference{
			URI: uri,
			Location: Location{
				Line: ln,
			},
		},
	}
}

package gherkin

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"os"
)

type (
	MediaType struct {
		Encoding string `json:"encoding"`
		Type     string `json:"type"`
	}

	SourceReference struct {
		URI   string   `json:"uri"`
		Start Location `json:"start"` // from gherkin AST
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

	PickleEvent struct {
		URI    string
		Pickle *Pickle
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

func (pe *PickleEvent) MarshalJSON() ([]byte, error) {
	return json.Marshal(&struct {
		Type   string  `json:"type"`
		URI    string  `json:"uri"`
		Pickle *Pickle `json:"pickle"`
	}{
		Type:   "pickle",
		URI:    pe.URI,
		Pickle: pe.Pickle,
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
				fmt.Fprintln(os.Stderr, "open feature file:", p, "-", err)
				continue
			}

			var buf bytes.Buffer
			doc, err := ParseGherkinDocument(io.TeeReader(in, &buf))
			if errs, ok := err.(parseErrors); ok {
				// expected parse errors
				for _, err := range errs {
					if pe, ok := err.(*parseError); ok {
						ch <- pe.asAttachment(p)
					} else {
						fmt.Fprintf(os.Stderr, "parse feature file: %s, error type: %T - %+v\n", p, err, err)
					}
				}
				in.Close()
				continue
			}

			if err != nil {
				// non parse error, unexpected
				fmt.Fprintf(os.Stderr, "parse feature file: %s, error type: %T - %+v\n", p, err, err)
				in.Close()
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

			for _, pickle := range doc.Pickles() {
				ch <- &PickleEvent{
					URI:    p,
					Pickle: pickle,
				}
			}

			in.Close()
		}
		close(ch)
	}()
	return ch
}

func (a *parseError) asAttachment(uri string) *AttachmentEvent {
	return &AttachmentEvent{
		Data:  a.Error(),
		Media: errorMedia,
		Source: SourceReference{
			URI:   uri,
			Start: *a.loc,
		},
	}
}

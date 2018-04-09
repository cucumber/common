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
	gherkinMedia = MediaType{"utf-8", "text/x.cucumber.gherkin+plain"}
	errorMedia   = MediaType{"utf-8", "text/x.cucumber.stacktrace+plain"}
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

func GherkinEvents(paths ...string) ([]CucumberEvent, error) {
	return GherkinEventsForLanguage(paths, DEFAULT_DIALECT)
}

func GherkinEventsForLanguage(paths []string, default_lang string) ([]CucumberEvent, error) {
	var events []CucumberEvent
	for _, p := range paths {
		in, err := os.Open(p)
		if err != nil {
			return events, fmt.Errorf("read feature file: %s - %+v", p, err)
		}
		defer in.Close()

		var buf bytes.Buffer
		doc, err := ParseGherkinDocumentForLanguage(io.TeeReader(in, &buf), default_lang)
		if errs, ok := err.(parseErrors); ok {
			// expected parse errors
			for _, err := range errs {
				if pe, ok := err.(*parseError); ok {
					events = append(events, pe.asAttachment(p))
				} else {
					return events, fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", p, err)
				}
			}
			continue
		}

		if err != nil {
			// non parse error, unexpected
			return events, fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", p, err)
		}

		events = append(events, &SourceEvent{
			URI:  p,
			Data: buf.String(),
		})

		events = append(events, &GherkinDocumentEvent{
			URI:      p,
			Document: doc,
		})

		for _, pickle := range doc.Pickles() {
			events = append(events, &PickleEvent{
				URI:    p,
				Pickle: pickle,
			})
		}
	}
	return events, nil
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

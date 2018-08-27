package gherkin

import (
	"fmt"
	"github.com/cucumber/cucumber-messages-go"
	gio "github.com/gogo/protobuf/io"
	"io"
	"io/ioutil"
	"math"
	"strings"
)

func GherkinMessages(paths []string, sourceStream io.Reader, language string, includeSource bool, includeGherkinDocument bool, includePickles bool) ([]messages.Wrapper, error) {
	var result []messages.Wrapper

	processSource := func(source *messages.Source) error {
		if includeSource {
			result = append(result, messages.Wrapper{
				Message: &messages.Wrapper_Source{
					Source: source,
				},
			})
		}

		doc, err := ParseGherkinDocumentForLanguage(strings.NewReader(source.Data), language)
		if errs, ok := err.(parseErrors); ok {
			// expected parse errors
			for _, err := range errs {
				if pe, ok := err.(*parseError); ok {
					result = append(result, pe.asAttachment(source.Uri))
				} else {
					return fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", source.Uri, err)
				}
			}
			return nil
		}

		if includeGherkinDocument {
			doc.Uri = source.Uri
			result = append(result, messages.Wrapper{
				Message: &messages.Wrapper_GherkinDocument{
					GherkinDocument: doc,
				},
			})
		}

		if includePickles {
			for _, pickle := range Pickles(*doc, source.Uri) {
				result = append(result, messages.Wrapper{
					Message: &messages.Wrapper_Pickle{
						Pickle: pickle,
					},
				})
			}
		}
		return nil
	}

	if len(paths) == 0 {
		reader := gio.NewDelimitedReader(sourceStream, math.MaxInt32)
		for {
			source := &messages.Source{}
			if err := reader.ReadMsg(source); err != nil {
				break
			}
			processSource(source)
		}
	} else {
		for _, path := range paths {
			in, err := ioutil.ReadFile(path)
			if err != nil {
				return result, fmt.Errorf("read feature file: %s - %+v", path, err)
			}
			source := &messages.Source{
				Uri:  path,
				Data: string(in),
				Media: &messages.Media{
					Encoding:    "UTF-8",
					ContentType: "text/x.cucumber.gherkin+plain",
				},
			}
			processSource(source)
		}
	}

	return result, nil
}

func (a *parseError) asAttachment(uri string) messages.Wrapper {
	return messages.Wrapper{
		Message: &messages.Wrapper_Attachment{
			Attachment: &messages.Attachment{
				Data: a.Error(),
				Source: &messages.SourceReference{
					Uri: uri,
					Location: &messages.Location{
						Line:   uint32(a.loc.Line),
						Column: uint32(a.loc.Column),
					},
				},
			}},
	}
}

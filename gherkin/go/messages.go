package gherkin

import (
	"github.com/cucumber/cucumber-messages-go"
	"os"
	"fmt"
	"bytes"
	"io"
)

func CucumberMessages(paths []string, language string, includeSource bool, includeGherkinDocument bool, includePickles bool) ([]messages.Wrapper, error) {
	var result []messages.Wrapper

	for _, path := range paths {
		in, err := os.Open(path)
		if err != nil {
			return result, fmt.Errorf("read feature file: %s - %+v", path, err)
		}
		defer in.Close()

		var buf bytes.Buffer
		doc, err := ParseGherkinDocumentForLanguage(io.TeeReader(in, &buf), language)
		if errs, ok := err.(parseErrors); ok {
			// expected parse errors
			for _, err := range errs {
				if pe, ok := err.(*parseError); ok {
					result = append(result, pe.asAttachment(path))
				} else {
					return result, fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", path, err)
				}
			}
			continue
		}

		if err != nil {
			// non parse error, unexpected
			return result, fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", path, err)
		}
		doc.Uri = path

		if includeSource {
			result = append(result, messages.Wrapper{
				Message: &messages.Wrapper_Source{
					Source: &messages.Source{
						Uri:  path,
						Data: buf.String(),
						Media: &messages.Media{
							Encoding:    "UTF-8",
							ContentType: "text/x.cucumber.gherkin+plain",
						},
					},
				},
			})
		}

		if includeGherkinDocument {
			result = append(result, messages.Wrapper{
				Message: &messages.Wrapper_GherkinDocument{
					GherkinDocument: doc,
				},
			})
		}

		if includePickles {
			for _, pickle := range Pickles(*doc, path) {
				result = append(result, messages.Wrapper{
					Message: &messages.Wrapper_Pickle{
						Pickle: pickle,
					},
				})
			}
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

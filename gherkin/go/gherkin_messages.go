package gherkin

import (
	"fmt"
	"strings"

	"github.com/cucumber/cucumber-messages-go"
	"github.com/golang/protobuf/proto"
	"io"
	"io/ioutil"
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
		in, err := ioutil.ReadAll(sourceStream)
		if err != nil {
			return result, fmt.Errorf("read stdin: %v\n", err)
		}

		for len(in) > 0 {
			l, bytesRead := proto.DecodeVarint(in)
			size := int(l)
			skip := bytesRead + size
			messageBytes := in[bytesRead:skip]
			source := &messages.Source{}
			if err := proto.Unmarshal(messageBytes, source); err != nil {
				return result, fmt.Errorf("parse message: %v\n", err)
			}
			processSource(source)

			if len(in) >= skip {
				in = in[skip:]
			}
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

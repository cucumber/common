package gherkin

import (
	"bufio"
	"fmt"
	"github.com/cucumber/cucumber-messages-go/v7"
	gio "github.com/gogo/protobuf/io"
	"github.com/gogo/protobuf/jsonpb"
	"github.com/gogo/protobuf/proto"
	"io"
	"io/ioutil"
	"math"
	"strings"
)

func Messages(
	paths []string,
	sourceStream io.Reader,
	language string,
	includeSource bool,
	includeGherkinDocument bool,
	includePickles bool,
	outStream io.Writer,
	json bool,
	newId func() string,
) ([]messages.Envelope, error) {
	var result []messages.Envelope
	var err error

	handleMessage := func(result []messages.Envelope, message *messages.Envelope) ([]messages.Envelope, error) {
		if outStream != nil {
			if json {
				ma := jsonpb.Marshaler{}
				msgJson, err := ma.MarshalToString(message)
				if err != nil {
					return result, err
				}
				out := bufio.NewWriter(outStream)
				out.WriteString(msgJson)
				out.WriteString("\n")
			} else {
				bytes, err := proto.Marshal(message)
				if err != nil {
					return result, err
				}
				outStream.Write(proto.EncodeVarint(uint64(len(bytes))))
				outStream.Write(bytes)
			}

		} else {
			result = append(result, *message)
		}

		return result, err
	}

	processSource := func(source *messages.Source) error {
		if includeSource {
			result, err = handleMessage(result, &messages.Envelope{
				Message: &messages.Envelope_Source{
					Source: source,
				},
			})
		}
		doc, err := ParseGherkinDocumentForLanguage(strings.NewReader(source.Data), language, newId)
		if errs, ok := err.(parseErrors); ok {
			// expected parse errors
			for _, err := range errs {
				if pe, ok := err.(*parseError); ok {
					result, err = handleMessage(result, pe.asAttachment(source.Uri))
				} else {
					return fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", source.Uri, err)
				}
			}
			return nil
		}

		if includeGherkinDocument {
			doc.Uri = source.Uri
			result, err = handleMessage(result, &messages.Envelope{
				Message: &messages.Envelope_GherkinDocument{
					GherkinDocument: doc,
				},
			})
		}

		if includePickles {
			for _, pickle := range Pickles(*doc, source.Uri, newId) {
				result, err = handleMessage(result, &messages.Envelope{
					Message: &messages.Envelope_Pickle{
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
			wrapper := &messages.Envelope{}
			err := reader.ReadMsg(wrapper)
			if err == io.EOF {
				break
			}

			switch t := wrapper.Message.(type) {
			case *messages.Envelope_Source:
				processSource(t.Source)
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
					Encoding:    messages.Media_UTF8,
					ContentType: "text/x.cucumber.gherkin+plain",
				},
			}
			processSource(source)
		}
	}

	return result, err
}

func (a *parseError) asAttachment(uri string) *messages.Envelope {
	return &messages.Envelope{
		Message: &messages.Envelope_Attachment{
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

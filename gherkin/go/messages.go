package gherkin

import (
	"bufio"
	"fmt"
	"github.com/cucumber/cucumber-messages-go"
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
) ([]messages.Wrapper, error) {
	var result []messages.Wrapper
	var err error

	handleMessage := func(result []messages.Wrapper, message *messages.Wrapper) ([]messages.Wrapper, error) {
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
			result, err = handleMessage(result, &messages.Wrapper{
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
					result, err = handleMessage(result, pe.asAttachment(source.Uri))
				} else {
					return fmt.Errorf("parse feature file: %s, unexpected error: %+v\n", source.Uri, err)
				}
			}
			return nil
		}

		if includeGherkinDocument {
			doc.Uri = source.Uri
			result, err = handleMessage(result, &messages.Wrapper{
				Message: &messages.Wrapper_GherkinDocument{
					GherkinDocument: doc,
				},
			})
		}

		if includePickles {
			for _, pickle := range Pickles(*doc, source.Uri) {
				result, err = handleMessage(result, &messages.Wrapper{
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
			wrapper := &messages.Wrapper{}
			err := reader.ReadMsg(wrapper)
			if err == io.EOF {
				break
			}

			switch t := wrapper.Message.(type) {
			case *messages.Wrapper_Source:
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
					Encoding:    "UTF-8",
					ContentType: "text/x.cucumber.gherkin+plain",
				},
			}
			processSource(source)
		}
	}

	return result, err
}

func (a *parseError) asAttachment(uri string) *messages.Wrapper {
	return &messages.Wrapper{
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

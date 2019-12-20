package json

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"

	messages "github.com/cucumber/cucumber-messages-go/v8"
	gio "github.com/gogo/protobuf/io"
)

type Formatter struct {
	lookup *MessageLookup

	jsonFeatures      []*jsonFeature
	jsonFeaturesByURI map[string]*jsonFeature
	testCaseById      map[string]*TestCase
	verbose           bool
}

// ProcessMessages writes a JSON report to STDOUT
func (self *Formatter) ProcessMessages(reader gio.ReadCloser, stdout io.Writer) (err error) {
	self.verbose = false
	self.lookup = &MessageLookup{}
	self.lookup.Initialize(self.verbose)

	self.jsonFeatures = make([]*jsonFeature, 0)
	self.jsonFeaturesByURI = make(map[string]*jsonFeature)
	self.testCaseById = make(map[string]*TestCase)

	for {
		envelope := &messages.Envelope{}
		err := reader.ReadMsg(envelope)
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		err = self.lookup.ProcessMessage(envelope)
		if err != nil {
			return err
		}

		switch m := envelope.Message.(type) {
		case *messages.Envelope_TestCaseStarted:
			testCase := ProcessTestCaseStarted(m.TestCaseStarted, self.lookup)
			if testCase != nil {
				self.testCaseById[testCase.TestCase.Id] = testCase
			}

		case *messages.Envelope_TestStepFinished:
			testStep := ProcessTestStepFinished(m.TestStepFinished, self.lookup)
			if testStep != nil {
				self.testCaseById[testStep.TestCaseID].appendStep(testStep)
			}

		case *messages.Envelope_TestCaseFinished:
			testCaseStarted := self.lookup.LookupTestCaseStarted(m.TestCaseFinished.TestCaseStartedId)
			testCase, ok := self.testCaseById[testCaseStarted.TestCaseId]

			if ok {
				jsonFeature := self.findOrCreateJsonFeature(testCase.Pickle)
				for _, jsonElement := range TestCaseToJSON(testCase) {
					jsonFeature.Elements = append(jsonFeature.Elements, jsonElement)
				}
			}
		}
	}

	output, _ := json.MarshalIndent(self.jsonFeatures, "", "  ")
	_, err = fmt.Fprintln(stdout, string(output))
	return err
}

func (self *Formatter) findOrCreateJsonFeature(pickle *messages.Pickle) *jsonFeature {
	jFeature, ok := self.jsonFeaturesByURI[pickle.Uri]
	if !ok {
		gherkinDocumentFeature := self.lookup.LookupGherkinDocument(pickle.Uri).Feature

		jFeature = &jsonFeature{
			Description: gherkinDocumentFeature.Description,
			Elements:    make([]*jsonFeatureElement, 0),
			ID:          self.makeId(gherkinDocumentFeature.Name),
			Keyword:     gherkinDocumentFeature.Keyword,
			Line:        gherkinDocumentFeature.Location.Line,
			Name:        gherkinDocumentFeature.Name,
			URI:         pickle.Uri,
			Tags:        make([]*jsonTag, len(gherkinDocumentFeature.Tags)),
		}

		for tagIndex, tag := range gherkinDocumentFeature.Tags {
			jFeature.Tags[tagIndex] = &jsonTag{
				Line: tag.Location.Line,
				Name: tag.Name,
			}
		}

		self.jsonFeaturesByURI[pickle.Uri] = jFeature
		self.jsonFeatures = append(self.jsonFeatures, jFeature)
	}
	return jFeature
}

func (self *Formatter) makeId(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

func (self *Formatter) comment(message string) {
	if self.verbose {
		fmt.Println(fmt.Sprintf("// Formatter: %s", message))
	}
}

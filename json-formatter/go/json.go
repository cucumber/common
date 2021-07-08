package json

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"

	"github.com/cucumber/common/messages/go/v17"
)

type Formatter struct {
	lookup *MessageLookup

	jsonFeatures      []*jsonFeature
	jsonFeaturesByURI map[string]*jsonFeature
	testCaseById      map[string]*TestCase
	verbose           bool
}

// ProcessMessages writes a JSON report to STDOUT
func (self *Formatter) ProcessMessages(reader io.Reader, stdout io.Writer) (err error) {
	self.verbose = false
	self.lookup = &MessageLookup{}
	self.lookup.Initialize(self.verbose)

	self.jsonFeatures = make([]*jsonFeature, 0)
	self.jsonFeaturesByURI = make(map[string]*jsonFeature)
	self.testCaseById = make(map[string]*TestCase)

	decoder := json.NewDecoder(reader)
	for {
		envelope := &messages.Envelope{}
		err := decoder.Decode(envelope)
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

		if envelope.TestCaseStarted != nil {
			err, testCase := ProcessTestCaseStarted(envelope.TestCaseStarted, self.lookup)
			if err != nil {
				return err
			}
			self.testCaseById[testCase.TestCase.Id] = testCase
		}

		if envelope.TestStepFinished != nil {
			err, testStep := ProcessTestStepFinished(envelope.TestStepFinished, self.lookup)
			if err != nil {
				return err
			}
			testCase := self.testCaseById[testStep.TestCaseID]
			if testCase == nil {
				keys := make([]string, 0, len(self.testCaseById))
				for k := range self.testCaseById {
					keys = append(keys, k)
				}
				panic("No testCase for " + testStep.TestCaseID + strings.Join(keys, ", "))
			}
			testCase.appendStep(testStep)
		}

		if envelope.TestCaseFinished != nil {
			testCaseStarted := self.lookup.LookupTestCaseStarted(envelope.TestCaseFinished.TestCaseStartedId)
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
			Line:        uint32(gherkinDocumentFeature.Location.Line),
			Name:        gherkinDocumentFeature.Name,
			URI:         pickle.Uri,
			Tags:        make([]*jsonTag, len(gherkinDocumentFeature.Tags)),
		}

		for tagIndex, tag := range gherkinDocumentFeature.Tags {
			jFeature.Tags[tagIndex] = &jsonTag{
				Line: uint32(tag.Location.Line),
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

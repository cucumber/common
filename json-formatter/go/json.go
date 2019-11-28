package json

import (
	"encoding/json"
	"fmt"
	"io"
	"strings"

	messages "github.com/cucumber/cucumber-messages-go/v7"
	gio "github.com/gogo/protobuf/io"
)

type Formatter struct {
	lookup *MessageLookup

	jsonFeatures            []*jsonFeature
	jsonFeaturesByURI       map[string]*jsonFeature
	jsonStepsByPickleStepId map[string]*jsonStep
	exampleRowIndexById     map[string]int
	testCaseById            map[string]*TestCase
	verbose                 bool
}

// ProcessMessages writes a JSON report to STDOUT
func (self *Formatter) ProcessMessages(reader gio.ReadCloser, stdout io.Writer) (err error) {
	self.verbose = false
	self.lookup = &MessageLookup{}
	self.lookup.Initialize(self.verbose)

	self.jsonFeatures = make([]*jsonFeature, 0)
	self.jsonFeaturesByURI = make(map[string]*jsonFeature)
	self.jsonStepsByPickleStepId = make(map[string]*jsonStep)
	self.exampleRowIndexById = make(map[string]int)

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
		case *messages.Envelope_GherkinDocument:
			self.comment("Treating GherkinDocument")
			for _, child := range m.GherkinDocument.Feature.Children {
				scenario := child.GetScenario()
				if scenario != nil {
					for _, example := range scenario.Examples {
						for index, row := range example.TableBody {
							// index + 2: it's a 1 based index and the header is counted too.
							self.exampleRowIndexById[row.Id] = index + 2
						}
					}
				}
			}

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
				jsonFeature.Elements = append(jsonFeature.Elements, TestCaseToJSON(testCase)[0])
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

func (self *Formatter) isBackgroundStep(id string) bool {
	_, ok := self.lookup.backgroundByStepID[id]
	return ok
}

func (self *Formatter) makeId(s string) string {
	return strings.ToLower(strings.Replace(s, " ", "-", -1))
}

func (self *Formatter) durationToNanos(d *messages.Duration) uint64 {
	self.comment(fmt.Sprintf("Converting to nanos: %d - %d", d.Seconds, d.Nanos))
	return uint64(d.Seconds*1000000000 + int64(d.Nanos))
}

func (self *Formatter) comment(message string) {
	if self.verbose {
		fmt.Println(fmt.Sprintf("// Formatter: %s", message))
	}
}

package pretty

import (
	"testing"
	"bytes"
	gio "github.com/gogo/protobuf/io"
	"github.com/stretchr/testify/require"
	//"github.com/fatih/color"
	"github.com/cucumber/cucumber-messages-go"
	"github.com/cucumber/gherkin-go"
)

func TestPrintsFeatureHeaderWithComments(t *testing.T) {
	src := `# Hello
Feature: Hello
`

	stdout := &bytes.Buffer{}
	ProcessMessages(messageReader(t, src), stdout)

	require.EqualValues(t,
		src,
		stdout.String())
}

func TestPrintsFeatureAndScenarioHeadersWithComments(t *testing.T) {
	src := `# Hello
Feature: Hello

  # World
  Scenario: World
`

	stdout := &bytes.Buffer{}
	ProcessMessages(messageReader(t, src), stdout)

	require.EqualValues(t,
		src,
		stdout.String())
}

func TestPrintsFullLevel(t *testing.T) {
	src := `# A
Feature: A

  # B
  Rule: B

    # C
    Scenario: C
`

	stdout := &bytes.Buffer{}
	ProcessMessages(messageReader(t, src), stdout)

	require.EqualValues(t,
		src,
		stdout.String())
}

func messageReader(t *testing.T, src string) *bytes.Buffer {
	source := &messages.Source{
		Uri:  "features/test.feature",
		Data: src,
		Media: &messages.Media{
			Encoding:    "UTF-8",
			ContentType: "text/x.cucumber.gherkin+plain",
		},
	}
	sources := &bytes.Buffer{}
	sourcesWriter := gio.NewDelimitedWriter(sources)
	sourcesWriter.WriteMsg(source)
	wrappers, err := gherkin.GherkinMessages(
		nil,
		sources,
		"en",
		true,
		true,
		true,
	)
	require.NoError(t, err)
	prettyStdin := &bytes.Buffer{}
	prettyStdinWriter := gio.NewDelimitedWriter(prettyStdin)
	for _, wrapper := range wrappers {
		prettyStdinWriter.WriteMsg(&wrapper)
	}
	return prettyStdin
}

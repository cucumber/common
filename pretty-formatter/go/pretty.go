/*
Package pretty implements a Cucumber formatter that pretty prints
Gherkin documents.
*/

package pretty

import (
	"io"
	"fmt"
	"github.com/cucumber/cucumber-messages-go"
	gio "github.com/gogo/protobuf/io"
	"strings"
)

func ProcessMessages(stdin io.Reader, stdout io.Writer) {
	r := gio.NewDelimitedReader(stdin, 4096)
	for {
		wrapper := &messages.Wrapper{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}

		switch t := wrapper.Message.(type) {
		case *messages.Wrapper_GherkinDocument:
			gherkinDocument := t.GherkinDocument
			processGherkinDocument(gherkinDocument, stdout)
		}

	}
}

func processGherkinDocument(gherkinDocument *messages.GherkinDocument, stdout io.Writer) {
	feature := gherkinDocument.Feature
	comments := gherkinDocument.Comments
	if feature != nil {
		comments = processFeature(comments, feature, stdout)
	}
}

func processFeature(comments []*messages.Comment, feature *messages.Feature, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, feature.Location, stdout)
	printKeywordNode(stdout, 0, feature)
	for _, child := range feature.Children {
		fmt.Fprintf(stdout, "\n")
		switch t := child.Value.(type) {
		case *messages.FeatureChild_Background:
		case *messages.FeatureChild_Rule:
			comments = processRule(comments, t.Rule, stdout)
		case *messages.FeatureChild_Scenario:
			comments = processScenario(comments, t.Scenario, 1, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func processRule(comments []*messages.Comment, rule *messages.Rule, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, rule.Location, stdout)
	printKeywordNode(stdout, 1, rule)

	for _, child := range rule.Children {
		fmt.Fprintf(stdout, "\n")
		switch t := child.Value.(type) {
		case *messages.RuleChild_Background:
		case *messages.RuleChild_Scenario:
			comments = processScenario(comments, t.Scenario, 2, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func processScenario(comments []*messages.Comment, scenario *messages.Scenario, depth int, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, scenario.Location, stdout)
	printKeywordNode(stdout, depth, scenario)
	return comments
}

func printKeywordNode(stdout io.Writer, depth int, keywordNode KeywordNode) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s: %s\n", keywordNode.GetKeyword(), keywordNode.GetName())
}

type KeywordNode interface {
	GetKeyword() string
	GetName() string
}

func printComments(comments []*messages.Comment, location *messages.Location, stdout io.Writer) ([]*messages.Comment) {
	for len(comments) > 0 {
		comment := comments[0]
		if location.Line < comment.Location.Line {
			break
		}
		fmt.Fprintf(stdout, "%s\n", comment.Text)
		comments = comments[1:]
	}
	return comments
}

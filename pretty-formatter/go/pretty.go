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
	"strconv"
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
			comments = processBackground(comments, t.Background, 1, stdout)
		case *messages.FeatureChild_Rule:
			comments = processRule(comments, t.Rule, 1, stdout)
		case *messages.FeatureChild_Scenario:
			comments = processScenario(comments, t.Scenario, 1, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func processRule(comments []*messages.Comment, rule *messages.Rule, depth int, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, rule.Location, stdout)
	printKeywordNode(stdout, depth, rule)

	for _, child := range rule.Children {
		fmt.Fprintf(stdout, "\n")
		switch t := child.Value.(type) {
		case *messages.RuleChild_Background:
			comments = processBackground(comments, t.Background, 2, stdout)
		case *messages.RuleChild_Scenario:
			comments = processScenario(comments, t.Scenario, 2, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func processBackground(comments []*messages.Comment, background *messages.Background, depth int, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, background.Location, stdout)
	printKeywordNode(stdout, depth, background)
	for _, step := range background.GetSteps() {
		printStep(stdout, depth+1, step)
	}
	return comments
}

func processScenario(comments []*messages.Comment, scenario *messages.Scenario, depth int, stdout io.Writer) ([]*messages.Comment) {
	comments = printComments(comments, scenario.Location, stdout)
	printKeywordNode(stdout, depth, scenario)
	for _, step := range scenario.GetSteps() {
		printStep(stdout, depth+1, step)
	}
	return comments
}

func printStep(stdout io.Writer, depth int, step *messages.Step) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", step.GetKeyword(), step.GetText())

	table := step.GetDataTable()
	if table != nil {
		printDataTable(stdout, depth+1, table)
	}
}

func max(x, y int) int {
	if x < y {
		return y
	}
	return x
}

func printDataTable(stdout io.Writer, depth int, table *messages.DataTable) {
	rowCount := len(table.GetRows())

	columnCount := len(table.GetRows()[0].GetCells())
	columnWidths := make([]int, columnCount, columnCount)
	columnNumericCount := make([]int, columnCount, columnCount)

	for _, row := range table.GetRows() {
		for columnIndex, cell := range row.GetCells() {
			columnWidths[columnIndex] = max(columnWidths[columnIndex], len(cell.GetValue()))
			_, err := strconv.ParseFloat(cell.GetValue(), 32)
			if err == nil {
				columnNumericCount[columnIndex] += 1
			}
		}
	}

	for _, row := range table.GetRows() {
		fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
		for columnIndex, cell := range row.GetCells() {
			columnWidth := columnWidths[columnIndex]
			numericValueRatio := float32(columnNumericCount[columnIndex]) / float32(rowCount)
			var format string
			if numericValueRatio >= 0.5 {
				// More than 50% of cells in column are numeric. Right-align.
				format = fmt.Sprintf("| %%%dv ", columnWidth)
			} else {
				format = fmt.Sprintf("| %%-%dv ", columnWidth)
			}
			fmt.Fprintf(stdout, format, cell.GetValue())
		}
		fmt.Fprintf(stdout, "|\n")
	}
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

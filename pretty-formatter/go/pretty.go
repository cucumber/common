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
	"regexp"
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
	comments = processComments(comments, feature.Location, stdout)
	processKeywordNode(stdout, 0, feature)
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
	comments = processComments(comments, rule.Location, stdout)
	processKeywordNode(stdout, depth, rule)

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
	comments = processComments(comments, background.Location, stdout)
	processKeywordNode(stdout, depth, background)
	for _, step := range background.GetSteps() {
		processStep(stdout, depth+1, step)
	}
	return comments
}

func processScenario(comments []*messages.Comment, scenario *messages.Scenario, depth int, stdout io.Writer) ([]*messages.Comment) {
	comments = processComments(comments, scenario.Location, stdout)
	processTags(stdout, depth, scenario.Tags)
	processKeywordNode(stdout, depth, scenario)
	for _, step := range scenario.GetSteps() {
		processStep(stdout, depth+1, step)
	}
	return comments
}

func processTags(stdout io.Writer, depth int, tags []*messages.Tag) {
	if len(tags) > 0 {
		fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
		for n, tag := range tags {
			if n > 0 {
				fmt.Fprint(stdout, " ")
			}
			fmt.Fprint(stdout, tag.GetName())
		}
		fmt.Fprintf(stdout, "\n")
	}
}

func processStep(stdout io.Writer, depth int, step *messages.Step) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", step.GetKeyword(), step.GetText())

	table := step.GetDataTable()
	if table != nil {
		processDataTable(stdout, depth+1, table)
	}

	docString := step.GetDocString()
	if docString != nil {
		processDocString(stdout, depth+1, docString)
	}
}

func processDocString(stdout io.Writer, depth int, docString *messages.DocString) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", docString.Delimiter, docString.ContentType)

	re := regexp.MustCompile("(?m)^")
	indentedContent := re.ReplaceAllString(docString.Content, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s\n", indentedContent)

	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", docString.Delimiter, docString.ContentType)
}

func processDataTable(stdout io.Writer, depth int, table *messages.DataTable) {
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

func processKeywordNode(stdout io.Writer, depth int, keywordNode KeywordNode) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s: %s\n", keywordNode.GetKeyword(), keywordNode.GetName())
}

type KeywordNode interface {
	GetKeyword() string
	GetName() string
}

func processComments(comments []*messages.Comment, location *messages.Location, stdout io.Writer) ([]*messages.Comment) {
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

func max(x, y int) int {
	if x < y {
		return y
	}
	return x
}

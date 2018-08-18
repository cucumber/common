/*
Package pretty implements a Cucumber formatter that pretty prints
Gherkin documents.
*/

package pretty

import (
	"fmt"
	"io"

	"github.com/cucumber/cucumber-messages-go"
	gio "github.com/gogo/protobuf/io"
	"regexp"
	"strconv"
	"strings"
)

func ProcessMessages(stdin io.Reader, stdout io.Writer, resultsMode bool) {
	r := gio.NewDelimitedReader(stdin, 4096)
	for {
		wrapper := &messages.Wrapper{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}

		switch t := wrapper.Message.(type) {
		case *messages.Wrapper_GherkinDocument:
			dp := DocumentPrinter{
				Doc: t.GherkinDocument,
				Writer: stdout,
				Comments: t.GherkinDocument.Comments,
			}
			
			dp.processGherkinDocument()
		case *messages.Wrapper_TestStepFinished:
			//			finished := t.TestStepFinished

			// Look up AST node....
			//			sourceLine := finished.TestCase.SourceLine

			//			fmt.Fprintf(stdout, "SXX %v\n", finished.GetTestResult().GetStatus().String())
		}

	}
}

type DocumentPrinter struct {
	Doc *messages.GherkinDocument
	Writer io.Writer
	Comments []*messages.Comment
}

func (dp DocumentPrinter) processGherkinDocument() {
	if dp.Doc.Feature != nil {
		dp.processFeature()
	}
}

func (dp DocumentPrinter) processFeature() {
	dp.processComments(dp.Doc.Feature.Location)
	dp.processKeywordNode(0, dp.Doc.Feature)
	for _, child := range dp.Doc.Feature.Children {
		fmt.Fprintf(dp.Writer, "\n")
		switch t := child.Value.(type) {
		case *messages.FeatureChild_Background:
			dp.processBackground(t.Background, 1)
		case *messages.FeatureChild_Rule:
			dp.processRule(t.Rule, 1)
		case *messages.FeatureChild_Scenario:
			dp.processScenario(t.Scenario, 1)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
}

func (dp DocumentPrinter) processRule(rule *messages.Rule, depth int) {
	dp.processComments(rule.Location)
	dp.processKeywordNode(depth, rule)

	for _, child := range rule.Children {
		fmt.Fprintf(dp.Writer, "\n")
		switch t := child.Value.(type) {
		case *messages.RuleChild_Background:
			dp.processBackground(t.Background, 2)
		case *messages.RuleChild_Scenario:
			dp.processScenario(t.Scenario, 2)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
}

func (dp DocumentPrinter) processBackground(background *messages.Background, depth int) {
	dp.processComments(background.Location)
	dp.processKeywordNode(depth, background)
	for _, step := range background.GetSteps() {
		dp.processStep(depth+1, step)
	}
}

func (dp DocumentPrinter) processScenario(scenario *messages.Scenario, depth int) {
	//sourceLine := &messages.SourceLine{
	//	Uri: uri,
	//	Line: scenario.Location.Line,
	//}

	dp.processComments(scenario.Location)
	dp.processTags(depth, scenario.Tags)
	dp.processKeywordNode(depth, scenario)
	for _, step := range scenario.GetSteps() {
		dp.processStep(depth+1, step)
	}

	for _, examples := range scenario.GetExamples() {
		fmt.Fprintf(dp.Writer, "\n")
		dp.processExamples(examples, depth+1)
	}
}

func (dp DocumentPrinter) processExamples(examples *messages.Examples, depth int) {
	dp.processComments(examples.Location)
	dp.processTags(depth, examples.Tags)
	dp.processKeywordNode(depth, examples)

	rows := []*messages.TableRow{examples.TableHeader}
	rows = append(rows, examples.GetTableBody()...)

	dp.processTable(rows, depth+1)
}

func (dp DocumentPrinter) processTags(depth int, tags []*messages.Tag) {
	if len(tags) > 0 {
		fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
		for n, tag := range tags {
			if n > 0 {
				fmt.Fprint(dp.Writer, " ")
			}
			fmt.Fprint(dp.Writer, tag.GetName())
		}
		fmt.Fprintf(dp.Writer, "\n")
	}
}

func (dp DocumentPrinter) processStep(depth int, step *messages.Step) {
	fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s%s\n", step.GetKeyword(), step.GetText())

	table := step.GetDataTable()
	if table != nil {
		dp.processDataTable(depth+1, table)
	}

	docString := step.GetDocString()
	if docString != nil {
		dp.processDocString(depth+1, docString)
	}
}

func (dp DocumentPrinter) processDocString(depth int, docString *messages.DocString) {
	fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s%s\n", docString.Delimiter, docString.ContentType)

	re := regexp.MustCompile("(?m)^")
	indentedContent := re.ReplaceAllString(docString.Content, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s\n", indentedContent)

	fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s%s\n", docString.Delimiter, docString.ContentType)
}

func (dp DocumentPrinter) processDataTable(depth int, table *messages.DataTable) {
	dp.processTable(table.GetRows(), depth)
}

func (dp DocumentPrinter) processTable(rows []*messages.TableRow, depth int) {
	rowCount := len(rows)
	columnCount := len(rows[0].GetCells())
	columnWidths := make([]int, columnCount, columnCount)
	columnNumericCount := make([]int, columnCount, columnCount)
	for _, row := range rows {
		for columnIndex, cell := range row.GetCells() {
			columnWidths[columnIndex] = max(columnWidths[columnIndex], len(cell.GetValue()))
			_, err := strconv.ParseFloat(cell.GetValue(), 32)
			if err == nil {
				columnNumericCount[columnIndex] += 1
			}
		}
	}
	for _, row := range rows {
		fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
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
			fmt.Fprintf(dp.Writer, format, cell.GetValue())
		}
		fmt.Fprintf(dp.Writer, "|\n")
	}
}

func (dp DocumentPrinter) processKeywordNode(depth int, keywordNode KeywordNode) {
	fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s: %s\n", keywordNode.GetKeyword(), keywordNode.GetName())
}

type KeywordNode interface {
	GetKeyword() string
	GetName() string
}

func (dp DocumentPrinter) processComments(location *messages.Location) {
	for len(dp.Doc.Comments) > 0 {
		comment := dp.Doc.Comments[0]
		if location.Line < comment.Location.Line {
			break
		}
		fmt.Fprintf(dp.Writer, "%s\n", comment.Text)
		dp.Doc.Comments = dp.Doc.Comments[1:]
	}
}

func max(x, y int) int {
	if x < y {
		return y
	}
	return x
}

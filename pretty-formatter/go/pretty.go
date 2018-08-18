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
			gherkinDocument := t.GherkinDocument
			dp := DocumentPrinter{
				Doc: t.GherkinDocument,
				Writer: stdout,
				Comments: t.GherkinDocument.Comments,
			}
			
			dp.processGherkinDocument(gherkinDocument, stdout)
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

func (dp DocumentPrinter) processGherkinDocument(gherkinDocument *messages.GherkinDocument, stdout io.Writer) {
	feature := gherkinDocument.Feature
	comments := gherkinDocument.Comments
	if feature != nil {
		comments = dp.processFeature(gherkinDocument.Uri, comments, feature, stdout)
	}
}

func (dp DocumentPrinter) processFeature(uri string, comments []*messages.Comment, feature *messages.Feature, stdout io.Writer) []*messages.Comment {
	comments = dp.processComments(comments, feature.Location, stdout)
	dp.processKeywordNode(stdout, 0, feature)
	for _, child := range feature.Children {
		fmt.Fprintf(stdout, "\n")
		switch t := child.Value.(type) {
		case *messages.FeatureChild_Background:
			comments = dp.processBackground(comments, t.Background, 1, stdout)
		case *messages.FeatureChild_Rule:
			comments = dp.processRule(uri, comments, t.Rule, 1, stdout)
		case *messages.FeatureChild_Scenario:
			comments = dp.processScenario(uri, comments, t.Scenario, 1, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func (dp DocumentPrinter) processRule(uri string, comments []*messages.Comment, rule *messages.Rule, depth int, stdout io.Writer) []*messages.Comment {
	comments = dp.processComments(comments, rule.Location, stdout)
	dp.processKeywordNode(stdout, depth, rule)

	for _, child := range rule.Children {
		fmt.Fprintf(stdout, "\n")
		switch t := child.Value.(type) {
		case *messages.RuleChild_Background:
			comments = dp.processBackground(comments, t.Background, 2, stdout)
		case *messages.RuleChild_Scenario:
			comments = dp.processScenario(uri, comments, t.Scenario, 2, stdout)
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return comments
}

func (dp DocumentPrinter) processBackground(comments []*messages.Comment, background *messages.Background, depth int, stdout io.Writer) []*messages.Comment {
	comments = dp.processComments(comments, background.Location, stdout)
	dp.processKeywordNode(stdout, depth, background)
	for _, step := range background.GetSteps() {
		dp.processStep(stdout, depth+1, step)
	}
	return comments
}

func (dp DocumentPrinter) processScenario(uri string, comments []*messages.Comment, scenario *messages.Scenario, depth int, stdout io.Writer) []*messages.Comment {
	//sourceLine := &messages.SourceLine{
	//	Uri: uri,
	//	Line: scenario.Location.Line,
	//}

	comments = dp.processComments(comments, scenario.Location, stdout)
	dp.processTags(stdout, depth, scenario.Tags)
	dp.processKeywordNode(stdout, depth, scenario)
	for _, step := range scenario.GetSteps() {
		dp.processStep(stdout, depth+1, step)
	}

	for _, examples := range scenario.GetExamples() {
		fmt.Fprintf(stdout, "\n")
		comments = dp.processExamples(comments, examples, stdout, depth+1)
	}

	return comments
}

func (dp DocumentPrinter) processExamples(comments []*messages.Comment, examples *messages.Examples, stdout io.Writer, depth int) []*messages.Comment {
	comments = dp.processComments(comments, examples.Location, stdout)
	dp.processTags(stdout, depth, examples.Tags)
	dp.processKeywordNode(stdout, depth, examples)

	rows := []*messages.TableRow{examples.TableHeader}
	rows = append(rows, examples.GetTableBody()...)

	dp.processTable(rows, stdout, depth+1)

	return comments
}

func (dp DocumentPrinter) processTags(stdout io.Writer, depth int, tags []*messages.Tag) {
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

func (dp DocumentPrinter) processStep(stdout io.Writer, depth int, step *messages.Step) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", step.GetKeyword(), step.GetText())

	table := step.GetDataTable()
	if table != nil {
		dp.processDataTable(stdout, depth+1, table)
	}

	docString := step.GetDocString()
	if docString != nil {
		dp.processDocString(stdout, depth+1, docString)
	}
}

func (dp DocumentPrinter) processDocString(stdout io.Writer, depth int, docString *messages.DocString) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", docString.Delimiter, docString.ContentType)

	re := regexp.MustCompile("(?m)^")
	indentedContent := re.ReplaceAllString(docString.Content, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s\n", indentedContent)

	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s%s\n", docString.Delimiter, docString.ContentType)
}

func (dp DocumentPrinter) processDataTable(stdout io.Writer, depth int, table *messages.DataTable) {
	dp.processTable(table.GetRows(), stdout, depth)
}

func (dp DocumentPrinter) processTable(rows []*messages.TableRow, stdout io.Writer, depth int) {
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

func (dp DocumentPrinter) processKeywordNode(stdout io.Writer, depth int, keywordNode KeywordNode) {
	fmt.Fprintf(stdout, strings.Repeat(" ", depth*2))
	fmt.Fprintf(stdout, "%s: %s\n", keywordNode.GetKeyword(), keywordNode.GetName())
}

type KeywordNode interface {
	GetKeyword() string
	GetName() string
}

func (dp DocumentPrinter) processComments(comments []*messages.Comment, location *messages.Location, stdout io.Writer) []*messages.Comment {
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

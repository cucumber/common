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
	"io/ioutil"
	"regexp"
	"strconv"
	"strings"
	"unicode/utf8"
)

func ProcessMessages(stdin io.Reader, writer io.Writer, resultsMode bool) {
	scenarioPrinters := make(map[string]*ScenarioPrinter)
	stepPrinters := make(map[string]*StepPrinter)
	picklePrinters := make(map[string]*PicklePrinter)

	r := gio.NewDelimitedReader(stdin, 4096)
	for {
		wrapper := &messages.Wrapper{}
		err := r.ReadMsg(wrapper)
		if err == io.EOF {
			break
		}

		switch t := wrapper.Message.(type) {
		case *messages.Wrapper_GherkinDocument:
			w := writer
			if resultsMode {
				w = ioutil.Discard
			}

			dp := &DocumentPrinter{
				ScenarioPrinters: scenarioPrinters,
				StepPrinters:     stepPrinters,
				Doc:              t.GherkinDocument,
				Writer:           w,
				Comments:         t.GherkinDocument.Comments,
				ResultsMode:      resultsMode,
			}

			dp.processGherkinDocument()
		case *messages.Wrapper_Pickle:
			pickleId := makePickleId(t.Pickle.Uri, t.Pickle.Locations)
			picklePrinters[pickleId] = &PicklePrinter{
				Pickle:           t.Pickle,
				Writer:           writer,
				StepPrinters:     stepPrinters,
				ScenarioPrinters: scenarioPrinters,
			}
		case *messages.Wrapper_TestCaseStarted:
			pp := picklePrinters[t.TestCaseStarted.PickleId]
			pp.printTestCaseStarted()
		case *messages.Wrapper_TestStepFinished:
			pp := picklePrinters[t.TestStepFinished.PickleId]
			pp.printTestStepFinished(t.TestStepFinished.Index, &t.TestStepFinished.TestResult.Status)
		}

	}
}

func makePickleId(uri string, locations []*messages.Location) string {
	lines := collect(locations, func(loc *messages.Location) string { return fmt.Sprint(loc.Line) })
	return fmt.Sprintf("%s:%s", uri, strings.Join(lines, ":"))
}

// TODO: Move to Gherkin
func collect(locations []*messages.Location, f func(loc *messages.Location) string) []string {
	result := make([]string, len(locations))
	for i, item := range locations {
		result[i] = f(item)
	}
	return result
}

type DocumentPrinter struct {
	ScenarioPrinters map[string]*ScenarioPrinter
	StepPrinters     map[string]*StepPrinter
	Doc              *messages.GherkinDocument
	Writer           io.Writer
	Comments         []*messages.Comment
	ResultsMode      bool
}

type PicklePrinter struct {
	Pickle           *messages.Pickle
	ScenarioPrinters map[string]*ScenarioPrinter
	StepPrinters     map[string]*StepPrinter
	Writer           io.Writer
}

func (pp *PicklePrinter) printTestCaseStarted() {
	scenarioKey := uriLineKey(pp.Pickle.Uri, pp.Pickle.Locations[0])
	scenarioPrinter := pp.ScenarioPrinters[scenarioKey]

	fmt.Fprintf(pp.Writer, "%s: %s\n", scenarioPrinter.Scenario.GetKeyword(), pp.Pickle.Name)
}

func (pp *PicklePrinter) printTestStepFinished(stepIndex uint32, status *messages.Status) {
	pickleStep := pp.Pickle.Steps[stepIndex]
	stepKey := uriLineKey(pp.Pickle.Uri, pickleStep.Locations[0])

	stepPrinter := pp.StepPrinters[stepKey]
	stepPrinter.processStepWithStatus(pp.Writer, 2, status)
}

type ScenarioPrinter struct {
	Scenario    *messages.Scenario
	Uri         string
	Writer      io.Writer
	ResultsMode bool
}

type StepPrinter struct {
	Step        *messages.Step
	Uri         string
	Writer      io.Writer
	ResultsMode bool
}

type TablePrinter struct {
	Rows   []*messages.TableRow
	Writer io.Writer
}

func (dp *DocumentPrinter) processGherkinDocument() {
	if dp.Doc.Feature != nil {
		dp.processFeature()
	}
}

func (dp *DocumentPrinter) processFeature() {
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

func (dp *DocumentPrinter) processRule(rule *messages.Rule, depth int) {
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

func (dp *DocumentPrinter) processBackground(background *messages.Background, depth int) {
	dp.processComments(background.Location)
	dp.processKeywordNode(depth, background)
	for _, step := range background.GetSteps() {
		dp.processStep(step, depth+1)
	}
}

func (dp *DocumentPrinter) processScenario(scenario *messages.Scenario, depth int) {
	sp := &ScenarioPrinter{
		Scenario:    scenario,
		Uri:         dp.Doc.Uri,
		Writer:      dp.Writer,
		ResultsMode: dp.ResultsMode,
	}
	key := uriLineKey(sp.Uri, scenario.Location)
	dp.ScenarioPrinters[key] = sp

	// TODO: Move to ScenarioPrinter
	dp.processComments(scenario.Location)
	dp.processTags(depth, scenario.Tags)
	dp.processKeywordNode(depth, scenario)
	for _, step := range scenario.GetSteps() {
		dp.processStep(step, depth+1)
	}

	for _, examples := range scenario.GetExamples() {
		fmt.Fprintf(dp.Writer, "\n")
		dp.processExamples(examples, depth+1)
	}
}

func (dp *DocumentPrinter) processStep(step *messages.Step, depth int) {
	sp := &StepPrinter{
		Step:        step,
		Uri:         dp.Doc.Uri,
		Writer:      dp.Writer,
		ResultsMode: dp.ResultsMode,
	}
	dp.StepPrinters[uriLineKey(sp.Uri, step.Location)] = sp

	sp.processStep(depth)
}

func uriLineKey(uri string, location *messages.Location) string {
	return fmt.Sprintf("%s:%d", uri, location.Line)
}

func (dp *DocumentPrinter) processExamples(examples *messages.Examples, depth int) {
	dp.processComments(examples.Location)
	dp.processTags(depth, examples.Tags)
	dp.processKeywordNode(depth, examples)

	rows := []*messages.TableRow{examples.TableHeader}
	rows = append(rows, examples.GetTableBody()...)

	tp := &TablePrinter{
		Rows:   rows,
		Writer: dp.Writer,
	}
	tp.processTable(depth + 1)
}

func (dp *DocumentPrinter) processTags(depth int, tags []*messages.Tag) {
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

func (sp *StepPrinter) processStep(depth int) {
	if sp.ResultsMode {
		return
	}

	fmt.Fprintf(sp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(sp.Writer, "%s%s\n", sp.Step.GetKeyword(), sp.Step.GetText())

	table := sp.Step.GetDataTable()
	if table != nil {
		sp.processDataTable(depth+1, table)
	}

	docString := sp.Step.GetDocString()
	if docString != nil {
		sp.processDocString(depth+1, docString)
	}
}

func (sp *StepPrinter) processStepWithStatus(writer io.Writer, depth int, status *messages.Status) {
	prefix := resultPrefix(*status)
	indentCount := (depth * 2) - utf8.RuneCountInString(prefix)
	indent := strings.Repeat(" ", indentCount)

	fmt.Fprintf(writer, indent)
	fmt.Fprintf(writer, "%s%s%s\n", prefix, sp.Step.GetKeyword(), sp.Step.GetText())
}

func resultPrefix(status messages.Status) string {
	switch status {
	case messages.Status_PASSED:
		return "✓ "
	case messages.Status_FAILED:
		return "✗ "
	default:
		return "  "
	}
}

func (sp *StepPrinter) processDocString(depth int, docString *messages.DocString) {
	fmt.Fprintf(sp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(sp.Writer, "%s%s\n", docString.Delimiter, docString.ContentType)

	re := regexp.MustCompile("(?m)^")
	indentedContent := re.ReplaceAllString(docString.Content, strings.Repeat(" ", depth*2))
	fmt.Fprintf(sp.Writer, "%s\n", indentedContent)

	fmt.Fprintf(sp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(sp.Writer, "%s%s\n", docString.Delimiter, docString.ContentType)
}

func (sp *StepPrinter) processDataTable(depth int, table *messages.DataTable) {
	tp := &TablePrinter{
		Rows:   table.GetRows(),
		Writer: sp.Writer,
	}
	tp.processTable(depth)
}

func (tp *TablePrinter) processTable(depth int) {
	rowCount := len(tp.Rows)
	columnCount := len(tp.Rows[0].GetCells())
	columnWidths := make([]int, columnCount, columnCount)
	columnNumericCount := make([]int, columnCount, columnCount)
	for _, row := range tp.Rows {
		for columnIndex, cell := range row.GetCells() {
			columnWidths[columnIndex] = max(columnWidths[columnIndex], len(cell.GetValue()))
			_, err := strconv.ParseFloat(cell.GetValue(), 32)
			if err == nil {
				columnNumericCount[columnIndex] += 1
			}
		}
	}
	for _, row := range tp.Rows {
		fmt.Fprintf(tp.Writer, strings.Repeat(" ", depth*2))
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
			fmt.Fprintf(tp.Writer, format, cell.GetValue())
		}
		fmt.Fprintf(tp.Writer, "|\n")
	}
}

func (dp *DocumentPrinter) processKeywordNode(depth int, keywordNode KeywordNode) {
	fmt.Fprintf(dp.Writer, strings.Repeat(" ", depth*2))
	fmt.Fprintf(dp.Writer, "%s: %s\n", keywordNode.GetKeyword(), keywordNode.GetName())
}

type KeywordNode interface {
	GetKeyword() string
	GetName() string
}

func (dp *DocumentPrinter) processComments(location *messages.Location) {
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

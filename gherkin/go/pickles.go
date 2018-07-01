package gherkin

import (
	"fmt"
	"strings"
	"unicode/utf8"
	"github.com/cucumber/cucumber-messages-go"
)

func Pickles(gherkinDocument messages.GherkinDocument, uri string) []*messages.Pickle {
	pickles := make([]*messages.Pickle, 0)
	if gherkinDocument.Feature == nil {
		return pickles
	}
	language := gherkinDocument.Feature.Language

	pickles = compileFeature(pickles, *gherkinDocument.Feature, uri, language)
	return pickles
}

func compileFeature(pickles []*messages.Pickle, feature messages.Feature, uri string, language string) []*messages.Pickle {
	backgroundSteps := make([]*messages.PickleStep, 0)
	featureTags := feature.Tags
	for _, child := range feature.Children {
		switch t := child.Value.(type) {
		case *messages.FeatureChild_Background:
			backgroundSteps = append(backgroundSteps, pickleSteps(t.Background.Steps)...)
		case *messages.FeatureChild_Rule:
			pickles = compileRule(pickles, child.GetRule(), featureTags, backgroundSteps, uri, language)
		case *messages.FeatureChild_Scenario:
			scenario := t.Scenario
			if len(scenario.GetExamples()) == 0 {
				pickles = compileScenario(pickles, backgroundSteps, scenario, featureTags, uri, language)
			} else {
				pickles = compileScenarioOutline(pickles, scenario, featureTags, backgroundSteps,uri, language)
			}
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return pickles
}

func compileRule(pickles []*messages.Pickle, rule *messages.Rule, tags []*messages.Tag, steps []*messages.PickleStep, uri string, language string) []*messages.Pickle {
	backgroundSteps := make([]*messages.PickleStep, 0)
	backgroundSteps = append(backgroundSteps, steps...)

	for _, child := range rule.Children {
		switch t := child.Value.(type) {
		case *messages.RuleChild_Background:
			backgroundSteps = append(backgroundSteps, pickleSteps(t.Background.Steps)...)
		case *messages.RuleChild_Scenario:
			scenario := t.Scenario
			if len(scenario.GetExamples()) == 0 {
				pickles = compileScenario(pickles, backgroundSteps, scenario, tags, uri, language)
			} else {
				pickles = compileScenarioOutline(pickles, scenario, tags, backgroundSteps, uri, language)
			}
		default:
			panic(fmt.Sprintf("unexpected %T feature child", child))
		}
	}
	return pickles

}

func compileScenarioOutline(pickles []*messages.Pickle, scenario *messages.Scenario, featureTags []*messages.Tag, backgroundSteps []*messages.PickleStep, uri string, language string) []*messages.Pickle {
	for _, examples := range scenario.Examples {
		if examples.TableHeader == nil {
			continue
		}
		variableCells := examples.TableHeader.Cells
		for _, values := range examples.TableBody {
			valueCells := values.Cells
			tags := pickleTags(append(featureTags, append(scenario.Tags, examples.Tags...)...))

			pickleSteps := make([]*messages.PickleStep, 0)

			// translate pickleSteps based on values
			for _, step := range scenario.Steps {
				text := step.Text
				for i, variableCell := range variableCells {
					text = strings.Replace(text, "<"+variableCell.Value+">", valueCells[i].Value, -1)
				}

				pickleStep := pickleStep(step, variableCells, valueCells)
				pickleStep.Locations = append(pickleStep.Locations, values.Location)
				pickleSteps = append(pickleSteps, pickleStep)
			}

			// translate pickle name
			name := scenario.Name
			for i, key := range variableCells {
				name = strings.Replace(name, "<"+key.Value+">", valueCells[i].Value, -1)
			}

			if len(pickleSteps) > 0 {
				pickleSteps = append(backgroundSteps, pickleSteps...)
			}

			locations := make([]*messages.Location, 0)
			locations = append(locations, scenario.Location)
			locations = append(locations, values.Location)

			pickles = append(pickles, &messages.Pickle{
				Uri:       uri,
				Steps:     pickleSteps,
				Tags:      tags,
				Name:      name,
				Language:  language,
				Locations: locations,
			})
		}
	}
	return pickles
}

func compileScenario(pickles []*messages.Pickle, backgroundSteps []*messages.PickleStep, scenario *messages.Scenario, featureTags []*messages.Tag, uri string, language string) []*messages.Pickle {
	steps := make([]*messages.PickleStep, 0)
	if len(scenario.Steps) > 0 {
		steps = append(backgroundSteps, pickleSteps(scenario.Steps)...)
	}
	tags := pickleTags(append(featureTags, scenario.Tags...))
	locations := make([]*messages.Location, 0)
	locations = append(locations, scenario.Location)
	pickles = append(pickles, &messages.Pickle{
		Uri:       uri,
		Steps:     steps,
		Tags:      tags,
		Name:      scenario.Name,
		Language:  language,
		Locations: locations,
	})
	return pickles
}

func pickleDataTable(table *messages.DataTable, variableCells, valueCells []*messages.TableCell) *messages.PickleTable {
	pickleTableRows := make([]*messages.PickleTableRow, len(table.Rows))
	for i, row := range table.Rows {
		pickleTableCells := make([]*messages.PickleTableCell, len(row.Cells))
		for j, cell := range row.Cells {
			pickleTableCells[j] = &messages.PickleTableCell{
				Location: cell.Location,
				Value:    interpolate(cell.Value, variableCells, valueCells),
			}
		}
		pickleTableRows[i] = &messages.PickleTableRow{Cells: pickleTableCells}
	}
	return &messages.PickleTable{Rows: pickleTableRows}
}

func pickleDocString(docString *messages.DocString, variableCells, valueCells []*messages.TableCell) *messages.PickleDocString {
	return &messages.PickleDocString{
		Location:    docString.Location,
		ContentType: interpolate(docString.ContentType, variableCells, valueCells),
		Content:     interpolate(docString.Content, variableCells, valueCells),
	}
}

func pickleTags(tags []*messages.Tag) []*messages.PickleTag {
	ptags := make([]*messages.PickleTag, len(tags))
	for i, tag := range tags {
		ptags[i] = &messages.PickleTag{
			Location: tag.Location,
			Name:     tag.Name,
		}
	}
	return ptags
}

func pickleSteps(steps []*messages.Step) []*messages.PickleStep {
	pickleSteps := make([]*messages.PickleStep, len(steps))
	for i, step := range steps {
		pickleStep := pickleStep(step, nil, nil)
		pickleSteps[i] = pickleStep
	}
	return pickleSteps
}

func pickleStep(step *messages.Step, variableCells, valueCells []*messages.TableCell) *messages.PickleStep {
	loc := &messages.Location{
		Line:   uint32(step.Location.Line),
		Column: step.Location.Column + uint32(utf8.RuneCountInString(step.Keyword)),
	}
	locations := make([]*messages.Location, 0)
	locations = append(locations, loc)
	pickleStep := &messages.PickleStep{
		Text:      interpolate(step.Text, variableCells, valueCells),
		Locations: locations,
	}
	if step.GetDataTable() != nil {
		pickleStep.Argument = &messages.PickleStep_DataTable{
			DataTable: pickleDataTable(step.GetDataTable(), variableCells, valueCells),
		}
	}
	if step.GetDocString() != nil {
		pickleStep.Argument = &messages.PickleStep_DocString{
			DocString: pickleDocString(step.GetDocString(), variableCells, valueCells),
		}
	}
	return pickleStep
}

func interpolate(s string, variableCells, valueCells []*messages.TableCell) string {
	if variableCells == nil || valueCells == nil {
		return s
	}

	for i, variableCell := range variableCells {
		s = strings.Replace(s, "<"+variableCell.Value+">", valueCells[i].Value, -1)
	}

	return s
}

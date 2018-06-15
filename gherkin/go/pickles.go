package gherkin

import (
	"fmt"
	"strings"
	"unicode/utf8"
)

type (
	Argument interface{}

	PickleTag struct {
		Location Location `json:"location"`
		Name     string   `json:"name"`
	}

	PickleString struct {
		Location    Location `json:"location"`
		ContentType string   `json:"contentType,omitempty"`
		Content     string   `json:"content"`
	}

	PickleCell struct {
		Location Location `json:"location"`
		Value    string   `json:"value"`
	}

	PickleRow struct {
		Cells []*PickleCell `json:"cells"`
	}

	PickleTable struct {
		Rows []*PickleRow `json:"rows"`
	}

	PickleStep struct {
		Text      string     `json:"text"`
		Arguments []Argument `json:"arguments"`
		Locations []Location `json:"locations"`
	}

	Pickle struct {
		Name      string        `json:"name"`
		Language  string        `json:"language"`
		Steps     []*PickleStep `json:"steps"`
		Tags      []*PickleTag  `json:"tags"`
		Locations []Location    `json:"locations"`
	}
)

func (gd *GherkinDocument) Pickles() []*Pickle {
	pickles := make([]*Pickle, 0)
	if gd.Feature == nil {
		return pickles
	}

	bgSteps := make([]*PickleStep, 0)
	for _, ch := range gd.Feature.Children {
		switch t := ch.(type) {
		case *Background:
			bgSteps = append(bgSteps, pickleSteps(t.Steps)...)
		case *Scenario:
			if len(t.Examples) == 0 {
				steps := make([]*PickleStep, 0)
				if len(t.Steps) > 0 {
					steps = append(bgSteps, pickleSteps(t.Steps)...)
				}
				tags := pickleTags(append(gd.Feature.Tags, t.Tags...))
				pickles = append(pickles, &Pickle{
					Steps:     steps,
					Tags:      tags,
					Name:      t.Name,
					Language:  gd.Feature.Language,
					Locations: []Location{*t.Location},
				})
			} else {
				// Scenario Outline
				for _, examples := range t.Examples {
					if examples.TableHeader == nil {
						continue
					}
					keys := examples.TableHeader.Cells
					for _, example := range examples.TableBody {
						vals := example.Cells
						tags := pickleTags(append(gd.Feature.Tags, append(t.Tags, examples.Tags...)...))

						steps := make([]*PickleStep, 0)

						// translate steps based on example
						for _, step := range t.Steps {
							text := step.Text
							for i, key := range keys {
								text = strings.Replace(text, "<"+key.Value+">", vals[i].Value, -1)
							}

							loc := Location{
								Line:   step.Location.Line,
								Column: step.Location.Column + utf8.RuneCountInString(step.Keyword),
							}

							steps = append(steps, &PickleStep{
								Text:      text,
								Arguments: pickleArgument(step.Argument, keys, vals),
								Locations: []Location{*example.Location, loc},
							})
						}

						// translate pickle name
						name := t.Name
						for i, key := range keys {
							name = strings.Replace(name, "<"+key.Value+">", vals[i].Value, -1)
						}

						if len(steps) > 0 {
							steps = append(bgSteps, steps...)
						}
						pickles = append(pickles, &Pickle{
							Steps:     steps,
							Tags:      tags,
							Name:      name,
							Language:  gd.Feature.Language,
							Locations: []Location{*example.Location, *t.Location},
						})
					}
				}
			}
		default:
			panic(fmt.Sprintf("unexpected %T feature child", ch))
		}
	}
	return pickles
}

func pickleTags(tags []*Tag) []*PickleTag {
	ptags := make([]*PickleTag, len(tags))
	for i, tag := range tags {
		ptags[i] = &PickleTag{
			Location: *tag.Location,
			Name:     tag.Name,
		}
	}
	return ptags
}

func pickleSteps(steps []*Step) []*PickleStep {
	psteps := make([]*PickleStep, len(steps))
	for i, step := range steps {
		loc := Location{
			Line:   step.Location.Line,
			Column: step.Location.Column + utf8.RuneCountInString(step.Keyword),
		}
		psteps[i] = &PickleStep{
			Text:      step.Text,
			Arguments: pickleArgument(step.Argument, nil, nil),
			Locations: []Location{loc},
		}
	}
	return psteps
}

func pickleArgument(arg interface{}, keys, vals []*TableCell) []Argument {
	trans := func(s string) string {
		if keys == nil || vals == nil {
			return s
		}

		for i, key := range keys {
			s = strings.Replace(s, "<"+key.Value+">", vals[i].Value, -1)
		}

		return s
	}

	args := make([]Argument, 0)
	switch t := arg.(type) {
	case *DocString:
		args = append(args, &PickleString{
			Location:    *t.Location,
			ContentType: trans(t.ContentType),
			Content:     trans(t.Content),
		})
	case *DataTable:
		rows := make([]*PickleRow, len(t.Rows))
		for i, row := range t.Rows {
			cells := make([]*PickleCell, len(row.Cells))
			for i, cell := range row.Cells {
				cells[i] = &PickleCell{
					Location: *cell.Location,
					Value:    trans(cell.Value),
				}
			}
			rows[i] = &PickleRow{Cells: cells}
		}
		args = append(args, &PickleTable{Rows: rows})
	case nil:
		break
	default:
		panic(fmt.Sprintf("unexpected %T step argument", arg))
	}

	return args
}

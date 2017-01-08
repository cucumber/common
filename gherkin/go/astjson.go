package gherkin

import (
	"encoding/json"
)

// To be consistent with the Gherkin parsers implemented in other languages
// the TableBody attribute of an Examples struct should only be omitted if
// it is null, not if it an empty list of TableRow:s.
func (ex *Examples) MarshalJSON() ([]byte, error) {
	type ExamplesAlias Examples
	if ex.TableBody != nil {
		return json.Marshal(&struct {
			*ExamplesAlias
		}{
			ExamplesAlias:     (*ExamplesAlias)(ex),
		})
	} else {
		return json.Marshal(&struct {
			TableBody   []*TableRow `json:"tableBody,omitempty"`
			*ExamplesAlias
		}{
			ExamplesAlias:     (*ExamplesAlias)(ex),
		})
	}
}

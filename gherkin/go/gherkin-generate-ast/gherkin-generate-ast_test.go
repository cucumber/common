package main

import (
	"os"
	"strings"
)

func ExampleGenerateAst() {

	input := `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`
	reader := strings.NewReader(input)
	writer := os.Stdout
	pretty := true
	GenerateAst(reader, writer, pretty)

	// Output:
	//
	// {
	//   "type": "GherkinDocument",
	//   "feature": {
	//     "location": {
	//       "line": 1,
	//       "column": 1
	//     },
	//     "type": "Feature",
	//     "tags": [],
	//     "language": "en",
	//     "keyword": "Feature",
	//     "name": "Minimal",
	//     "children": [
	//       {
	//         "location": {
	//           "line": 3,
	//           "column": 3
	//         },
	//         "type": "Scenario",
	//         "keyword": "Scenario",
	//         "name": "minimalistic",
	//         "steps": [
	//           {
	//             "location": {
	//               "line": 4,
	//               "column": 5
	//             },
	//             "type": "Step",
	//             "keyword": "Given ",
	//             "text": "the minimalism"
	//           }
	//         ],
	//         "tags": []
	//       }
	//     ]
	//   },
	//   "comments": []
	// }
	//
}

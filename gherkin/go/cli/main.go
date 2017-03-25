/*
This is a gherkin console application
used to produce gherkin event stream of
ndjson based entries. See the spec:
https://docs.cucumber.io/event-protocol/
*/
package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"os"

	gherkin ".."
)

var noSource = flag.Bool("no-source", false, "Skip gherkin source events")
var noAst = flag.Bool("no-ast", false, "Skip gherkin AST events")
var noPickles = flag.Bool("no-pickles", false, "Skip gherkin Pickle events")

func main() {
	flag.Parse()

	paths := flag.Args()
	events, err := gherkin.GherkinEvents(paths...)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to produce events: %+v\n", err)
		os.Exit(1)
	}

	for _, ev := range events {
		if _, ok := ev.(*gherkin.SourceEvent); ok && *noSource {
			continue
		}

		if _, ok := ev.(*gherkin.GherkinDocumentEvent); ok && *noAst {
			continue
		}

		if _, ok := ev.(*gherkin.PickleEvent); ok && *noPickles {
			continue
		}

		data, err := json.Marshal(ev)
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to marshal event: %+v\n", err)
			os.Exit(1)
		}

		fmt.Fprintln(os.Stdout, string(data))
	}
}

// @TODO may be usefult to customize CLI usage

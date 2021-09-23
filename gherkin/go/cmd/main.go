/*
This is a console application that prints Cucumber messages to
STDOUT.
*/
package main

import (
	b64 "encoding/base64"
	"encoding/json"
	"flag"
	"fmt"
	"github.com/cucumber/common/gherkin/go/v22"
	"github.com/cucumber/common/messages/go/v17"
	"os"
)

var noSource = flag.Bool("no-source", false, "Skip gherkin source events")
var noAst = flag.Bool("no-ast", false, "Skip gherkin AST events")
var noPickles = flag.Bool("no-pickles", false, "Skip gherkin Pickle events")
var predictableIds = flag.Bool("predictable-ids", false, "Generate incrementing ids rather than UUIDs")
var versionFlag = flag.Bool("version", false, "print version")
var dialectsFlag = flag.Bool("dialects", false, "print dialects as JSON")
var defaultDialectFlag = flag.String("default-dialect", "en", "the default dialect")

// Set during build with -ldflags
var version = "(unknown version)"
var gherkinDialects string

func main() {
	flag.Parse()
	if *versionFlag {
		fmt.Printf("gherkin %s\n", version)
		os.Exit(0)
	}

	if *dialectsFlag {
		sDec, _ := b64.StdEncoding.DecodeString(gherkinDialects)
		fmt.Println(string(sDec))
		os.Exit(0)
	}

	var newId func() string
	if *predictableIds {
		newId = (&messages.Incrementing{}).NewId
	} else {
		newId = messages.UUID{}.NewId
	}

	paths := flag.Args()

	encoder := json.NewEncoder(os.Stdout)
	decoder := json.NewDecoder(os.Stdin)

	_, err := gherkin.Messages(
		paths,
		decoder,
		*defaultDialectFlag,
		!*noSource,
		!*noAst,
		!*noPickles,
		encoder,
		newId,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse Gherkin: %+v\n", err)
		os.Exit(1)
	}
}

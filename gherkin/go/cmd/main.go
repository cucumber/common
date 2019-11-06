/*
This is a console application that prints Cucumber messages to
STDOUT. By default it prints them as protobuf, but the --json flag
will print them as JSON (useful for testing/debugging)
*/
package main

import (
	"bufio"
	b64 "encoding/base64"
	"flag"
	"fmt"
	"github.com/cucumber/gherkin-go/v8"
	"os"
)

var noSource = flag.Bool("no-source", false, "Skip gherkin source events")
var noAst = flag.Bool("no-ast", false, "Skip gherkin AST events")
var noPickles = flag.Bool("no-pickles", false, "Skip gherkin Pickle events")
var printJson = flag.Bool("json", false, "Print messages as JSON instead of protobuf")
var predictableIds = flag.Bool("predictable-ids", false, "Generate incrementing ids rather than UUIDs")
var versionFlag = flag.Bool("version", false, "print version")
var dialectsFlag = flag.Bool("dialects", false, "print dialects as JSON")
var defaultDialectFlag = flag.String("default-dialect", "en", "the default dialect")

// Set during build with -ldflags
var version string = "(unknown version)"
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
		newId = gherkin.Incrementing{}.NewId
	} else {
		newId = gherkin.UUID{}.NewId
	}

	paths := flag.Args()

	stdout := bufio.NewWriter(os.Stdout)
	defer stdout.Flush()

	_, err := gherkin.Messages(
		paths,
		os.Stdin,
		*defaultDialectFlag,
		!*noSource,
		!*noAst,
		!*noPickles,
		stdout,
		*printJson,
		newId,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse Gherkin: %+v\n", err)
		os.Exit(1)
	}
}

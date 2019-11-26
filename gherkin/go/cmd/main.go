/*
This is a console application that prints Cucumber messages to
STDOUT. By default it prints them as protobuf, but the --json flag
will print them as JSON (useful for testing/debugging)
*/
package main

import (
	b64 "encoding/base64"
	"flag"
	"fmt"
	fio "github.com/cucumber/cucumber-messages-go/v7/io"
	"github.com/cucumber/gherkin-go/v8"
	gio "github.com/gogo/protobuf/io"
	"os"
)

var noSource = flag.Bool("no-source", false, "Skip gherkin source events")
var noAst = flag.Bool("no-ast", false, "Skip gherkin AST events")
var noPickles = flag.Bool("no-pickles", false, "Skip gherkin Pickle events")
var formatFlag = flag.String("format", "protobuf", "Output format")
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
		newId = (&gherkin.Incrementing{}).NewId
	} else {
		newId = gherkin.UUID{}.NewId
	}

	paths := flag.Args()

	var writer = newWriter()

	defer writer.Close()

	_, err := gherkin.Messages(
		paths,
		os.Stdin,
		*defaultDialectFlag,
		!*noSource,
		!*noAst,
		!*noPickles,
		writer,
		newId,
	)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse Gherkin: %+v\n", err)
		os.Exit(1)
	}
}

func newWriter() gio.WriteCloser {
	var reader gio.WriteCloser
	switch *formatFlag {
	case "protobuf":
		reader = gio.NewDelimitedWriter(os.Stdout)
	case "ndjson":
		reader = fio.NewNdjsonWriter(os.Stdout)
	default:
		_, err := fmt.Fprintf(os.Stderr, "Unsupported format: %s\n", *formatFlag)
		if err != nil {
			panic(err)
		}
	}
	return reader
}

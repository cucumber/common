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
	"github.com/cucumber/gherkin-go"
	"github.com/golang/protobuf/jsonpb"
	"github.com/golang/protobuf/proto"
	"os"
)

var noSource = flag.Bool("no-source", false, "Skip gherkin source events")
var noAst = flag.Bool("no-ast", false, "Skip gherkin AST events")
var noPickles = flag.Bool("no-pickles", false, "Skip gherkin Pickle events")
var printJson = flag.Bool("json", false, "Print messages as JSON instead of protobuf")
var versionFlag = flag.Bool("version", false, "print version")
var dialectsFlag = flag.Bool("dialects", false, "print dialects as JSON")
var defaultDialectFlag = flag.String("default-dialect", "en", "the default dialect")

// Set during build with -ldflags
var version string
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

	paths := flag.Args()

	messageList, err := gherkin.GherkinMessages(paths, os.Stdin, *defaultDialectFlag, !*noSource, !*noAst, !*noPickles)
	if err != nil {
		fmt.Fprintf(os.Stderr, "failed to parse Gherkin: %+v\n", err)
		os.Exit(1)
	}
	for _, message := range messageList {
		if *printJson {
			ma := jsonpb.Marshaler{}
			msgJson, err := ma.MarshalToString(&message)
			if err != nil {
				fmt.Fprintf(os.Stderr, "failed to marshal Message to JSON: %+v\n", err)
				os.Exit(1)
			}
			os.Stdout.WriteString(msgJson)
			os.Stdout.WriteString("\n")
		} else {
			bytes, err := proto.Marshal(&message)
			if err != nil {
				fmt.Fprintf(os.Stderr, "failed to marshal Message: %+v\n", err)
				os.Exit(1)
			}
			os.Stdout.Write(proto.EncodeVarint(uint64(len(bytes))))
			os.Stdout.Write(bytes)
		}
	}
}

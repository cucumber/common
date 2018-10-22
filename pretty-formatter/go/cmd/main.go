package main

import (
	"bufio"
	"bytes"
	"flag"
	"fmt"
	"github.com/cucumber/gherkin-go"
	"github.com/cucumber/pretty-formatter-go"
	"os"
)

var dialectFlag = flag.String("dialect", "en", "Gherkin Dialect")

func main() {
	flag.Parse()
	paths := flag.Args()
	stdout := bufio.NewWriter(os.Stdout)
	defer stdout.Flush()

	if len(paths) == 0 {
		// Results mode. Read messages from STDIN
		pretty.ProcessMessages(os.Stdin, stdout, true)
	} else {
		// Pretty formatting mode.
		buf := &bytes.Buffer{}
		_, err := gherkin.Messages(
			paths,
			nil,
			*dialectFlag,
			true,
			true,
			true,
			buf,
			false,
		)
		if err != nil {
			fmt.Fprintf(os.Stderr, "failed to parse Gherkin: %+v\n", err)
			os.Exit(1)
		}
		pretty.ProcessMessages(buf, stdout, false)
	}
}

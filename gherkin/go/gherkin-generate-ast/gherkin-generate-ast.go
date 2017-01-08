package main

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"time"

	gherkin "../"
)

func main() {

	var readers []io.Reader
	if len(os.Args) <= 1 {
		readers = append(readers, os.Stdin)
	} else {
		for i := range os.Args[1:] {
			file, err := os.Open(os.Args[i+1])
			if err != nil {
				fmt.Fprintf(os.Stderr, "Error: %s\n", err)
				os.Exit(1)
				return
			}
			defer file.Close()
			readers = append(readers, file)
		}
	}

	startTime := time.Now().UnixNano() / 1e6
	for i := range readers {
		err := GenerateAst(readers[i], os.Stdout, false)
		if err != nil {
			fmt.Fprintf(os.Stderr, "%s\n", err)
			os.Exit(1)
			return
		}
	}
	endTime := time.Now().UnixNano() / 1e6
	if os.Getenv("GHERKIN_PERF") != "" {
		fmt.Fprintf(os.Stderr, "%d\n", endTime - startTime)
	}
}

func GenerateAst(in io.Reader, out io.Writer, pretty bool) (err error) {
	gherkinDocument, err := gherkin.ParseGherkinDocument(in)
	if err != nil {
		return
	}
	var bytes []byte
	if pretty {
		bytes, err = json.MarshalIndent(gherkinDocument, "", "  ")
	} else {
		bytes, err = json.Marshal(gherkinDocument)
	}
	if err != nil {
		return
	}
	out.Write(bytes)
	fmt.Fprint(out, "\n")
	return
}

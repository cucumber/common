package main

import (
	"flag"
	"fmt"
	formatter "github.com/cucumber/demo-formatter-go"
	fio "github.com/cucumber/messages-go/v10/io"
	gio "github.com/gogo/protobuf/io"
	"io"
	"math"
	"os"
)

var formatFlag = flag.String("format", "protobuf", "output format")

func main() {
	flag.Parse()

	formatter.ProcessMessages(newReader(os.Stdin), os.Stdout)
}

func newReader(in io.Reader) gio.ReadCloser {
	var reader gio.ReadCloser
	switch *formatFlag {
	case "protobuf":
		reader = gio.NewDelimitedReader(in, math.MaxInt32)
	case "ndjson":
		reader = fio.NewNdjsonReader(in)
	default:
		_, err := fmt.Fprintf(os.Stderr, "Unsupported format: %s\n", *formatFlag)
		if err != nil {
			panic(err)
		}
	}
	return reader
}

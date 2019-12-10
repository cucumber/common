package main

import (
	"flag"
	"fmt"
	fio "github.com/cucumber/cucumber-messages-go/v7/io"
	jsonFormatter "github.com/cucumber/json-formatter-go/v2"
	gio "github.com/gogo/protobuf/io"
	"io"
	"log"
	"math"
	"os"
)

var formatFlag = flag.String("format", "protobuf", "output format")

func main() {
	flag.Parse()

	var err error
	var file *os.File
	jf := &jsonFormatter.Formatter{}
	paths := flag.Args()
	if len(paths) > 1 {
		for _, arg := range paths {
			file, err = os.Open(arg)
			if err != nil {
				log.Fatal("ERROR: ", err)
			}
			err = jf.ProcessMessages(newReader(file), os.Stdout)
			log.Fatal("ERROR: ", err)
		}
	} else {
		err = jf.ProcessMessages(newReader(os.Stdin), os.Stdout)
		if err != nil {
			log.Fatal("ERROR: ", err)
		}
	}
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
			log.Fatal("ERROR: ", err)
		}
	}
	return reader
}

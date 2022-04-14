package main

import (
	"flag"
	jsonFormatter "github.com/cucumber/common/json-formatter/go/v19"
	"log"
	"os"
)

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
			err = jf.ProcessMessages(file, os.Stdout)
			log.Fatal("ERROR: ", err)
		}
	} else {
		err = jf.ProcessMessages(os.Stdin, os.Stdout)
		if err != nil {
			log.Fatal("ERROR: ", err)
		}
	}
}

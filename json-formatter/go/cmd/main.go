package main

import (
	jf "github.com/cucumber/json-formatter-go"
	"log"
	"os"
)

func main() {
	var err error
	if len(os.Args) > 1 {
		for _, arg := range os.Args[1:] {
			file, err := os.Open(arg)
			if err != nil {
				break
			}
			err = jf.ProcessMessages(file, os.Stdout)
		}
	} else {
		err = jf.ProcessMessages(os.Stdin, os.Stdout)
	}
	if err != nil {
		log.Fatal("ERROR: ", err)
	}
}

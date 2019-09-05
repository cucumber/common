package main

import (
	jf "github.com/cucumber/json-formatter-go"
	"log"
	"os"
)

func main() {
	err := jf.ProcessMessages(os.Stdin, os.Stdout)
	if err != nil {
		log.Fatal("ERROR: ", err)
	}
}

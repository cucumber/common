package main

import (
	json "github.com/cucumber/json-formatter-go"
	"os"
)

func main() {
	json.ProcessMessages(os.Stdin, os.Stdout)
}

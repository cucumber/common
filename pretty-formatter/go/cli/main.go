package main

import (
	"os"
	dots "github.com/cucumber/pretty-formatter-go"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

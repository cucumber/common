package main

import (
	dots "github.com/cucumber/pretty-formatter-go"
	"os"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

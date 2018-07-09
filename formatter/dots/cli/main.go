package main

import (
	"os"
	"github.com/cucumber/formatter-dots"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

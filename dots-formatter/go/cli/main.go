package main

import (
	"os"
	dots "github.com/cucumber/dots-formatter-go"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

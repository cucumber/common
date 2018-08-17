package main

import (
	dots "github.com/cucumber/dots-formatter-go"
	"os"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

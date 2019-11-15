package main

import (
	formatter "github.com/cucumber/cucumber-demo-formatter-go"
	"os"
)

func main() {
	formatter.ProcessMessages(os.Stdin, os.Stdout)
}

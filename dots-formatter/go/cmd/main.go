package main

import (
	dots "github.com/cucumber/cucumber/dots-formatter/go"
	"os"
)

func main() {
	dots.ProcessMessages(os.Stdin, os.Stdout)
}

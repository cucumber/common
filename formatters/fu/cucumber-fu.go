package main

import (
	"github.com/fatih/color"
	"fmt"
)

func main() {
	passed()
	passed()
	failed()
	skipped()
	undefined()
	passed()
	pending()
	passed()
	fmt.Printf("\n")
}

func passed() {
	color.New(color.FgGreen).Print(".")
}

func failed() {
	color.New(color.FgRed).Print("F")
}

func skipped() {
	color.New(color.FgCyan).Print("-")
}

func undefined() {
	color.New(color.FgYellow).Print("U")
}

func pending() {
	color.New(color.FgYellow).Print("P")
}
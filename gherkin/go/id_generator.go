package gherkin

import (
	"github.com/gofrs/uuid"
	"strconv"
)

type IdGenerator interface {
	newId() func() string
}

type Incrementing struct {
	next int
}

func (i *Incrementing) NewId() string {
	result := strconv.Itoa(i.next)
	i.next++
	return result
}

type UUID struct {
	next int
}

func (i UUID) NewId() string {
	return uuid.Must(uuid.NewV4()).String()
}

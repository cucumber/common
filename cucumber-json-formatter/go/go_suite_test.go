package json

import (
	"testing"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

func TestGo(t *testing.T) {
	RegisterFailHandler(Fail)
	RunSpecs(t, "Go Suite")
}

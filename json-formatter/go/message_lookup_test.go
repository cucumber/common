package json

import (
	"github.com/cucumber/common/messages/go/v17"

	. "github.com/onsi/ginkgo"
	. "github.com/onsi/gomega"
)

var _ = Describe("MessageLookup", func() {
	var ml MessageLookup

	JustBeforeEach(func() {
		ml = MessageLookup{}
		ml.Initialize(true)
	})

	Context("MessageLookup.processScenario", func() {
		var scenario messages.Scenario

		BeforeEach(func() {
			scenario = messages.Scenario{}
		})

		When("the scenario contains tagged examples", func() {
			var (
				tag     messages.Tag
				example messages.Examples
			)

			BeforeEach(func() {
				tag = messages.Tag{
					Id:   "tag-id",
					Name: "@the-tag",
				}

				example = messages.Examples{
					Tags: []*messages.Tag{
						&tag,
					},
				}

				scenario.Examples = append(scenario.Examples, &example)
			})

			It("processes example's tags", func() {
				ml.processScenario(&scenario)
				Expect(ml.LookupTag("tag-id")).To(Equal(&tag))
			})
		})
	})
})

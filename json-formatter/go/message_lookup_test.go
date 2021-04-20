package json

import (
	"github.com/cucumber/messages-go/v15"

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
		var scenario messages.GherkinDocument_Feature_Scenario

		BeforeEach(func() {
			scenario = messages.GherkinDocument_Feature_Scenario{}
		})

		When("the scenario contains tagged examples", func() {
			var (
				tag     messages.GherkinDocument_Feature_Tag
				example messages.GherkinDocument_Feature_Scenario_Examples
			)

			BeforeEach(func() {
				tag = messages.GherkinDocument_Feature_Tag{
					Id:   "tag-id",
					Name: "@the-tag",
				}

				example = messages.GherkinDocument_Feature_Scenario_Examples{
					Tags: []*messages.GherkinDocument_Feature_Tag{
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

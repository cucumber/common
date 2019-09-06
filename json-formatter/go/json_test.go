package json

import (
	messages "github.com/cucumber/cucumber-messages-go/v5"
	"github.com/stretchr/testify/require"
	"testing"
)

func TestJSON(t *testing.T) {
	t.Run("pickleToURIAndLineNumber: transforms a Pickle in a unique uri:line_number", func(t *testing.T) {
		pickle := stubPickle("id-1", "/somewhere/over/the/rainbow.feature", 3)

		require.Equal(t, "/somewhere/over/the/rainbow.feature:3", pickleToURIAndLineNumber(pickle))
	})

	t.Run("lookupFeatureElement: finds a featureElement based on a Pickle", func(t *testing.T) {
		picklesByID, elementsByURIAndLineNumber := stubIndexes()

		require.Equal(t, "Scenario 1", lookupFeatureElement("id-1", picklesByID, elementsByURIAndLineNumber).Name)
		require.Equal(t, "Scenario 2", lookupFeatureElement("id-2", picklesByID, elementsByURIAndLineNumber).Name)
		require.Equal(t, "Scenario 3", lookupFeatureElement("id-4", picklesByID, elementsByURIAndLineNumber).Name)
	})
}

func stubIndexes() (map[string]*messages.Pickle, map[string]featureElement) {
	pickles := []*messages.Pickle{
		stubPickle("id-1", "/somewhere/over/the/rainbow.feature", 3),
		stubPickle("id-2", "/somewhere/over/the/rainbow.feature", 10),
		stubPickle("id-4", "/somewhere/else.feature", 3),
	}

	picklesByID := make(map[string]*messages.Pickle)
	for _, pickle := range pickles {
		picklesByID[pickle.Id] = pickle
	}

	elementsByURIAndLineNumber := make(map[string]featureElement)
	elementsByURIAndLineNumber["/somewhere/over/the/rainbow.feature:3"] = stubFeatureElement("Scenario 1")
	elementsByURIAndLineNumber["/somewhere/over/the/rainbow.feature:10"] = stubFeatureElement("Scenario 2")
	elementsByURIAndLineNumber["/somewhere/else.feature:3"] = stubFeatureElement("Scenario 3")

	return picklesByID, elementsByURIAndLineNumber
}

func stubPickle(id string, uri string, lineNumber uint32) *messages.Pickle {
	return &messages.Pickle{
		Id: id,
		Locations: []*messages.Location{
			&messages.Location{
				Line: lineNumber,
			},
		},
		Uri: uri,
	}
}

func stubFeatureElement(name string) featureElement {
	return featureElement{
		Name: name,
	}
}

package cucumberexpressions

import (
	"github.com/stretchr/testify/require"
	"reflect"
	"testing"
)

func TestConvert(t *testing.T) {
	t.Run("converts to type string", func(t *testing.T) {
		typeOfString := reflect.TypeOf("string")
		assertTransforms(t, "Barbara Liskov", "Barbara Liskov", typeOfString)
	})

	t.Run("converts to kind string", func(t *testing.T) {
		assertTransforms(t, "Barbara Liskov", "Barbara Liskov", reflect.String)
	})

	t.Run("converts to kind bool", func(t *testing.T) {
		assertTransforms(t, true, "true", reflect.Bool)
	})

	t.Run("converts to kind int", func(t *testing.T) {
		assertTransforms(t, int(42), "42", reflect.Int)
		assertTransforms(t, int8(42), "42", reflect.Int8)
		assertTransforms(t, int16(42), "42", reflect.Int16)
		assertTransforms(t, int32(42), "42", reflect.Int32)
		assertTransforms(t, int64(42), "42", reflect.Int64)
	})

	t.Run("converts to kind unit", func(t *testing.T) {
		assertTransforms(t, uint(42), "42", reflect.Uint)
		assertTransforms(t, uint8(42), "42", reflect.Uint8)
		assertTransforms(t, uint16(42), "42", reflect.Uint16)
		assertTransforms(t, uint32(42), "42", reflect.Uint32)
		assertTransforms(t, uint64(42), "42", reflect.Uint64)
	})

	t.Run("converts to kind float", func(t *testing.T) {
		assertTransforms(t, float32(4), "4", reflect.Float32)
		assertTransforms(t, float64(.2), ".2", reflect.Float64)
		assertTransforms(t, float32(4.2), "4.2", reflect.Float32)
		assertTransforms(t, float64(4.2), "4.2", reflect.Float64)
		assertTransforms(t, float32(4.2e+12), "4.2E12", reflect.Float32)
		assertTransforms(t, float64(4.2e+12), "4.2e12", reflect.Float64)
	})

	t.Run("errors un supported kind", func(t *testing.T) {
		transformer := BuiltInParameterTransformer{}
		_, err := transformer.Transform("Barbara Liskov", reflect.Complex64)
		require.EqualError(t, err,
			"Can't transform 'Barbara Liskov' to complex64. "+
				"BuiltInParameterTransformer only supports a limited number of types. "+
				"Consider using a different object mapper or register a parameter type for complex64")
	})

}

func assertTransforms(t *testing.T, expected interface{}, fromValue string, toValueType interface{}) {
	transformer := BuiltInParameterTransformer{}
	transformed, err := transformer.Transform(fromValue, toValueType)
	if err != nil {
		panic(err)
	}
	require.Equal(t, expected, transformed)
}

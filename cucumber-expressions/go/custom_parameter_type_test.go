package cucumberexpressions

import (
	"fmt"
	"regexp"
	"strconv"
	"testing"

	"github.com/stretchr/testify/require"
)

/// [color-constructor]
type Color struct {
	name string
}

/// [color-constructor]

type CSSColor struct {
	name string
}

func CreateParameterTypeRegistry(t *testing.T) *ParameterTypeRegistry {
	parameterTypeRegistry := NewParameterTypeRegistry()
	/// [add-color-parameter-type]
	colorParameterType, err := NewParameterType(
		"color", // name
		[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")}, // regexps
		"color", // type
		func(args ...*string) interface{} { return &Color{name: *args[0]} }, // transformer
		false, // useForSnippets
		true,  // preferForRegexpMatch
	)
	require.NoError(t, err)
	err = parameterTypeRegistry.DefineParameterType(colorParameterType)
	/// [add-color-parameter-type]
	require.NoError(t, err)
	return parameterTypeRegistry
}

func TestCustomParameterTypes(t *testing.T) {
	t.Run("throws exception for illegal character in parameter type name", func(t *testing.T) {
		_, err := NewParameterType(
			"[string]",
			[]*regexp.Regexp{regexp.MustCompile(`.*`)},
			"x",
			func(args ...*string) interface{} {
				return *args[0]
			},
			false,
			false,
		)
		require.Error(t, err)
		require.Equal(t, "Illegal character '[' in parameter name {[string]}", err.Error())
	})

	t.Run("CucumberExpression", func(t *testing.T) {
		t.Run("matches parameters with custom parameter type", func(t *testing.T) {
			parameterTypeRegistry := CreateParameterTypeRegistry(t)
			expression, err := NewCucumberExpression("I have a {color} ball", parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("I have a red ball")
			require.NoError(t, err)
			require.Equal(t, &Color{name: "red"}, args[0].GetValue())
		})

		t.Run("matches parameters with multiple capture groups", func(t *testing.T) {
			type Coordinate struct {
				x int
				y int
				z int
			}
			parameterTypeRegistry := CreateParameterTypeRegistry(t)
			coordinateParameterType, err := NewParameterType(
				"coordinate",
				[]*regexp.Regexp{regexp.MustCompile(`(\d+),\s*(\d+),\s*(\d+)`)},
				"coordinate",
				func(args ...*string) interface{} {
					x, err := strconv.Atoi(*args[0])
					if err != nil {
						panic(err)
					}
					y, err := strconv.Atoi(*args[1])
					if err != nil {
						panic(err)
					}
					z, err := strconv.Atoi(*args[2])
					if err != nil {
						panic(err)
					}
					return &Coordinate{x: x, y: y, z: z}
				},
				true,
				true,
			)
			require.NoError(t, err)
			err = parameterTypeRegistry.DefineParameterType(coordinateParameterType)
			require.NoError(t, err)
			expression, err := NewCucumberExpression("A {int} thick line from {coordinate} to {coordinate}", parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("A 5 thick line from 10,20,30 to 40,50,60")
			require.NoError(t, err)
			require.Equal(t, 5, args[0].GetValue())
			require.Equal(t, &Coordinate{x: 10, y: 20, z: 30}, args[1].GetValue())
			require.Equal(t, &Coordinate{x: 40, y: 50, z: 60}, args[2].GetValue())
		})

		t.Run("matches parameters with custom parameter type using optional capture group", func(t *testing.T) {
			parameterTypeRegistry := NewParameterTypeRegistry()
			colorParameterType, err := NewParameterType(
				"color",
				[]*regexp.Regexp{
					regexp.MustCompile("red|blue|yellow"),
					regexp.MustCompile("(?:dark|light) (?:red|blue|yellow)"),
				},
				"color",
				func(args ...*string) interface{} { return &Color{name: *args[0]} },
				false,
				true,
			)
			require.NoError(t, err)
			err = parameterTypeRegistry.DefineParameterType(colorParameterType)
			require.NoError(t, err)
			expression, err := NewCucumberExpression("I have a {color} ball", parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("I have a dark red ball")
			require.NoError(t, err)
			require.Equal(t, &Color{name: "dark red"}, args[0].GetValue())
		})

		t.Run("defers transformation until queried from argument", func(t *testing.T) {
			parameterTypeRegistry := NewParameterTypeRegistry()
			colorParameterType, err := NewParameterType(
				"throwing",
				[]*regexp.Regexp{regexp.MustCompile("bad")},
				"throwing",
				func(args ...*string) interface{} { panic(fmt.Sprintf("Can't transform [%s]", *args[0])) },
				false,
				true,
			)
			require.NoError(t, err)
			err = parameterTypeRegistry.DefineParameterType(colorParameterType)
			require.NoError(t, err)
			expression, err := NewCucumberExpression("I have a {throwing} parameter", parameterTypeRegistry)
			require.NoError(t, err)
			args, err := expression.Match("I have a bad parameter")
			require.NoError(t, err)
			require.NotNil(t, args)
			require.PanicsWithValue(t, "Can't transform [bad]", func() {
				args[0].GetValue()
			})
		})

		t.Run("conflicting parameter type", func(t *testing.T) {
			t.Run("is detected for type name", func(t *testing.T) {
				parameterTypeRegistry := CreateParameterTypeRegistry(t)
				colorParameterType, err := NewParameterType(
					"color",
					[]*regexp.Regexp{regexp.MustCompile(".*")},
					"CSSColor",
					func(args ...*string) interface{} { return &CSSColor{name: *args[0]} },
					false,
					true,
				)
				require.NoError(t, err)
				err = parameterTypeRegistry.DefineParameterType(colorParameterType)
				require.Error(t, err)
				require.Equal(t, "There is already a parameter type with name color", err.Error())
			})

			t.Run("is not detected for type", func(t *testing.T) {
				parameterTypeRegistry := CreateParameterTypeRegistry(t)
				colorParameterType, err := NewParameterType(
					"whatever",
					[]*regexp.Regexp{regexp.MustCompile(".*")},
					"Color",
					func(args ...*string) interface{} { return &Color{name: *args[0]} },
					false,
					false,
				)
				require.NoError(t, err)
				err = parameterTypeRegistry.DefineParameterType(colorParameterType)
				require.NoError(t, err)
			})

			t.Run("is not detected for regexp", func(t *testing.T) {
				parameterTypeRegistry := CreateParameterTypeRegistry(t)
				colorParameterType, err := NewParameterType(
					"css-color",
					[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")},
					"CSSColor",
					func(args ...*string) interface{} { return &CSSColor{name: *args[0]} },
					true,
					false,
				)
				require.NoError(t, err)
				err = parameterTypeRegistry.DefineParameterType(colorParameterType)
				require.NoError(t, err)

				cssColorExpression, err := NewCucumberExpression("I have a {css-color} ball", parameterTypeRegistry)
				require.NoError(t, err)
				cssColorArgs, err := cssColorExpression.Match("I have a blue ball")
				require.NoError(t, err)
				require.NotNil(t, cssColorArgs)
				require.Equal(t, &CSSColor{name: "blue"}, cssColorArgs[0].GetValue())

				colorExpression, err := NewCucumberExpression("I have a {color} ball", parameterTypeRegistry)
				require.NoError(t, err)
				colorArgs, err := colorExpression.Match("I have a blue ball")
				require.NoError(t, err)
				require.NotNil(t, colorArgs)
				require.Equal(t, &Color{name: "blue"}, colorArgs[0].GetValue())
			})
		})

		t.Run("RegularExpression", func(t *testing.T) {
			t.Run("matches arguments with custom parameter type", func(t *testing.T) {
				parameterTypeRegistry := NewParameterTypeRegistry()
				colorParameterType, err := NewParameterType(
					"color",
					[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")},
					"color",
					func(args ...*string) interface{} { return &Color{name: *args[0]} },
					false,
					true,
				)
				require.NoError(t, err)
				err = parameterTypeRegistry.DefineParameterType(colorParameterType)
				/// [add-color-parameter-type]
				require.NoError(t, err)

				expression := NewRegularExpression(regexp.MustCompile("I have a (red|blue|yellow) ball"), parameterTypeRegistry)
				args, err := expression.Match("I have a red ball")
				require.NoError(t, err)
				require.NotNil(t, args)
				require.Equal(t, &Color{name: "red"}, args[0].GetValue())
			})
		})
	})
}

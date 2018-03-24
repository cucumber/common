package cucumberexpressions_test

import (
	"regexp"
	"strconv"
	"testing"

	cucumberexpressions "."
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

func CreateParameterTypeRegistry(t *testing.T) *cucumberexpressions.ParameterTypeRegistry {
	parameterTypeRegistry := cucumberexpressions.NewParameterTypeRegistry()
	/// [add-color-parameter-type]
	colorParameterType, err := cucumberexpressions.NewParameterType(
		"color", // name
		[]*regexp.Regexp{regexp.MustCompile("red|blue|yellow")}, // regexps
		"color", // type
		func(args ...string) interface{} { return &Color{name: args[0]} }, // transformer
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
	t.Run("CucumberExpression", func(t *testing.T) {
		t.Run("matches parameters with custom parameter type", func(t *testing.T) {
			parameterTypeRegistry := CreateParameterTypeRegistry(t)
			expression, err := cucumberexpressions.NewCucumberExpression("I have a {color} ball", parameterTypeRegistry)
			require.NoError(t, err)
			value := expression.Match("I have a red ball")[0].GetValue()
			require.Equal(t, &Color{name: "red"}, value)
		})

		t.Run("matches parameters with multiple capture groups", func(t *testing.T) {
			type Coordinate struct {
				x int
				y int
				z int
			}
			parameterTypeRegistry := CreateParameterTypeRegistry(t)
			coordinateParameterType, err := cucumberexpressions.NewParameterType(
				"coordinate",
				[]*regexp.Regexp{regexp.MustCompile(`(\d+),\s*(\d+),\s*(\d+)`)},
				"coordinate",
				func(args ...string) interface{} {
					x, err := strconv.Atoi(args[0])
					if err != nil {
						panic(err)
					}
					y, err := strconv.Atoi(args[1])
					if err != nil {
						panic(err)
					}
					z, err := strconv.Atoi(args[2])
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
			expression, err := cucumberexpressions.NewCucumberExpression("A {int} thick line from {coordinate} to {coordinate}", parameterTypeRegistry)
			args := expression.Match("A 5 thick line from 10,20,30 to 40,50,60")
			require.Equal(t, 5, args[0].GetValue())
			require.Equal(t, &Coordinate{x: 10, y: 20, z: 30}, args[1].GetValue())
			require.Equal(t, &Coordinate{x: 40, y: 50, z: 60}, args[2].GetValue())
		})
	})
}

//
//   describe('CucumberExpression', () => {
//     it('matches parameters with custom parameter type using optional capture group', () => {
//       parameterTypeRegistry = new ParameterTypeRegistry()
//       parameterTypeRegistry.defineParameterType(
//         new ParameterType(
//           'color',
//           [/red|blue|yellow/, /(?:dark|light) (?:red|blue|yellow)/],
//           Color,
//           s => new Color(s),
//           false,
//           true
//         )
//       )
//       const expression = new CucumberExpression(
//         'I have a {color} ball',
//         parameterTypeRegistry
//       )
//       const value = expression.match('I have a dark red ball')[0].getValue(null)
//       assert.equal(value.name, 'dark red')
//     })
//
//     it('defers transformation until queried from argument', () => {
//       parameterTypeRegistry.defineParameterType(
//         new ParameterType(
//           'throwing',
//           /bad/,
//           null,
//           s => {
//             throw new Error(`Can't transform [${s}]`)
//           },
//           false,
//           true
//         )
//       )
//
//       const expression = new CucumberExpression(
//         'I have a {throwing} parameter',
//         parameterTypeRegistry
//       )
//       const args = expression.match('I have a bad parameter')
//       assertThrows(() => args[0].getValue(null), "Can't transform [bad]")
//     })
//
//     describe('conflicting parameter type', () => {
//       it('is detected for type name', () => {
//         assertThrows(
//           () =>
//             parameterTypeRegistry.defineParameterType(
//               new ParameterType(
//                 'color',
//                 /.*/,
//                 CssColor,
//                 s => new CssColor(s),
//                 false,
//                 true
//               )
//             ),
//           'There is already a parameter type with name color'
//         )
//       })
//
//       it('is not detected for type', () => {
//         parameterTypeRegistry.defineParameterType(
//           new ParameterType(
//             'whatever',
//             /.*/,
//             Color,
//             s => new Color(s),
//             false,
//             true
//           )
//         )
//       })
//
//       it('is not detected for regexp', () => {
//         parameterTypeRegistry.defineParameterType(
//           new ParameterType(
//             'css-color',
//             /red|blue|yellow/,
//             CssColor,
//             s => new CssColor(s),
//             true,
//             false
//           )
//         )
//
//         assert.equal(
//           new CucumberExpression(
//             'I have a {css-color} ball',
//             parameterTypeRegistry
//           )
//             .match('I have a blue ball')[0]
//             .getValue(null).constructor,
//           CssColor
//         )
//         assert.equal(
//           new CucumberExpression(
//             'I have a {css-color} ball',
//             parameterTypeRegistry
//           )
//             .match('I have a blue ball')[0]
//             .getValue(null).name,
//           'blue'
//         )
//         assert.equal(
//           new CucumberExpression('I have a {color} ball', parameterTypeRegistry)
//             .match('I have a blue ball')[0]
//             .getValue(null).constructor,
//           Color
//         )
//         assert.equal(
//           new CucumberExpression('I have a {color} ball', parameterTypeRegistry)
//             .match('I have a blue ball')[0]
//             .getValue(null).name,
//           'blue'
//         )
//       })
//     })
//
//     // JavaScript-specific
//     it('creates arguments using async transform', async () => {
//       parameterTypeRegistry = new ParameterTypeRegistry()
//       /// [add-async-parameter-type]
//       parameterTypeRegistry.defineParameterType(
//         new ParameterType(
//           'asyncColor',
//           /red|blue|yellow/,
//           Color,
//           async s => new Color(s),
//           false,
//           true
//         )
//       )
//       /// [add-async-parameter-type]
//
//       const expression = new CucumberExpression(
//         'I have a {asyncColor} ball',
//         parameterTypeRegistry
//       )
//       const args = await expression.match('I have a red ball')
//       const value = await args[0].getValue(null)
//       assert.equal(value.name, 'red')
//     })
//   })
//
//   describe('RegularExpression', () => {
//     it('matches arguments with custom parameter type', () => {
//       const expression = new RegularExpression(
//         /I have a (red|blue|yellow) ball/,
//         parameterTypeRegistry
//       )
//       const value = expression.match('I have a red ball')[0].getValue(null)
//       assert.equal(value.constructor, Color)
//       assert.equal(value.name, 'red')
//     })
//   })
// })

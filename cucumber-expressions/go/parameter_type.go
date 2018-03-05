package cucumberexpressions

type ParameterType struct {
	name                 string
	regexps              []string
	type1                string // Cannot have a field named type as hit a compile error
	transform            func(...string) interface{}
	useForSnippets       bool
	preferForRegexpMatch bool
}

func NewParameterType(name string, regexps []string, type1 string, transform func(...string) interface{}, useForSnippets bool, preferForRegexpMatch bool) *ParameterType {
	if transform == nil {
		transform = func(s ...string) interface{} {
			return s
		}
	}
	return &ParameterType{
		name:                 name,
		regexps:              regexps,
		type1:                type1,
		transform:            transform,
		useForSnippets:       useForSnippets,
		preferForRegexpMatch: preferForRegexpMatch,
	}
}

func (p *ParameterType) Name() string {
	return p.name
}

func (p *ParameterType) Regexps() []string {
	return p.regexps
}

func (p *ParameterType) Type() string {
	return p.type1
}

func (p *ParameterType) UseForSnippets() bool {
	return p.useForSnippets
}

func (p *ParameterType) PreferForRegexpMatch() bool {
	return p.preferForRegexpMatch
}

func (p *ParameterType) Transform(groupValues []string) []interface{} {
	return
}

//
//   transform(thisObj, groupValues) {
//     let args
//     if (this._transform.length === 1) {
//       // transform function with arity 1.
//       const nonNullGroupValues = groupValues.filter(
//         v => v !== null && v !== undefined
//       )
//       if (nonNullGroupValues.length >= 2)
//         throw new CucumberExpressionError(
//           `Single transformer unexpectedly matched 2 values - "${
//             nonNullGroupValues[0]
//           }" and "${nonNullGroupValues[1]}"`
//         )
//       args = [nonNullGroupValues[0]]
//     } else {
//       args = groupValues
//     }
//
//     return this._transform.apply(thisObj, args)
//   }
// }
//
// function stringArray(regexps) {
//   const array = Array.isArray(regexps) ? regexps : [regexps]
//   return array.map(r => (typeof r === 'string' ? r : regexpSource(r)))
// }
//
// function regexpSource(regexp) {
//   const flags = regexpFlags(regexp)
//
//   for (const flag of ['g', 'i', 'm', 'y']) {
//     if (flags.indexOf(flag) !== -1)
//       throw new CucumberExpressionError(
//         `ParameterType Regexps can't use flag '${flag}'`
//       )
//   }
//   return regexp.source
// }
//
// // Backport RegExp.flags for Node 4.x
// // https://github.com/nodejs/node/issues/8390
// //
// // For some strange reason this is not needed for
// // `./mocha dist/test`, but it is needed for
// // `./mocha dist/test/parameter_type_test.js`
// function regexpFlags(regexp) {
//   let flags = regexp.flags
//   if (flags === undefined) {
//     flags = ''
//     if (regexp.ignoreCase) flags += 'i'
//     if (regexp.global) flags += 'g'
//     if (regexp.multiline) flags += 'm'
//   }
//   return flags
// }
//
// module.exports = ParameterType

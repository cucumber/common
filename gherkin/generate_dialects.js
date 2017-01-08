#!/usr/bin/env node
//
// This script translates i18n.json (Gherkin 2) to gherkin-languages.json (Gherkin 3).
//

var i18n = require(process.argv[2]);
var dialects = {};

Object.keys(i18n).forEach(function (iso) {
  var lang = i18n[iso];

  var dialect = {
    name: lang.name,
    native: lang.native,
    feature: lang.feature.split('|'),
    background: lang.background.split('|'),
    scenario: lang.scenario.split('|'),
    scenarioOutline: lang.scenario_outline.split('|'),
    examples: lang.examples.split('|'),
    given: space(lang.given.split('|')),
    when: space(lang.when.split('|')),
    then: space(lang.then.split('|')),
    and: space(lang.and.split('|')),
    but: space(lang.but.split('|'))
  };

  dialects[iso] = dialect;
});

function space(keywords) {
  return keywords.map(function (keyword) {
    if (keyword[keyword.length-1] == '<') {
      return keyword.substring(0, keyword.length-1);
    } else {
      return keyword + ' ';
    }
  });
}

console.log(JSON.stringify(dialects, null, 2));

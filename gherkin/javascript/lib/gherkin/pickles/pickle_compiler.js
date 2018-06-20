var m = require('cucumber-messages').cucumber.messages
var countSymbols = require('../count_symbols');

function PickleCompiler() {
  this.compile = function (gherkinDocument, uri) {
    var pickles = [];

    if (gherkinDocument.feature == null) return pickles;

    var feature = gherkinDocument.feature;
    if (!feature) return pickles
    var language = feature.language;
    var tags = feature.tags;

    compileFeature(pickles, language, tags, feature, uri);
    return pickles;
  };

  function compileFeature(pickles, language, tags, feature, uri) {
    var backgroundSteps = []
    for (const featureChild of feature.children) {
      if (featureChild.background) {
        backgroundSteps = backgroundSteps.concat(pickleSteps(featureChild.background.steps));
      } else if (featureChild.rule) {
        compileRule(pickles, language, tags, backgroundSteps, featureChild.rule, uri)
      } else {
        var scenario = featureChild.scenario
        if (scenario.examples.length === 0) {
          compileScenario(tags, backgroundSteps, scenario, language, pickles, uri);
        } else {
          compileScenarioOutline(tags, backgroundSteps, scenario, language, pickles, uri);
        }
      }
    }
  }

  function compileRule(pickles, language, tags, featureBackgroundSteps, rule, uri) {
    var backgroundSteps = featureBackgroundSteps.slice(0) // dup
    for (const ruleChild of rule.children) {
      if (ruleChild.background) {
        backgroundSteps = backgroundSteps.concat(pickleSteps(ruleChild.background.steps));
      } else {
        var scenario = ruleChild.scenario
        if (scenario.examples.length === 0) {
          compileScenario(tags, backgroundSteps, scenario, language, pickles, uri);
        } else {
          compileScenarioOutline(tags, backgroundSteps, scenario, language, pickles, uri);
        }
      }
    }
  }

  function compileScenario(featureTags, backgroundSteps, scenario, language, pickles, uri) {
    var steps = scenario.steps.length === 0 ? [] : backgroundSteps.slice(0)
    steps = steps.concat(pickleSteps(scenario.steps))

    var tags = [].concat(featureTags).concat(scenario.tags);

    var pickle = m.Pickle.fromObject({
      uri: uri,
      tags: pickleTags(tags),
      name: scenario.name,
      language: language,
      locations: [scenario.location],
      steps: steps
    })
    pickles.push(pickle);
  }

  function compileScenarioOutline(featureTags, backgroundSteps, scenario, language, pickles, uri) {
    for (var i in scenario.examples) {
      var examples = scenario.examples[i]
      if (!examples.tableHeader) continue
      var variableCells = examples.tableHeader.cells;
      examples.tableBody.forEach(function (values) {
        var valueCells = values.cells;
        var steps = scenario.steps.length === 0 ? [] : [].concat(backgroundSteps);
        var tags = [].concat(featureTags).concat(scenario.tags).concat(examples.tags);

        scenario.steps.forEach(function (scenarioOutlineStep) {
          var pickleStepOb = pickleStepObject(scenarioOutlineStep, variableCells, valueCells)
          pickleStepOb.locations.push(values.location)
          var pickleStep = m.PickleStep.fromObject(pickleStepOb)
          steps.push(pickleStep);
        });

        var pickle = m.Pickle.fromObject({
          uri: uri,
          name: interpolate(scenario.name, variableCells, valueCells),
          language: language,
          steps: steps,
          tags: pickleTags(tags),
          locations: [
            scenario.location,
            values.location
          ]
        })
        pickles.push(pickle);

      });
    }
  }

  function interpolate(name, variableCells, valueCells) {
    variableCells.forEach(function (variableCell, n) {
      var valueCell = valueCells[n];
      var search = new RegExp('<' + variableCell.value + '>', 'g');
      // JS Specific - dollar sign needs to be escaped with another dollar sign
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
      var replacement = valueCell.value.replace(new RegExp('\\$', 'g'), '$$$$')
      name = name.replace(search, replacement);
    });
    return name;
  }

  function pickleSteps(steps) {
    return steps.map(function (step) {
      return m.PickleStep.fromObject(pickleStepObject(step, [], []))
    });
  }

  function pickleStepObject(step, variableCells, valueCells) {
    var stepText = interpolate(step.text, variableCells, valueCells);
    var ob = {
      text: stepText,
      locations: [pickleStepLocation(step)]
    }
    if (step.dataTable) {
      ob.dataTable = pickleDataTable(step.dataTable, variableCells, valueCells)
    }
    if (step.docString) {
      ob.docString = pickleDocString(step.docString, variableCells, valueCells)
    }

    return ob
  }

  function pickleDocString(docString, variableCells, valueCells) {
    return m.PickleDocString.fromObject({
      location: docString.location,
      content: interpolate(docString.content, variableCells, valueCells),
      contentType: docString.contentType ? interpolate(docString.contentType, variableCells, valueCells) : null
    })
  }

  function pickleDataTable(dataTable, variableCells, valueCells) {
    return m.PickleTable.fromObject({
      rows: dataTable.rows.map(function (row) {
        return m.PickleTableRow.fromObject({
          cells: row.cells.map(function (cell) {
            return m.PickleTableCell.fromObject({
              location: cell.location,
              value: interpolate(cell.value, variableCells, valueCells)
            });
          })
        })
      })
    })
  }

  function pickleStepLocation(step) {
    return m.Location.fromObject({
      line: step.location.line,
      column: step.location.column + (step.keyword ? countSymbols(step.keyword) : 0)
    })
  }

  function pickleTags(tags) {
    return tags.map(function (tag) {
      return pickleTag(tag);
    });
  }

  function pickleTag(tag) {
    return m.PickleTag.fromObject({
      name: tag.name,
      location: tag.location
    });
  }
}

module.exports = PickleCompiler;

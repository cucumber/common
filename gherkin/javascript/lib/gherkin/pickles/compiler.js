var countSymbols = require('../count_symbols');

function Compiler() {
  this.compile = function (gherkin_document) {
    var pickles = [];

    if (gherkin_document.feature == null) return pickles;

    var feature = gherkin_document.feature;
    var language = feature.language;
    var tags = feature.tags;
    var backgroundSteps = [];

    build(pickles, language, tags, backgroundSteps, feature);
    return pickles;
  };

  function build(pickles, language, tags, parentBackgroundSteps, parent) {
    var backgroundSteps = parentBackgroundSteps.slice(0); // dup
    parent.children.forEach(function (child) {
      if (child.type === 'Background') {
        backgroundSteps = backgroundSteps.concat(pickleSteps(child));
      } else if (child.type === 'Rule') {
        build(pickles, language, tags, backgroundSteps, child)
      } else {
        var scenario = child
        if (scenario.examples.length === 0) {
          compileScenario(tags, backgroundSteps, scenario, language, pickles);
        } else {
          compileScenarioOutline(tags, backgroundSteps, scenario, language, pickles);
        }
      }
    });
  }

  function compileScenario(featureTags, backgroundSteps, scenario, language, pickles) {
    var steps = scenario.steps.length == 0 ? [] : [].concat(backgroundSteps);

    var tags = [].concat(featureTags).concat(scenario.tags);

    scenario.steps.forEach(function (step) {
      steps.push(pickleStep(step));
    });

    var pickle = {
      tags: pickleTags(tags),
      name: scenario.name,
      language: language,
      locations: [pickleLocation(scenario.location)],
      steps: steps
    };
    pickles.push(pickle);
  }

  function compileScenarioOutline(featureTags, backgroundSteps, scenario, language, pickles) {
    scenario.examples.filter(function(e) { return e.tableHeader != undefined; }).forEach(function (examples) {
      var variableCells = examples.tableHeader.cells;
      examples.tableBody.forEach(function (values) {
        var valueCells = values.cells;
        var steps = scenario.steps.length == 0 ? [] : [].concat(backgroundSteps);
        var tags = [].concat(featureTags).concat(scenario.tags).concat(examples.tags);

        scenario.steps.forEach(function (scenarioOutlineStep) {
          var stepText = interpolate(scenarioOutlineStep.text, variableCells, valueCells);
          var args = createPickleArguments(scenarioOutlineStep.argument, variableCells, valueCells);
          var pickleStep = {
            text: stepText,
            arguments: args,
            locations: [
              pickleLocation(values.location),
              pickleStepLocation(scenarioOutlineStep)
            ]
          };
          steps.push(pickleStep);
        });

        var pickle = {
          name: interpolate(scenario.name, variableCells, valueCells),
          language: language,
          steps: steps,
          tags: pickleTags(tags),
          locations: [
            pickleLocation(values.location),
            pickleLocation(scenario.location)
          ]
        };
        pickles.push(pickle);

      });
    });
  }

  function createPickleArguments(argument, variableCells, valueCells) {
    var result = [];
    if (!argument) return result;
    if (argument.type === 'DataTable') {
      var table = {
        rows: argument.rows.map(function (row) {
          return {
            cells: row.cells.map(function (cell) {
              return {
                location: pickleLocation(cell.location),
                value: interpolate(cell.value, variableCells, valueCells)
              };
            })
          };
        })
      };
      result.push(table);
    } else if (argument.type === 'DocString') {
      var docString = {
        location: pickleLocation(argument.location),
        content: interpolate(argument.content, variableCells, valueCells),
      };
      if(argument.contentType) {
        docString.contentType = interpolate(argument.contentType, variableCells, valueCells);
      }
      result.push(docString);
    } else {
      throw Error('Internal error');
    }
    return result;
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

  function pickleSteps(scenarioDefinition) {
    return scenarioDefinition.steps.map(function (step) {
      return pickleStep(step);
    });
  }

  function pickleStep(step) {
    return {
      text: step.text,
      arguments: createPickleArguments(step.argument, [], []),
      locations: [pickleStepLocation(step)]
    }
  }

  function pickleStepLocation(step) {
    return {
      line: step.location.line,
      column: step.location.column + (step.keyword ? countSymbols(step.keyword) : 0)
    };
  }

  function pickleLocation(location) {
    return {
      line: location.line,
      column: location.column
    }
  }

  function pickleTags(tags) {
    return tags.map(function (tag) {
      return pickleTag(tag);
    });
  }

  function pickleTag(tag) {
    return {
      name: tag.name,
      location: pickleLocation(tag.location)
    };
  }
}

module.exports = Compiler;

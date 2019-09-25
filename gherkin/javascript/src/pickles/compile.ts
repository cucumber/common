import countSymbols from '../countSymbols'
import { messages } from 'cucumber-messages'
import IGherkinDocument = messages.IGherkinDocument

export default function compile(gherkinDocument: IGherkinDocument) {
  const pickles: messages.IPickle[] = []

  if (gherkinDocument.feature == null) {
    return pickles
  }

  const feature = gherkinDocument.feature
  const language = feature.language
  const featureTags = feature.tags
  let backgroundSteps: messages.GherkinDocument.Feature.IStep[] = []

  feature.children.forEach(stepsContainer => {
    if (stepsContainer.background) {
      backgroundSteps = pickleSteps(stepsContainer.background)
    } else if (stepsContainer.rule) {
      compileRule(
        featureTags,
        backgroundSteps,
        stepsContainer.rule,
        language,
        pickles
      )
    } else if (stepsContainer.scenario.examples.length === 0) {
      compileScenario(
        featureTags,
        backgroundSteps,
        stepsContainer.scenario,
        language,
        pickles
      )
    } else {
      compileScenarioOutline(
        featureTags,
        backgroundSteps,
        stepsContainer.scenario,
        language,
        pickles
      )
    }
  })
  return pickles
}

function compileRule(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  inheritedBackgroundSteps: messages.GherkinDocument.Feature.IStep[],
  rule: messages.GherkinDocument.Feature.FeatureChild.IRule,
  language: string,
  pickles: messages.IPickle[]
) {
  let backgroundSteps = [].concat(inheritedBackgroundSteps)

  rule.children.forEach(stepsContainer => {
    if (stepsContainer.background) {
      backgroundSteps = backgroundSteps.concat(
        pickleSteps(stepsContainer.background)
      )
    } else if (stepsContainer.scenario.examples.length === 0) {
      compileScenario(
        featureTags,
        backgroundSteps,
        stepsContainer.scenario,
        language,
        pickles
      )
    } else {
      compileScenarioOutline(
        featureTags,
        backgroundSteps,
        stepsContainer.scenario,
        language,
        pickles
      )
    }
  })
}

function compileScenario(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  backgroundSteps: messages.GherkinDocument.Feature.IStep[],
  scenario: messages.GherkinDocument.Feature.IScenario,
  language: string,
  pickles: messages.IPickle[]
) {
  const steps = scenario.steps.length === 0 ? [] : [].concat(backgroundSteps)

  const tags = [].concat(featureTags).concat(scenario.tags)

  scenario.steps.forEach(step => steps.push(pickleStep(step)))

  const pickle = messages.Pickle.fromObject({
    tags: pickleTags(tags),
    name: scenario.name,
    language,
    locations: [scenario.location],
    steps,
  })
  pickles.push(pickle)
}

function compileScenarioOutline(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  backgroundSteps: messages.GherkinDocument.Feature.IStep[],
  scenario: messages.GherkinDocument.Feature.IScenario,
  language: string,
  pickles: messages.IPickle[]
) {
  scenario.examples
    .filter(e => e.tableHeader !== null)
    .forEach(examples => {
      const variableCells = examples.tableHeader.cells
      examples.tableBody.forEach(values => {
        const valueCells = values.cells
        const steps =
          scenario.steps.length === 0 ? [] : [].concat(backgroundSteps)
        const tags = []
          .concat(featureTags)
          .concat(scenario.tags)
          .concat(examples.tags)

        scenario.steps.forEach(scenarioOutlineStep => {
          const stepText = interpolate(
            scenarioOutlineStep.text,
            variableCells,
            valueCells
          )
          const args = createPickleArguments(
            scenarioOutlineStep,
            variableCells,
            valueCells
          )
          steps.push(
            messages.Pickle.PickleStep.fromObject({
              text: stepText,
              argument: args,
              locations: [
                pickleStepLocation(scenarioOutlineStep),
                values.location,
              ],
            })
          )
        })

        pickles.push(
          messages.Pickle.fromObject({
            name: interpolate(scenario.name, variableCells, valueCells),
            language,
            steps,
            tags: pickleTags(tags),
            locations: [scenario.location, values.location],
          })
        )
      })
    })
}

function createPickleArguments(
  step: messages.GherkinDocument.Feature.IStep,
  variableCells: messages.GherkinDocument.Feature.TableRow.ITableCell[],
  valueCells: messages.GherkinDocument.Feature.TableRow.ITableCell[]
) {
  if (step.dataTable) {
    const argument = step.dataTable
    const table = {
      rows: argument.rows.map(row => {
        return {
          cells: row.cells.map(cell => {
            return {
              location: cell.location,
              value: interpolate(cell.value, variableCells, valueCells),
            }
          }),
        }
      }),
    }
    return {
      dataTable: table,
    }
  } else if (step.docString) {
    const argument = step.docString
    const docString = messages.PickleStepArgument.PickleDocString.fromObject({
      location: argument.location,
      content: interpolate(argument.content, variableCells, valueCells),
    })
    if (argument.contentType) {
      docString.contentType = interpolate(
        argument.contentType,
        variableCells,
        valueCells
      )
    }
    return {
      docString,
    }
  }
}

function interpolate(
  name: string,
  variableCells: messages.GherkinDocument.Feature.TableRow.ITableCell[],
  valueCells: messages.GherkinDocument.Feature.TableRow.ITableCell[]
) {
  variableCells.forEach((variableCell, n) => {
    const valueCell = valueCells[n]
    const search = new RegExp('<' + variableCell.value + '>', 'g')
    // JS Specific - dollar sign needs to be escaped with another dollar sign
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace#Specifying_a_string_as_a_parameter
    const replacement = valueCell.value.replace(new RegExp('\\$', 'g'), '$$$$')
    name = name.replace(search, replacement)
  })
  return name
}

function pickleSteps(
  scenarioDefinition: messages.GherkinDocument.Feature.IScenario
) {
  return scenarioDefinition.steps.map(pickleStep)
}

function pickleStep(step: messages.GherkinDocument.Feature.IStep) {
  return messages.Pickle.PickleStep.fromObject({
    text: step.text,
    argument: createPickleArguments(step, [], []),
    locations: [pickleStepLocation(step)],
  })
}

function pickleStepLocation(step: messages.GherkinDocument.Feature.IStep) {
  return messages.Location.fromObject({
    line: step.location.line,
    column:
      step.location.column + (step.keyword ? countSymbols(step.keyword) : 0),
  })
}

function pickleTags(tags: messages.GherkinDocument.Feature.ITag[]) {
  return tags.map(pickleTag)
}

function pickleTag(tag: messages.GherkinDocument.Feature.ITag) {
  return messages.Pickle.PickleTag.fromObject({
    name: tag.name,
    location: tag.location,
  })
}

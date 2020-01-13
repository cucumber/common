import { messages, IdGenerator } from 'cucumber-messages'
import IGherkinDocument = messages.IGherkinDocument

export default function compile(
  gherkinDocument: IGherkinDocument,
  uri: string,
  newId: IdGenerator.NewId
) {
  const pickles: messages.IPickle[] = []

  if (gherkinDocument.feature == null) {
    return pickles
  }

  const feature = gherkinDocument.feature
  const language = feature.language
  const featureTags = feature.tags
  let featureBackgroundSteps: messages.GherkinDocument.Feature.IStep[] = []

  feature.children.forEach(stepsContainer => {
    if (stepsContainer.background) {
      featureBackgroundSteps = [].concat(stepsContainer.background.steps)
    } else if (stepsContainer.rule) {
      compileRule(
        featureTags,
        featureBackgroundSteps,
        stepsContainer.rule,
        language,
        pickles,
        uri,
        newId
      )
    } else if (stepsContainer.scenario.examples.length === 0) {
      compileScenario(
        featureTags,
        featureBackgroundSteps,
        stepsContainer.scenario,
        language,
        pickles,
        uri,
        newId
      )
    } else {
      compileScenarioOutline(
        featureTags,
        featureBackgroundSteps,
        stepsContainer.scenario,
        language,
        pickles,
        uri,
        newId
      )
    }
  })
  return pickles
}

function compileRule(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  featureBackgroundSteps: messages.GherkinDocument.Feature.IStep[],
  rule: messages.GherkinDocument.Feature.FeatureChild.IRule,
  language: string,
  pickles: messages.IPickle[],
  uri: string,
  newId: IdGenerator.NewId
) {
  let ruleBackgroundSteps = [].concat(featureBackgroundSteps)

  rule.children.forEach(stepsContainer => {
    if (stepsContainer.background) {
      ruleBackgroundSteps = ruleBackgroundSteps.concat(
        stepsContainer.background.steps
      )
    } else if (stepsContainer.scenario.examples.length === 0) {
      compileScenario(
        featureTags,
        ruleBackgroundSteps,
        stepsContainer.scenario,
        language,
        pickles,
        uri,
        newId
      )
    } else {
      compileScenarioOutline(
        featureTags,
        ruleBackgroundSteps,
        stepsContainer.scenario,
        language,
        pickles,
        uri,
        newId
      )
    }
  })
}

function compileScenario(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  backgroundSteps: messages.GherkinDocument.Feature.IStep[],
  scenario: messages.GherkinDocument.Feature.IScenario,
  language: string,
  pickles: messages.IPickle[],
  uri: string,
  newId: IdGenerator.NewId
) {
  const steps =
    scenario.steps.length === 0
      ? []
      : backgroundSteps.map(step => pickleStep(step, [], null, newId))

  const tags = [].concat(featureTags).concat(scenario.tags)

  scenario.steps.forEach(step => steps.push(pickleStep(step, [], null, newId)))

  const pickle = messages.Pickle.create({
    id: newId(),
    uri,
    astNodeIds: [scenario.id],
    tags: pickleTags(tags),
    name: scenario.name,
    language,
    steps,
  })
  pickles.push(pickle)
}

function compileScenarioOutline(
  featureTags: messages.GherkinDocument.Feature.ITag[],
  backgroundSteps: messages.GherkinDocument.Feature.IStep[],
  scenario: messages.GherkinDocument.Feature.IScenario,
  language: string,
  pickles: messages.IPickle[],
  uri: string,
  newId: IdGenerator.NewId
) {
  scenario.examples
    .filter(e => e.tableHeader !== null)
    .forEach(examples => {
      const variableCells = examples.tableHeader.cells
      examples.tableBody.forEach(valuesRow => {
        const steps =
          scenario.steps.length === 0
            ? []
            : backgroundSteps.map(step => pickleStep(step, [], null, newId))
        const tags = []
          .concat(featureTags)
          .concat(scenario.tags)
          .concat(examples.tags)

        scenario.steps.forEach(scenarioOutlineStep => {
          const step = pickleStep(
            scenarioOutlineStep,
            variableCells,
            valuesRow,
            newId
          )
          steps.push(step)
        })

        pickles.push(
          messages.Pickle.create({
            id: newId(),
            uri,
            astNodeIds: [scenario.id, valuesRow.id],
            name: interpolate(scenario.name, variableCells, valuesRow.cells),
            language,
            steps,
            tags: pickleTags(tags),
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
    const docString = messages.PickleStepArgument.PickleDocString.create({
      content: interpolate(argument.content, variableCells, valueCells),
    })
    if (argument.mediaType) {
      docString.mediaType = interpolate(
        argument.mediaType,
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

function pickleStep(
  step: messages.GherkinDocument.Feature.IStep,
  variableCells: messages.GherkinDocument.Feature.TableRow.ITableCell[],
  valuesRow: messages.GherkinDocument.Feature.ITableRow | null,
  newId: IdGenerator.NewId
) {
  const astNodeIds = [step.id]
  if (valuesRow) {
    astNodeIds.push(valuesRow.id)
  }
  const valueCells = valuesRow ? valuesRow.cells : []

  return messages.Pickle.PickleStep.create({
    id: newId(),
    text: interpolate(step.text, variableCells, valueCells),
    argument: createPickleArguments(step, variableCells, valueCells),
    astNodeIds,
  })
}

function pickleTags(tags: messages.GherkinDocument.Feature.ITag[]) {
  return tags.map(pickleTag)
}

function pickleTag(tag: messages.GherkinDocument.Feature.ITag) {
  return messages.Pickle.PickleTag.create({
    name: tag.name,
    astNodeId: tag.id,
  })
}

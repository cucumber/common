import {AstBuilder, GherkinInMarkdownTokenMatcher, Parser} from '@cucumber/gherkin';
import {Background, Examples, Feature, IdGenerator, Rule, Scenario, Step} from '@cucumber/messages';

export default function makeGherkinLines(markdown: string): readonly number[] {
  const gherkinParser = new Parser(new AstBuilder(IdGenerator.uuid()), new GherkinInMarkdownTokenMatcher())
  const gherkinLines: number[] = []
  try {
    const gherkinDocument = gherkinParser.parse(markdown)
    if (gherkinDocument.feature) {
      walkFeature(gherkinDocument.feature, gherkinLines)
    }
  } catch (parseError) {
    console.log(parseError.message)
    console.log('---')
    console.log(markdown)
    // ignore
  }
  return gherkinLines
}

function walkFeature(feature: Feature, gherkinLines: number[]) {
  gherkinLines.push(feature.location.line)
  for (const featureChild of feature.children) {
    if (featureChild.background) {
      walkBackground(featureChild.background, gherkinLines)
    } else if (featureChild.scenario) {
      walkScenario(featureChild.scenario, gherkinLines)
    } else if (featureChild.rule) {
      walkRule(featureChild.rule, gherkinLines)
    }
  }
}

function walkBackground(background: Background, gherkinLines: number[]) {
  gherkinLines.push(background.location.line)
  walkSteps(background.steps, gherkinLines)
}

function walkScenario(scenario: Scenario, gherkinLines: number[]) {
  gherkinLines.push(scenario.location.line)
  walkSteps(scenario.steps, gherkinLines)
  for (const examples of scenario.examples) {
    walkExamples(examples, gherkinLines)
  }
}

function walkExamples(examples: Examples, gherkinLines: number[]) {
  gherkinLines.push(examples.location.line)
}

function walkRule(rule: Rule, gherkinLines: number[]) {
  gherkinLines.push(rule.location.line)
  for (const ruleChild of rule.children) {
    if (ruleChild.background) {
      walkBackground(ruleChild.background, gherkinLines)
    } else if (ruleChild.scenario) {
      walkScenario(ruleChild.scenario, gherkinLines)
    }
  }
}

function walkSteps(steps: readonly Step[], gherkinLines: number[]) {
  for (const step of steps) {
    gherkinLines.push(step.location.line)
  }
}

import { messages } from 'cucumber-messages';
export default class CucumberQuery {
    private readonly uriByAstNodeIdId;
    private readonly locationByAstNodeId;
    private readonly gherkinStepById;
    private readonly pickleById;
    private readonly pickleStepById;
    private readonly testCaseStartedById;
    private readonly testCaseById;
    private readonly testStepById;
    private readonly testStepResultsByUriAndLine;
    private readonly testCaseResultsByUriAndLine;
    private readonly documentResultsByUri;
    private readonly testStepMatchArgumentsByUriAndLine;
    update(message: messages.IEnvelope): CucumberQuery;
    private updateBackground;
    private updateScenario;
    getStepResults(uri: string, lineNumber: number): messages.ITestResult[];
    getScenarioResults(uri: string, lineNumber: number): messages.ITestResult[];
    getDocumentResults(uri: string): messages.ITestResult[];
    getStepMatchArguments(uri: string, lineNumber: number): messages.IStepMatchArgument[];
    getGherkinStep(gherkinStepId: string): messages.GherkinDocument.Feature.IStep;
}

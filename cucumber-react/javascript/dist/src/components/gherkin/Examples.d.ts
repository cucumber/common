import React from 'react';
import { messages } from 'cucumber-messages';
import IExamples = messages.GherkinDocument.Feature.Scenario.IExamples;
interface IExamplesProps {
    examples: IExamples;
}
declare const Examples: React.FunctionComponent<IExamplesProps>;
export default Examples;

import React from 'react';
import { messages } from 'cucumber-messages';
import IScenario = messages.GherkinDocument.Feature.IScenario;
interface IProps {
    scenario: IScenario;
}
declare const Scenario: React.FunctionComponent<IProps>;
export default Scenario;

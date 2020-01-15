import React from 'react';
import { messages } from 'cucumber-messages';
interface IProps {
    step: messages.GherkinDocument.Feature.IStep;
}
declare const Step: React.FunctionComponent<IProps>;
export default Step;

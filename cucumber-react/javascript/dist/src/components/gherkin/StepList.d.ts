import { messages } from 'cucumber-messages';
import React from 'react';
interface IProps {
    steps: messages.GherkinDocument.Feature.IStep[];
}
declare const StepList: React.FunctionComponent<IProps>;
export default StepList;

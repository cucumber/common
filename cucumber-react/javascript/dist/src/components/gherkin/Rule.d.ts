import React from 'react';
import { messages } from 'cucumber-messages';
import IRule = messages.GherkinDocument.Feature.FeatureChild.IRule;
interface IProps {
    rule: IRule;
}
declare const Rule: React.FunctionComponent<IProps>;
export default Rule;

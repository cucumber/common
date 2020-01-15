import React from 'react';
import { messages } from 'cucumber-messages';
import IDocString = messages.GherkinDocument.Feature.Step.IDocString;
interface IProps {
    docString: IDocString;
}
declare const DocString: React.FunctionComponent<IProps>;
export default DocString;

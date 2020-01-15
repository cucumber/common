import { messages } from 'cucumber-messages';
import React from 'react';
interface IProps {
    gherkinDocument: messages.IGherkinDocument;
}
declare const GherkinDocument: React.FunctionComponent<IProps>;
export default GherkinDocument;

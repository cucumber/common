import React from 'react';
import { messages } from 'cucumber-messages';
import CucumberQuery from 'cucumber-query';
interface IProps {
    gherkinDocuments: messages.IGherkinDocument[];
    cucumberQuery: CucumberQuery;
}
declare const GherkinDocumentList: React.FunctionComponent<IProps>;
export default GherkinDocumentList;

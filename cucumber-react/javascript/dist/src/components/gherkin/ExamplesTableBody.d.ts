import React from 'react';
import { messages } from 'cucumber-messages';
interface IProps {
    rows: messages.GherkinDocument.Feature.ITableRow[];
}
declare const ExamplesTableBody: React.FunctionComponent<IProps>;
export default ExamplesTableBody;

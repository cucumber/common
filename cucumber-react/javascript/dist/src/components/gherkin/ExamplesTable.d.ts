import React from 'react';
import { messages } from 'cucumber-messages';
import ITableRow = messages.GherkinDocument.Feature.ITableRow;
interface IProps {
    tableHeader: ITableRow;
    tableBody: ITableRow[];
}
declare const ExamplesTable: React.FunctionComponent<IProps>;
export default ExamplesTable;

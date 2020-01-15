import React from 'react';
import { messages } from 'cucumber-messages';
import IDataTable = messages.GherkinDocument.Feature.Step.IDataTable;
interface IProps {
    dataTable: IDataTable;
}
declare const DataTable: React.FunctionComponent<IProps>;
export default DataTable;

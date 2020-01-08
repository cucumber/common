import React from 'react'
import { messages } from 'cucumber-messages'
import TableBody from './TableBody'
import IDataTable = messages.GherkinDocument.Feature.Step.IDataTable

interface IProps {
  dataTable: IDataTable
}

const DataTable: React.FunctionComponent<IProps> = ({ dataTable }) => {
  return (
    <table>
      <TableBody rows={dataTable.rows || []} />
    </table>
  )
}

export default DataTable

import React from 'react'
import { messages } from 'cucumber-messages'
import TableBody from './TableBody'
import { Table } from './html'
import IDataTable = messages.GherkinDocument.Feature.Step.IDataTable

interface IProps {
  dataTable: IDataTable
}

const DataTable: React.FunctionComponent<IProps> = ({ dataTable }) => {
  return (
    <Table>
      <TableBody rows={dataTable.rows || []} />
    </Table>
  )
}

export default DataTable

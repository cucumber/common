import * as React from 'react'
import { messages } from 'cucumber-messages'
import TableBody from './TableBody'
import IDataTable = messages.GherkinDocument.Feature.Step.IDataTable
import { Html } from './html'

interface IProps {
  dataTable: IDataTable
}

const DataTable: React.FunctionComponent<IProps> = ({ dataTable }) => {
  return (
    <Html>
      <TableBody rows={dataTable.rows || []} />
    </Html>
  )
}

export default DataTable

import React from 'react'
import * as messages from '@cucumber/messages'
import TableBody from './TableBody'

interface IProps {
  dataTable: messages.DataTable
}

const DataTable: React.FunctionComponent<IProps> = ({ dataTable }) => {
  return (
    <table className="cucumber-table cucumber-datatable">
      <TableBody rows={dataTable.rows || []} />
    </table>
  )
}

export default DataTable

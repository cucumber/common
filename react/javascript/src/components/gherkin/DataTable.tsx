import React, { useContext } from 'react'
import TableBody from './TableBody'
import styles from './DataTable.module.scss'
import { CustomRenderingContext, DataTableProps, mixinStyles } from '../customise/CustomRendering'

const DataTable: React.FunctionComponent<DataTableProps> = ({ dataTable }) => {
  const { DataTable: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return <Custom/>
  }
  const composedStyles = mixinStyles(styles, Custom)
  return (
    <table className={composedStyles.table}>
      <TableBody rows={dataTable.rows || []} />
    </table>
  )
}

export default DataTable

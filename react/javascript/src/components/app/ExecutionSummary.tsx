import React from 'react'
import { messages } from '@cucumber/messages'

interface IProps {
  meta: messages.IMeta
}

interface IProductProps {
  name: string
  product: messages.Meta.IProduct
}

const Product: React.FunctionComponent<IProductProps> = ({
  name: name,
  product: product,
}) => {
  return (
    <tr>
      <th>{name}</th>
      <td>
        {product.name} - {product.version}
      </td>
    </tr>
  )
}

const ExecutionSummary: React.FunctionComponent<IProps> = ({ meta: meta }) => {
  return (
    <div>
      <table>
        <tbody>
          <Product name="Implementation" product={meta.implementation} />
          <Product name="Runtime" product={meta.runtime} />
          <Product name="OS" product={meta.os} />
          <Product name="CPU" product={meta.cpu} />
        </tbody>
      </table>
    </div>
  )
}

export default ExecutionSummary

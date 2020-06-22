import React from 'react'
import { messages } from '@cucumber/messages'

interface IProps {}

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

const ExecutionSummary: React.FunctionComponent<IProps> = ({}) => {
  const meta = messages.Meta.create({
    runtime: messages.Meta.Product.create({
      name: 'Node / Ruby / Java',
      version: '1.2.3',
    }),
    cpu: messages.Meta.Product.create({
      name: 'A CPU',
      version: '4.5.6',
    }),
    implementation: messages.Meta.Product.create({
      name: 'A real fake-cucumber',
      version: '7.8.9',
    }),
    os: messages.Meta.Product.create({
      name: 'Mac OSish',
      version: 'X.Y.Z',
    }),
    protocolVersion: '14.0.1',
  })

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

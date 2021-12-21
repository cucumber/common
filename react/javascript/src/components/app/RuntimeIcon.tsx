import React, { VoidFunctionComponent } from 'react'
import { NodeJs } from './icons/NodeJs'
import { Jvm } from './icons/Jvm'
import { Ruby } from './icons/Ruby'

export const RuntimeIcon: VoidFunctionComponent<{ name: string }> = ({ name }) => {
  // TODO need to pattern match more permissively here
  switch (name) {
    case 'node.js':
      return <NodeJs />
    case 'jvm':
      return <Jvm />
    case 'ruby':
      return <Ruby />
    default:
      return <>&mdash;</>
  }
}

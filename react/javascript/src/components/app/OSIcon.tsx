import React, { VoidFunctionComponent } from 'react'
import { Windows } from './icons/Windows'
import { Linux } from './icons/Linux'
import { MacOS } from './icons/MacOS'

export const OSIcon: VoidFunctionComponent<{ name: string }> = ({ name }) => {
  // TODO need to pattern match more permissively here
  switch (name) {
    case 'linux':
      return <Linux />
    case 'darwin':
      return <MacOS />
    case 'win32':
    case 'windows':
      return <Windows />
    default:
      return <>&mdash;</>
  }
}

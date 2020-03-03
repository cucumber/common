import React from 'react'

export default React.createContext((data: string): string => {
  throw new Error(`No BtoaContext set. Cannot convert ${data} to Base64`)
})

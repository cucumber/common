import React from 'react'

export interface CustomRenderingSupport {
  DocString?: {
    docstring?: string
  }
}

export const CustomRenderingContext = React.createContext<CustomRenderingSupport>(
  {}
)

const CustomRendering: React.FunctionComponent<{
  support: CustomRenderingSupport
}> = (props) => {
  return (
    <CustomRenderingContext.Provider value={props.support}>
      {props.children}
    </CustomRenderingContext.Provider>
  )
}

export default CustomRendering

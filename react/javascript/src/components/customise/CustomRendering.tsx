import React from 'react'
import { messages } from '@cucumber/messages'

export declare type CustomRenderer<R, C> = React.FunctionComponent<R> | C

export interface DocStringProps {
  docString: messages.GherkinDocument.Feature.Step.IDocString
}

export interface DocStringClasses {
  docstring: string
}

export interface CustomRenderingSupport {
  DocString?: CustomRenderer<DocStringProps, DocStringClasses>
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

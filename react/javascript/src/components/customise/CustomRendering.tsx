import React from 'react'
import { messages } from '@cucumber/messages'

export function mixinStyles(
  builtIn: Record<string, string>,
  custom?: Record<string, string>
): Record<string, string> {
  const mixed: Record<string, string> = {}
  Object.keys(builtIn).forEach((key) => {
    if (builtIn[key]) {
      mixed[key] = builtIn[key]
    }
    if (custom && custom[key]) {
      mixed[key] = custom[key]
    }
  })
  return mixed
}

export declare type CustomRenderer<R, C> = React.FunctionComponent<R> | Partial<C>

export interface DocStringProps {
  docString: messages.GherkinDocument.Feature.Step.IDocString
}

export interface DocStringClasses {
  docstring: string
}

export interface TagsProps {
  tags: messages.GherkinDocument.Feature.ITag[]
}

export interface TagsClasses {
  tags: string
  tag: string
}

export interface GherkinDocumentListProps {
  gherkinDocuments?: ReadonlyArray<messages.IGherkinDocument>
}

export interface GherkinDocumentListClasses {
  list: string
  accordion: string
  accordionItem: string
  accordionButton: string
  accordionPanel: string
}

export interface CustomRenderingSupport {
  DocString?: CustomRenderer<DocStringProps, DocStringClasses>
  Tags?: CustomRenderer<TagsProps, TagsClasses>
  GherkinDocumentList?: CustomRenderer<GherkinDocumentListProps, GherkinDocumentListClasses>
}

export const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

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

import React, { useContext } from 'react'
import * as messages from '@cucumber/messages'

function mixinStyles<Classes>(
  builtIn: Record<string, string>,
  custom?: Record<string, string> | React.FunctionComponent
): Classes {
  const mixed: any = {}
  Object.keys(builtIn).forEach((key) => {
    if (builtIn[key]) {
      mixed[key] = builtIn[key]
    }
    if (custom && typeof custom !== 'function' && custom[key]) {
      mixed[key] = custom[key]
    }
  })
  return mixed as Classes
}

type Classes<C extends string> = Record<C,string>

export interface AnchorProps {
  id: string
}

export type AnchorClasses = Classes<'wrapper' | 'anchor'>

export interface AttachmentProps {
  attachment: messages.Attachment
}

export type AttachmentClasses = Classes<'text' | 'icon' | 'image'>

export interface DataTableProps {
  dataTable: messages.DataTable
}

export type DataTableClasses = Classes<'table'>

export interface DescriptionProps {
  description?: string
}

export type DescriptionClasses = Classes<'content'>

export interface DocStringProps {
  docString: messages.DocString
}

export type DocStringClasses = Classes<'docString'>

export interface ErrorMessageProps {
  message: string
}

export type ErrorMessageClasses = Classes<'message'>

export interface ExamplesTableProps {
  tableHeader: messages.TableRow
  tableBody: readonly messages.TableRow[]
}

export type ExamplesTableClasses = Classes<'examplesTable' | 'detailRow'>

export interface FeatureProps {
  feature: messages.Feature
}

export type FeatureClasses = Classes<'children'>

export type KeywordClasses = Classes<'keyword'>

export interface ParameterProps {
  parameterTypeName: string
}

export type ParameterClasses = Classes<'parameter'>

export interface StatusIconProps {
  status: messages.TestStepResultStatus
}

export type StatusIconClasses = Classes<'icon'>

export interface TagsProps {
  tags: readonly messages.Tag[]
}

export type TagsClasses = Classes<'tags' | 'tag'>

export declare type DefaultComponent<Props, Classes> = React.FunctionComponent<
  Props & { styles: Classes }
>

export declare type CustomisedComponent<Props, Classes> = React.FunctionComponent<
  Props & {
    styles: Classes
    DefaultRenderer: React.FunctionComponent<Props>
  }
>

export declare type Customised<Props, Classes> =
  | CustomisedComponent<Props, Classes>
  | Partial<Classes>

export interface CustomRenderingSupport {
  Anchor?: Customised<AnchorProps, AnchorClasses>
  Attachment?: Customised<AttachmentProps, AttachmentClasses>
  DataTable?: Customised<DataTableProps, DataTableClasses>
  Description?: Customised<DescriptionProps, DescriptionClasses>
  DocString?: Customised<DocStringProps, DocStringClasses>
  ErrorMessage?: Customised<ErrorMessageProps, ErrorMessageClasses>
  ExamplesTable?: Customised<ExamplesTableProps, ExamplesTableClasses>
  Feature?: Customised<FeatureProps, FeatureClasses>
  Keyword?: Customised<any, KeywordClasses>
  Parameter?: Customised<ParameterProps, ParameterClasses>
  StatusIcon?: Customised<StatusIconProps, StatusIconClasses>
  Tags?: Customised<TagsProps, TagsClasses>
}

export declare type CustomRenderable = keyof CustomRenderingSupport

export const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

export function useCustomRendering<Props, Classes>(
  component: CustomRenderable,
  defaultStyles: Record<string, string>,
  DefaultRenderer: DefaultComponent<Props, Classes>
): React.FunctionComponent<Props> {
  const { [component]: Custom } = useContext(CustomRenderingContext)
  const composedStyles = mixinStyles<Classes>(defaultStyles, Custom)
  const StyledDefaultRenderer: React.FunctionComponent<Props> = (props) => {
    return <DefaultRenderer {...props} styles={composedStyles} />
  }
  if (typeof Custom === 'function') {
    const StyledCustomRenderer: React.FunctionComponent<Props> = (props) => {
      return <Custom {...props} styles={composedStyles} DefaultRenderer={StyledDefaultRenderer} />
    }
    return StyledCustomRenderer
  }
  return StyledDefaultRenderer
}

export const CustomRendering: React.FunctionComponent<{
  support: CustomRenderingSupport
}> = (props) => {
  return (
    <CustomRenderingContext.Provider value={props.support}>
      {props.children}
    </CustomRenderingContext.Provider>
  )
}

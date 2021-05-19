import React, { useContext } from 'react'
import * as messages from '@cucumber/messages'

function mixinStyles<Classes>(
  builtIn: Record<string, string>,
  custom?: Record<string, string>
): Classes {
  const mixed: any = {}
  Object.keys(builtIn).forEach((key) => {
    if (builtIn[key]) {
      mixed[key] = builtIn[key]
    }
    if (custom && custom[key]) {
      mixed[key] = custom[key]
    }
  })
  return mixed as Classes
}

const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

export declare type CustomRenderer<R, C> = React.FunctionComponent<R> | Partial<C>

export interface KeywordClasses {
  keyword: string
}

export interface ParameterProps {
  parameterTypeName: string
}

export interface ParameterClasses {
  parameter: string
}

export interface DocStringProps {
  docString: messages.DocString
}

export interface DocStringClasses {
  docString: string
}

export interface DataTableProps {
  dataTable: messages.DataTable
}

export interface DataTableClasses {
  table: string
}

export interface ExamplesTableProps {
  tableHeader: messages.TableRow
  tableBody: readonly messages.TableRow[]
}

export interface ExamplesTableClasses {
  examplesTable: string
  exampleDetail: string
}

export interface TagsProps {
  tags: readonly messages.Tag[]
}

export interface TagsClasses {
  tags: string
  tag: string
}

export interface AttachmentProps {
  attachment: messages.Attachment
}

export interface AttachmentClasses {
  text: string
  icon: string
  image: string
}

export interface StatusIconProps {
  status: messages.TestStepResultStatus
}

export interface StatusIconClasses {
  icon: string
}

export interface ErrorMessageProps {
  message: string
}

export interface ErrorMessageClasses {
  message: string
}

export declare type CustomRenderable = keyof CustomRenderingSupport

export interface CustomRenderingSupport {
  Keyword?: CustomRenderer<any, KeywordClasses>
  Parameter?: CustomRenderer<ParameterProps, ParameterClasses>
  DocString?: CustomRenderer<DocStringProps, DocStringClasses>
  DataTable?: CustomRenderer<DataTableProps, DataTableClasses>
  ExamplesTable?: CustomRenderer<ExamplesTableProps, ExamplesTableClasses>
  Tags?: CustomRenderer<TagsProps, TagsClasses>
  Attachment?: CustomRenderer<AttachmentProps, AttachmentClasses>
  StatusIcon?: CustomRenderer<StatusIconProps, StatusIconClasses>
  ErrorMessage?: CustomRenderer<ErrorMessageProps, ErrorMessageClasses>
}

export function useCustomRendering<Props, Classes>(
  component: CustomRenderable,
  styles: Record<string, string>
): CustomRenderer<Props, Classes> {
  const { [component]: Custom } = useContext(CustomRenderingContext)
  if (typeof Custom === 'function') {
    return Custom as React.FunctionComponent<Props>
  }
  return mixinStyles<Classes>(styles, Custom)
}

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

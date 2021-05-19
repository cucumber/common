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

export interface AttachmentProps {
  attachment: messages.Attachment
}

export interface AttachmentClasses {
  text: string
  icon: string
  image: string
}

export interface DataTableProps {
  dataTable: messages.DataTable
}

export interface DataTableClasses {
  table: string
}

export interface DescriptionProps {
  description?: string
}

export interface DescriptionClasses {
  content: string
}

export interface DocStringProps {
  docString: messages.DocString
}

export interface DocStringClasses {
  docString: string
}

export interface ErrorMessageProps {
  message: string
}

export interface ErrorMessageClasses {
  message: string
}

export interface ExamplesTableProps {
  tableHeader: messages.TableRow
  tableBody: readonly messages.TableRow[]
}

export interface ExamplesTableClasses {
  examplesTable: string
  detailRow: string
}

export interface KeywordClasses {
  keyword: string
}

export interface ParameterProps {
  parameterTypeName: string
}

export interface ParameterClasses {
  parameter: string
}

export interface StatusIconProps {
  status: messages.TestStepResultStatus
}

export interface StatusIconClasses {
  icon: string
}

export interface TagsProps {
  tags: readonly messages.Tag[]
}

export interface TagsClasses {
  tags: string
  tag: string
}

export declare type CustomRenderer<R, C> = React.FunctionComponent<R> | Partial<C>

export interface CustomRenderingSupport {
  Attachment?: CustomRenderer<AttachmentProps, AttachmentClasses>
  DataTable?: CustomRenderer<DataTableProps, DataTableClasses>
  Description?: CustomRenderer<DescriptionProps, DescriptionClasses>
  DocString?: CustomRenderer<DocStringProps, DocStringClasses>
  ErrorMessage?: CustomRenderer<ErrorMessageProps, ErrorMessageClasses>
  ExamplesTable?: CustomRenderer<ExamplesTableProps, ExamplesTableClasses>
  Keyword?: CustomRenderer<any, KeywordClasses>
  Parameter?: CustomRenderer<ParameterProps, ParameterClasses>
  StatusIcon?: CustomRenderer<StatusIconProps, StatusIconClasses>
  Tags?: CustomRenderer<TagsProps, TagsClasses>
}

export declare type CustomRenderable = keyof CustomRenderingSupport

const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

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

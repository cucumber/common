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
  Attachment?: Customised<AttachmentProps, AttachmentClasses>
  DataTable?: Customised<DataTableProps, DataTableClasses>
  Description?: Customised<DescriptionProps, DescriptionClasses>
  DocString?: Customised<DocStringProps, DocStringClasses>
  ErrorMessage?: Customised<ErrorMessageProps, ErrorMessageClasses>
  ExamplesTable?: Customised<ExamplesTableProps, ExamplesTableClasses>
  Keyword?: Customised<any, KeywordClasses>
  Parameter?: Customised<ParameterProps, ParameterClasses>
  StatusIcon?: Customised<StatusIconProps, StatusIconClasses>
  Tags?: Customised<TagsProps, TagsClasses>
}

export declare type CustomRenderable = keyof CustomRenderingSupport

const CustomRenderingContext = React.createContext<CustomRenderingSupport>({})

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

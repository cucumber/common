import * as React from "react"

interface IProps {
  children?: string | null
}

const Keyword: React.FunctionComponent<IProps> = ({children}) => {
  return children ? <span>{children}</span> : null
}

export default Keyword

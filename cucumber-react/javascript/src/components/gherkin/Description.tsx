import * as React from "react"

interface IProps {
  description?: string | null
}

const Description: React.FunctionComponent<IProps> = ({description}) => {
  return description ? <p>{description}</p> : null
}

export default Description

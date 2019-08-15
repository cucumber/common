import * as React from "react"

interface IProps {
  description: string
}

const Description: React.FunctionComponent<IProps> = ({description}) => {
  return <p>{description}</p>
}

export default Description

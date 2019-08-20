import { messages } from 'cucumber-messages'
import { OnSelectionListener } from 'react-sidenav/types'
import React from 'react'
import { Nav, NavContext, SideNav } from 'react-sidenav'
import styled from 'styled-components'

interface GherkinDocumentItemDivProps {
  selected: boolean
}

const GherkinDocumentItemDiv = styled.div`
  color: ${(props: GherkinDocumentItemDivProps) =>
    props.selected ? 'yellow' : 'inmherit'};
  padding: 8px 12px;
  cursor: pointer;
  :hover {
    color: yellow;
  }
`

const GherkinDocumentItem = (props: any) => {
  const context = React.useContext(NavContext)
  return (
    <GherkinDocumentItemDiv selected={context.selected}>
      {props.children}
    </GherkinDocumentItemDiv>
  )
}

interface IGherkinDocumentNavProps {
  gherkinDocuments: messages.IGherkinDocument[]
  selectedUri: string
  onSelection: OnSelectionListener
}

const GherkinDocumentSideNav: React.FunctionComponent<
  IGherkinDocumentNavProps
> = ({ gherkinDocuments, selectedUri, onSelection }) => {
  return (
    <SideNav defaultSelectedPath={selectedUri} onSelection={onSelection}>
      {gherkinDocuments.map(gherkinDocument => (
        <Nav id={gherkinDocument.uri}>
          <GherkinDocumentItem key={gherkinDocument.uri}>
            {gherkinDocument.uri}
          </GherkinDocumentItem>
        </Nav>
      ))}
    </SideNav>
  )
}

export default GherkinDocumentSideNav

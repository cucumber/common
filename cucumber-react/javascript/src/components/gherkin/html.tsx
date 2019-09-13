import styled from 'styled-components'

const H1 = styled.h1`
  margin: 0.1em;
`

const H2 = styled.h2`
  margin: 0.1em;
`

const H3 = styled.h3`
  margin: 0.1em;
`

const Indent = styled.div`
  margin-left: 1em;
`

const Ol = styled.ol`
  list-style-type: none;
  padding-left: 0;
`

const StepText = styled.span`
  font-weight: normal;
`

const StepParam = styled.span`
  font-weight: normal;
  font-style: italic;
  color: #072a80;
`

const Section = styled.section`
  margin-bottom: 1em;
`

const Table = styled.table`
  border: 1px solid black;
  border-collapse: collapse;
`

const Th = styled.th`
  border: 1px solid black;
  padding: 0.3em;
`

// Lifted from cucumber-expressions/javascript/src/ParameterTypeRegistry#FLOAT_REGEXP
const numberPattern = /(?=.*\d.*)[-+]?\d*(?:\.(?=\d.*))?\d*(?:\d+[E][+\-]?\d+)?/

const Td = styled.td`
  border: 1px solid black;
  padding: 0.3em;
  text-align: ${(props) => {
  return (props.children as string).match(numberPattern) ? 'right' : 'left'
}};
`

export { H1, H2, H3, Indent, Ol, StepParam, StepText, Section, Table, Th, Td }

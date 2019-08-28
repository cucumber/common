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

const PlainWeightSpan = styled.span`
  font-weight: normal;
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

const Td = styled.td`
  border: 1px solid black;
  padding: 0.3em;
`

export { H1, H2, H3, Indent, Ol, PlainWeightSpan, Section, Table, Th, Td }

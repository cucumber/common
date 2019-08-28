import {
  Accordion as _Accordion,
  AccordionItem as _AccordionItem,
  AccordionItemButton as _AccordionItemButton,
  AccordionItemHeading as _AccordionItemHeading,
  AccordionItemPanel as _AccordionItemPanel,
} from 'react-accessible-accordion'
import styled from 'styled-components'
import { messages } from 'cucumber-messages'
import statusColor from '../gherkin/statusColor'

const Accordion = styled(_Accordion)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

const AccordionItem = styled(_AccordionItem)`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

interface IAccordionItemButtonProps {
  status: messages.TestResult.Status
}

const AccordionItemButton = styled(_AccordionItemButton)`
  background-color: ${(props: IAccordionItemButtonProps) => statusColor(props.status).hex()};
  cursor: pointer;
  padding: 10px;
  text-align: left;
  border: none;
  
  &:hover {
    background-color: ${(props: IAccordionItemButtonProps) => statusColor(props.status).darken(0.1).hex()};
  }
  
  &:before {
    display: inline-block;
    content: '';
    height: 6px;
    width: 6px;
    margin-right: 12px;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(-45deg);
  }
  
  &[aria-expanded=true]:before {
    transform: rotate(45deg);
  }
`

const AccordionItemHeading = styled(_AccordionItemHeading)`
`

const AccordionItemPanel = styled(_AccordionItemPanel)`
  padding: 20px;
  animation: fadein 0.35s ease-in;
`

export {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
}

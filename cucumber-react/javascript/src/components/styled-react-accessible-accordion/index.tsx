import {
  Accordion as _Accordion,
  AccordionItem as _AccordionItem,
  AccordionItemButton as _AccordionItemButton,
  AccordionItemHeading as _AccordionItemHeading,
  AccordionItemPanel as _AccordionItemPanel,
} from 'react-accessible-accordion'
import styled from 'styled-components'

const Accordion = styled(_Accordion)`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
`

const AccordionItem = styled(_AccordionItem)`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const AccordionItemButton = styled(_AccordionItemButton)`
  background-color: #f4f4f4;
  color: #444;
  cursor: pointer;
  padding: 18px;
  //width: 100%;
  text-align: left;
  border: none;
  
  &:hover {
    background-color: #ddd;
  }
  
  &:before {
    display: inline-block;
    content: '';
    height: 10px;
    width: 10px;
    margin-right: 12px;
    border-bottom: 2px solid currentColor;
    border-right: 2px solid currentColor;
    transform: rotate(-45deg);
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

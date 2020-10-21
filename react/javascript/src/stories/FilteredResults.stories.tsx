import { messages } from "@cucumber/messages";
import { Meta, Story } from "@storybook/react";
import React from "react";
import attachments from "../../acceptance/attachments/attachments";
import FilteredResults from "../components/app/FilteredResults";
import QueriesWrapper from "../components/app/QueriesWrapper";
import queries from "./queries";

export default {
  title: 'FilteredResults',
  component: FilteredResults,
} as Meta

type TemplateArgs = { envelopes: readonly messages.IEnvelope[] }

const Template: Story<TemplateArgs> = ({ envelopes }) => (
  <QueriesWrapper {...queries(envelopes)}>
    <FilteredResults />
  </QueriesWrapper>
)

export const Attachments = Template.bind({})
Attachments.args = {
  envelopes: attachments,
}

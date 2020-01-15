import React from 'react';
import { messages } from 'cucumber-messages';
import ITag = messages.GherkinDocument.Feature.ITag;
interface IProps {
    tags: ITag[];
}
declare const Tags: React.FunctionComponent<IProps>;
export default Tags;

import React from 'react';
import { messages } from 'cucumber-messages';
import IBackground = messages.GherkinDocument.Feature.IBackground;
interface IProps {
    background: IBackground;
}
declare const Background: React.FunctionComponent<IProps>;
export default Background;

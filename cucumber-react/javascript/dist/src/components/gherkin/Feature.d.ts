import React from 'react';
import { messages } from 'cucumber-messages';
import IFeature = messages.GherkinDocument.IFeature;
interface IProps {
    feature: IFeature;
}
declare const Feature: React.FunctionComponent<IProps>;
export default Feature;

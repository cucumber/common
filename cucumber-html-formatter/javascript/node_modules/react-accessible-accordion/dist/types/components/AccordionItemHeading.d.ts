import * as React from 'react';
import { DivAttributes } from '../helpers/types';
declare type Props = DivAttributes;
declare const defaultProps: {
    className: string;
    'aria-level': number;
};
export declare const SPEC_ERROR = "AccordionItemButton may contain only one child element, which must be an instance of AccordionItemButton.\n\nFrom the WAI-ARIA spec (https://www.w3.org/TR/wai-aria-practices-1.1/#accordion):\n\n\u201CThe button element is the only element inside the heading element. That is, if there are other visually persistent elements, they are not included inside the heading element.\u201D\n\n";
export declare class AccordionItemHeading extends React.PureComponent<Props> {
    static defaultProps: typeof defaultProps;
    ref: HTMLDivElement | undefined;
    static VALIDATE(ref: HTMLDivElement | undefined): void | never;
    setRef: (ref: HTMLDivElement) => void;
    componentDidUpdate(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
declare const AccordionItemHeadingWrapper: React.SFC<DivAttributes>;
export default AccordionItemHeadingWrapper;

import "prosemirror-view/style/prosemirror.css";
import "prosemirror-example-setup/style/style.css";
import "prosemirror-menu/style/menu.css";

import React from "react";
import {ProseMirror, useProseMirror} from "use-prosemirror";
import {defaultMarkdownParser, schema} from "prosemirror-markdown"
// @ts-ignore
import {exampleSetup} from "prosemirror-example-setup"

const MarkdownEditor: React.FunctionComponent<{ content: string }> = ({content}) => {
  const [state, setState] = useProseMirror({
    doc: defaultMarkdownParser.parse(content),
    plugins: exampleSetup({schema})
  });
  return (
    <ProseMirror
      // className="ProseMirror"
      state={state}
      onChange={setState}
    />
  );
}

export default MarkdownEditor
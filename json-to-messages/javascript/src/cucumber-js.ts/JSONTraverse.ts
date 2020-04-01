import { IDocString } from "./JSONSchema";
import IAstMaker from "../IAstMaker";
import { messages } from "@cucumber/messages";

export function traverseDocString(
  docString: IDocString,
  astMaker: IAstMaker
): messages.GherkinDocument.Feature.Step.IDocString {
  return astMaker.makeDocstring(null, docString.content)
}

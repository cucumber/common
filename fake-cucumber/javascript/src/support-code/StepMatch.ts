import IStepMatch from "./IStepMatch";
import { messages } from "cucumber-messages";

export default class StepMatch implements IStepMatch {
  constructor(
    public readonly stepDefinitionId: string,
    public readonly args: messages.IStepMatchArgument[]
  ) {}
}
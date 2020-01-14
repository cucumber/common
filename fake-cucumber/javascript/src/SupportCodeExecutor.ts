import { Argument, Group } from '@cucumber/cucumber-expressions'
import { messages } from '@cucumber/messages'
import IWorld from './IWorld'
import { AnyBody } from './types'
import DataTable from './DataTable'

export default class SupportCodeExecutor {
  constructor(
    public readonly stepDefinitionId: string,
    private readonly body: AnyBody,
    private readonly args: Array<Argument<any>>,
    private readonly docString: messages.PickleStepArgument.IPickleDocString,
    private readonly dataTable: messages.PickleStepArgument.IPickleTable
  ) {}

  public execute(thisObj: IWorld): any {
    const argArray = this.args.map(arg => arg.getValue(thisObj))
    if (this.docString) {
      // TODO: Hand off to DocStringTransformer
      argArray.push(this.docString.content)
    }
    if (this.dataTable) {
      argArray.push(
        new DataTable(this.dataTable.rows.map(r => r.cells.map(c => c.value)))
      )
    }
    return this.body.apply(thisObj, argArray)
  }

  public argsToMessages(): messages.IStepMatchArgument[] {
    return this.args.map(arg => {
      return new messages.StepMatchArgument({
        group: toMessageGroup(arg.group),
        parameterTypeName: arg.parameterType.name,
      })
    })
  }
}

function toMessageGroup(group: Group): messages.StepMatchArgument.IGroup {
  return new messages.StepMatchArgument.Group({
    value: group.value,
    start: group.start,
    children: group.children.map(g => toMessageGroup(g)),
  })
}

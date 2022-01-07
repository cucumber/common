import { Argument, Group } from '@cucumber/cucumber-expressions'
import * as messages from '@cucumber/messages'
import { AnyBody, ISupportCodeExecutor, IWorld } from './types'
import DataTable from './DataTable'

export default class SupportCodeExecutor implements ISupportCodeExecutor {
  constructor(
    public readonly stepDefinitionId: string,
    private readonly body: AnyBody,
    private readonly args: readonly Argument[],
    private readonly docString: messages.PickleDocString,
    private readonly dataTable: messages.PickleTable
  ) {}

  public execute(thisObj: IWorld): any {
    const argArray = this.args.map((arg) => arg.getValue(thisObj))
    if (this.docString) {
      // TODO: Hand off to DocStringTransformer
      argArray.push(this.docString.content)
    }
    if (this.dataTable) {
      argArray.push(new DataTable(this.dataTable.rows.map((r) => r.cells.map((c) => c.value))))
    }
    return this.body.apply(thisObj, argArray)
  }

  public argsToMessages(): messages.StepMatchArgument[] {
    return this.args.map((arg) => {
      return {
        group: toMessageGroup(arg.group),
        parameterTypeName: arg.parameterType.name,
      }
    })
  }
}

function toMessageGroup(group: Group): messages.Group {
  return {
    value: group.value,
    start: group.start,
    children: group.children.map((g) => toMessageGroup(g)),
  }
}

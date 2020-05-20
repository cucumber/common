import { EnvelopeListener } from './types'

export default interface ITestPlan {
  execute(listener: EnvelopeListener): Promise<void>
}

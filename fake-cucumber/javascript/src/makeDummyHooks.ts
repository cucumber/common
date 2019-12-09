import SupportCode from './SupportCode'

export default function makeDummyStepDefinitions(
  supportCode: SupportCode
): void {
  const { Before, After } = supportCode

  Before('@before-passed', () => {
    // no-op
  })

  Before('@before-failed', () => {
    throw new Error('Something went wrong in before hook')
  })

  After('@after-passed', () => {
    // no-op
  })

  After('@after-failed', () => {
    throw new Error('Something went wrong in after hook')
  })
}

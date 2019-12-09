import SupportCode from './SupportCode'

export default function makeDummyStepDefinitions(
  supportCode: SupportCode
): void {
  const { Before, After } = supportCode

  Before('@before-passed', () => {})

  Before('@before-failed', () => {
    throw new Error('Something went wrong in before hook')
  })

  After('@after-passed', () => {})

  After('@after-failed', () => {
    throw new Error('Something went wrong in after hook')
  })
}

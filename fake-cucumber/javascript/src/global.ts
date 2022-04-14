import SupportCode from './SupportCode'

declare global {
  // var and not let or const in the following line because let or const do not work in global scope
  // eslint-disable-next-line no-var
  var supportCode: SupportCode
}

export {}

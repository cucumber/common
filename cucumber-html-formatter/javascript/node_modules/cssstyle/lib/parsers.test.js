'use strict';

const parsers = require('./parsers');

describe('valueType', () => {
  it('returns color for red', () => {
    let input = 'red';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for #nnnnnn', () => {
    let input = '#fefefe';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgb(n, n, n)', () => {
    let input = 'rgb(10, 10, 10)';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgb(p, p, p)', () => {
    let input = 'rgb(10%, 10%, 10%)';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(n, n, n, n)', () => {
    let input = 'rgba(10, 10, 10, 1)';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });

  it('returns color for rgba(p, p, p, n)', () => {
    let input = 'rgba(10%, 10%, 10%, 1)';
    let output = parsers.valueType(input);

    expect(output).toEqual(parsers.TYPES.COLOR);
  });
});
describe('parseInteger', () => {
  it.todo('test');
});
describe('parseNumber', () => {
  it.todo('test');
});
describe('parseLength', () => {
  it.todo('test');
});
describe('parsePercent', () => {
  it.todo('test');
});
describe('parseMeasurement', () => {
  it.todo('test');
});
describe('parseUrl', () => {
  it.todo('test');
});
describe('parseString', () => {
  it.todo('test');
});
describe('parseColor', () => {
  it.todo('test');
});
describe('parseAngle', () => {
  it.todo('test');
});
describe('parseKeyword', () => {
  it.todo('test');
});
describe('dashedToCamelCase', () => {
  it.todo('test');
});
describe('shorthandParser', () => {
  it.todo('test');
});
describe('shorthandSetter', () => {
  it.todo('test');
});
describe('shorthandGetter', () => {
  it.todo('test');
});
describe('implicitSetter', () => {
  it.todo('test');
});
describe('subImplicitSetter', () => {
  it.todo('test');
});
describe('camelToDashed', () => {
  it.todo('test');
});

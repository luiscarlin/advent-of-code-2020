import { calculatorWrapper } from './18';

describe('calculator', () => {
  it('1 + 2 * 3 + 4 * 5 + 6 returns 71', () => {
    expect(calculatorWrapper('1 + 2 * 3 + 4 * 5 + 6')).toEqual(71);
  });

  it('2 * 3 + (4 * 5) returns 26', () => {
    expect(calculatorWrapper('2 * 3 + (4 * 5)')).toEqual(26);
  });

  it('5 + (8 * 3 + 9 + 3 * 4 * 3) returns 437', () => {
    expect(calculatorWrapper('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toEqual(437);
  });

  it('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) returns 12240', () => {
    expect(
      calculatorWrapper('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')
    ).toEqual(12240);
  });

  it.only('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 returns 13632', () => {
    expect(
      calculatorWrapper('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')
    ).toEqual(13632);
  });
});

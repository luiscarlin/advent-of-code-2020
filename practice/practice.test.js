import { calculateFuel } from './practice';

describe('practice', () => {
  it('14 returns 2', () => {
    expect(calculateFuel(14)).toEqual(2);
  });

  it('1969 returns 966', () => {
    expect(calculateFuel(1969)).toEqual(966);
  });

  it('100756 returns 50346', () => {
    expect(calculateFuel(100756)).toEqual(50346);
  });
});

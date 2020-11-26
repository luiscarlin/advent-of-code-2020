import { calculateFuelRecursive } from './practice';

describe('practice', () => {
  describe('calculateFuelRecursive', () => {
    it('14 returns 2', () => {
      expect(calculateFuelRecursive(14)).toEqual(2);
    });

    it('1969 returns 966', () => {
      expect(calculateFuelRecursive(1969)).toEqual(966);
    });

    it('100756 returns 50346', () => {
      expect(calculateFuelRecursive(100756)).toEqual(50346);
    });
  });
});

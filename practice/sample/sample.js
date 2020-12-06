import fs from 'fs';
import _ from 'lodash';

const calculateFuelRecursive = (num) => {
  const nextNum = Math.floor(num / 3) - 2;

  if (nextNum < 0) {
    return 0;
  }
  return calculateFuelRecursive(nextNum) + nextNum;
};

const nums = fs
  .readFileSync(`./practice/sample/sample.in`, 'utf8')
  .split('\n')
  .map(Number);

console.log('part 1', _.sum(nums.map((num) => Math.floor(num / 3) - 2)));
console.log('part 2', _.sum(nums.map(calculateFuelRecursive)));

export { calculateFuelRecursive };

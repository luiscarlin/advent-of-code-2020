import fs from 'fs';
import _ from 'lodash';

const calculateFuel = (num) => {
  const nextNum = Math.floor(num / 3) - 2;

  if (nextNum < 0) {
    return 0;
  }
  return calculateFuel(nextNum) + nextNum;
};

const lines = fs
  .readFileSync(`./practice/practice.in`, 'utf8')
  .split('\n')
  .map(Number)
  .map((num) => Math.floor(num / 3) - 2);

console.log('part 1', _.sum(lines));

const lines2 = fs
  .readFileSync(`./practice/practice.in`, 'utf8')
  .split('\n')
  .map(Number)
  .map(calculateFuel);

console.log('part 2', _.sum(lines2));

export { calculateFuel };

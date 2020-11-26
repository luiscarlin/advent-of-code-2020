import fs from 'fs';
import _ from 'lodash';

const lines = fs
  .readFileSync(`./practice/practice.in`, 'utf8')
  .split('\n')
  .map(Number)
  .map((num) => Math.floor(num / 3) - 2);

console.log('part 1', _.sum(lines));

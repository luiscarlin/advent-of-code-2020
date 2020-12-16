import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const lines = fs.readFileSync('./day-16/16.in', 'utf8').split('\n\n');

  const ranges = [];

  lines[0]
    .split('\n')
    .map((l) => l.split(' '))
    .forEach((l) => {
      const [from1, to1] = l[l.length - 3].split('-').map(Number);
      const [from2, to2] = l[l.length - 1].split('-').map(Number);

      for (let val of _.range(from1, to1 + 1)) {
        ranges.push(val);
      }

      for (let val of _.range(from2, to2 + 1)) {
        ranges.push(val);
      }
    });

  const otherTickets = lines[2]
    .split('\n')
    .slice(1)
    .map((line) => line.split(',').map(Number));

  let invalidSum = 0;

  otherTickets.forEach((ticket) => {
    ticket.forEach((num) => {
      if (!ranges.includes(num)) {
        invalidSum += num;
      }
    });
  });

  return invalidSum;
};

console.log('part 1', part1());

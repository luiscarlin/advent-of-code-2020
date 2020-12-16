import fs from 'fs';
import _ from 'lodash';

const getRanges = (lines) => {
  const ranges = [];

  lines
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

  return [...ranges];
};

const part1 = () => {
  const lines = fs.readFileSync('./day-16/16.in', 'utf8').split('\n\n');
  const ranges = getRanges(lines[0]);

  const otherTickets = lines[2]
    .split('\n')
    .slice(1)
    .map((line) => line.split(',').map(Number));

  let invalidSum = 0;

  const valid = [];

  otherTickets.forEach((ticket) => {
    let ticketIsValid = true;

    ticket.forEach((num) => {
      if (!ranges.includes(num)) {
        invalidSum += num;
        ticketIsValid = false;
      }
    });

    if (ticketIsValid) {
      valid.push(ticket);
    }
  });

  return { invalidSum, valid };
};

const part2 = () => {
  const lines = fs.readFileSync('./day-16/16.in', 'utf8').split('\n\n');

  const rules = {};

  lines[0]
    .split('\n')
    .map((l) => l.split(':').map((item) => item.trim()))
    .forEach(([field, vals]) => {
      const [[from1, to1], [from2, to2]] = vals
        .split(' or ')
        .map((item) => item.split('-').map(Number));

      rules[field] = {
        from1,
        to1,
        from2,
        to2,
      };
    });

  const { valid } = part1();

  const possible = {};

  for (let num of _.range(valid[0].length)) {
    for (let rule of Object.keys(rules)) {
      let isValidRule = true;

      for (let ticket of _.range(valid.length)) {
        const { from1, to1, from2, to2 } = rules[rule];

        if (
          !(
            (from1 <= valid[ticket][num] && valid[ticket][num] <= to1) ||
            (from2 <= valid[ticket][num] && valid[ticket][num] <= to2)
          )
        ) {
          isValidRule = false;
          break;
        }
      }

      if (isValidRule) {
        possible[num] ? possible[num].push(rule) : (possible[num] = [rule]);
      }
    }
  }

  const taken = new Array(20).fill(0);

  let prevLength = taken.filter((i) => i !== 0).length;

  while (prevLength !== 20) {
    let assigned = '';
    for (let [index, possibilities] of Object.entries(possible)) {
      if (possibilities.length == 1) {
        assigned = possibilities[0];
        taken[index] = assigned;
        break;
      }
    }

    for (let index of Object.keys(possible)) {
      _.remove(possible[index], (a) => a === assigned);
    }
    if (prevLength == taken.filter((i) => i !== 0).length) {
      break;
    } else {
      prevLength = taken.filter((i) => i !== 0).length;
    }
  }

  const myTicket = lines[1].split('\n')[1].split(',');

  let prod = 1;

  for (let i of _.range(20)) {
    if (taken[i].includes('departure')) {
      prod *= myTicket[i];
    }
  }

  return prod;
};

console.log('part 1', part1().invalidSum);
console.log('part 2', part2());

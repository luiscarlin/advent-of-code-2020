import fs from 'fs';
import _ from 'lodash';

const count = (str, ch) => _.sumBy(str, (x) => x === ch);

const part1 = () => {
  const lines = fs.readFileSync('./day-02/2.in', 'utf8').split('\n');

  let validPasswords = 0;

  lines.forEach((line) => {
    const [policy, letterWithColon, pass] = line.split(' ');
    const [min, max] = policy.split('-');
    const letter = letterWithColon[0];

    const timesLetterRepeats = count(pass, letter);

    if (timesLetterRepeats >= min && timesLetterRepeats <= max) {
      validPasswords += 1;
    }
  });

  return validPasswords;
};

const part2 = () => {
  const lines = fs.readFileSync('./day-02/2.in', 'utf8').split('\n');

  let validPasswords = 0;

  lines.forEach((line) => {
    const [policy, letterWithColon, pass] = line.split(' ');
    const [min, max] = policy.split('-').map(Number);
    const letter = letterWithColon[0];

    const firstChar = pass[min - 1];
    const secondChar = pass[max - 1];

    if ((firstChar === letter) ^ (secondChar === letter)) {
      validPasswords += 1;
    }
  });

  return validPasswords;
};

console.log('part 1', part1());
console.log('part 2', part2());

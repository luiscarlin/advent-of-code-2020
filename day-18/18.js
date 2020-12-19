import fs from 'fs';

const lines = fs
  .readFileSync('./day-18/18.in', 'utf8')
  .split('\n')
  .map((line) => line.replaceAll('(', '( '))
  .map((line) => line.replaceAll(')', ' )'))
  .map((line) => line.split(' '));

export const calculatorWrapper = (line) => {
  line = line.replaceAll('(', '( ');
  line = line.replaceAll(')', ' )');
  line = line.split(' ');

  return calculatorp1(line);
};

const calculatorp1 = (line) => {
  while (line.includes('(')) {
    const from = line.indexOf('(');
    let to = 0;

    let n = 0;
    for (let i = from + 1; i < line.length; i += 1) {
      if (line[i] === '(') {
        n += 1;
      }
      if (line[i] === ')') {
        if (n > 0) {
          n -= 1;
        } else {
          to = i;
          break;
        }
      }
    }

    if (to === 0) {
      console.error('could not find closing )');
      exit(1);
    }

    const inside = line.slice(from, to + 1).slice(1, -1);

    const answer = calculatorp1(inside);

    line.splice(from, to - from + 1, answer);
  }

  let acc = Number(line.shift());

  while (line.includes('+') || line.includes('*')) {
    const operation = line.shift();
    const second = Number(line.shift());

    if (operation === '+') {
      acc = acc + second;
    } else if (operation === '*') {
      acc = acc * second;
    } else {
      console.error('operation was', operation);
      exit(1);
    }
  }

  return acc;
};

const calculatorp2 = (line) => {
  while (line.includes('(')) {
    const from = line.indexOf('(');
    let to = 0;

    let n = 0;
    for (let i = from + 1; i < line.length; i += 1) {
      if (line[i] === '(') {
        n += 1;
      }
      if (line[i] === ')') {
        if (n > 0) {
          n -= 1;
        } else {
          to = i;
          break;
        }
      }
    }

    if (to === 0) {
      console.error('could not find closing )');
      exit(1);
    }

    const inside = line.slice(from, to + 1).slice(1, -1);
    const answer = calculatorp2(inside);

    line.splice(from, to - from + 1, answer);
  }

  while (line.includes('+')) {
    const opIndex = line.indexOf('+');

    const first = Number(line[opIndex - 1]);
    const second = Number(line[opIndex + 1]);

    line.splice(opIndex - 1, 3, first + second);
  }

  while (line.includes('*')) {
    const opIndex = line.indexOf('*');

    const first = Number(line[opIndex - 1]);
    const second = Number(line[opIndex + 1]);

    line.splice(opIndex - 1, 3, first * second);
  }

  return line[0];
};

const part1 = () => {
  let sum = 0;
  for (let line of lines) {
    sum += calculatorp1([...line]);
  }
  return sum;
};

const part2 = () => {
  let sum = 0;
  for (let line of lines) {
    sum += calculatorp2([...line]);
  }
  return sum;
};

console.log('part 1', part1());
console.log('part 2', part2());

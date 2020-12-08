import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const instr = fs
    .readFileSync('./day-08/8.in', 'utf8')
    .split('\n')
    .map((a) => a.split(' '));

  let acc = 0;
  let pointer = 0;

  let indexSeen = [];

  while (true) {
    if (indexSeen.includes(pointer)) {
      break;
    } else {
      indexSeen.push(pointer);
    }

    const [op, arg] = instr[pointer];

    if (op === 'acc') {
      acc += Number(arg);

      pointer += 1;
    } else if (op === 'jmp') {
      pointer += Number(arg);
    } else {
      pointer += 1;
    }
  }

  return acc;
};

const part2 = () => {
  const instr = fs
    .readFileSync('./day-08/8.in', 'utf8')
    .split('\n')
    .map((a) => a.split(' '));

  const run = (instr) => {
    let acc = 0;
    let pointer = 0;

    let indexSeen = [];

    while (true) {
      if (indexSeen.includes(pointer)) {
        return { success: false };
      } else {
        indexSeen.push(pointer);
      }

      if (pointer === instr.length) {
        return { success: true, acc: acc };
      }

      const [op, arg] = instr[pointer];

      if (op === 'acc') {
        acc += Number(arg);

        pointer += 1;
      } else if (op === 'jmp') {
        pointer += Number(arg);
      } else {
        pointer += 1;
      }
    }
  };

  const indexes = _.keys(_.pickBy(instr, (item) => item[0] === 'jmp'));

  while (true) {
    for (let index of indexes) {
      const newInstr = [...instr];
      newInstr[index] = 'nop';
      const answer = run(newInstr);

      if (answer.success) {
        return answer.acc;
      }
    }
  }
};

console.log('part 1', part1());
console.log('part 2', part2());

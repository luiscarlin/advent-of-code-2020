import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const lines = fs.readFileSync('./day-12/12.in', 'utf8').split('\n');

  let x = 0;
  let y = 0;

  // E
  let dir = 1;

  // N=0, E=1, S=2, W=3
  const unitVectorX = [0, 1, 0, -1];
  const unitVectorY = [1, 0, -1, 0];

  for (let line of lines) {
    const instr = line[0];
    const amount = +line.slice(1);

    if (instr === 'N') {
      y += amount;
    } else if (instr === 'S') {
      y -= amount;
    } else if (instr === 'W') {
      x -= amount;
    } else if (instr === 'E') {
      x += amount;
    } else if (instr === 'F') {
      x += unitVectorX[dir] * amount;
      y += unitVectorY[dir] * amount;
    } else if (instr === 'L') {
      for (let i of _.range(amount / 90)) {
        dir = (dir + 3) % 4;
      }
    } else if (instr === 'R') {
      for (let i of _.range(amount / 90)) {
        dir = (dir + 1) % 4;
      }
    } else {
      console.error('how did you get here!?');
      break;
    }
  }

  return Math.abs(x) + Math.abs(y);
};

const part2 = () => {
  const lines = fs.readFileSync('./day-12/12.in', 'utf8').split('\n');

  let wx = 10;
  let wy = 1;
  let x = 0;
  let y = 0;

  for (let line of lines) {
    const instr = line[0];
    const amount = +line.slice(1);

    if (instr === 'N') {
      wy += amount;
    } else if (instr === 'S') {
      wy -= amount;
    } else if (instr === 'E') {
      wx += amount;
    } else if (instr === 'W') {
      wx -= amount;
    } else if (instr === 'F') {
      x += amount * wx;
      y += amount * wy;
    } else if (instr === 'L') {
      for (let i of _.range(amount / 90)) {
        [wx, wy] = [-wy, wx];
      }
    } else if (instr === 'R') {
      for (let i of _.range(amount / 90)) {
        [wx, wy] = [wy, -wx];
      }
    }
  }

  return Math.abs(x) + Math.abs(y);
};

console.log('part 1', part1());
console.log('part 2', part2());

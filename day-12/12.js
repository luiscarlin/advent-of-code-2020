import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const lines = fs.readFileSync('./day-12/12.in', 'utf8').split('\n');

  let x = 0;
  let y = 0;
  let dir = 'E';

  const coord = ['N', 'E', 'S', 'W'];

  for (let i of lines) {
    const direction = i[0];
    const amount = +i.slice(1);

    if (direction === 'N') {
      y += amount;
    }

    if (direction === 'S') {
      y -= amount;
    }

    if (direction === 'W') {
      x -= amount;
    }

    if (direction === 'E') {
      x += amount;
    }

    if (direction === 'F') {
      if (dir === 'N') {
        y += amount;
      }
      if (dir === 'S') {
        y -= amount;
      }
      if (dir === 'W') {
        x -= amount;
      }
      if (dir === 'E') {
        x += amount;
      }
    }

    if (direction === 'L') {
      const turns = (amount / 90) % 4;

      let index = coord.indexOf(dir);

      for (let i of _.range(turns)) {
        index -= 1;

        if (index === -1) {
          index = 3;
        }
      }

      dir = coord[index];
    }

    if (direction === 'R') {
      const turns = (amount / 90) % 4;

      let index = coord.indexOf(dir);

      for (let i of _.range(turns)) {
        index += 1;

        if (index === 4) {
          index = 0;
        }
      }

      dir = coord[index];
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

  for (let i of lines) {
    const direction = i[0];
    const amount = +i.slice(1);

    if (direction === 'N') {
      wy += amount;
    }

    if (direction === 'S') {
      wy -= amount;
    }

    if (direction === 'E') {
      wx += amount;
    }

    if (direction === 'W') {
      wx -= amount;
    }

    if (direction === 'F') {
      x += amount * wx;
      y += amount * wy;
    }

    if (direction === 'L') {
      const turns = amount / 90;

      for (let i of _.range(turns)) {
        [wx, wy] = [-wy, wx];
      }
    }

    if (direction === 'R') {
      const turns = amount / 90;
      for (let i of _.range(turns)) {
        [wx, wy] = [wy, -wx];
      }
    }
  }

  return Math.abs(x) + Math.abs(y);
};

console.log('part 1', part1());
console.log('part 2', part2());

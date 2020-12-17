import fs from 'fs';
import _ from 'lodash';

const ACTIVE = '#';
const INACTIVE = '.';

let coords = {};

const part2 = () => {
  const lines = fs
    .readFileSync('./day-17/17.in', 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  for (let y of _.range(lines.length)) {
    for (let x of _.range(lines[0].length)) {
      coords[[x, y, 0, 0]] = lines[x][y];
    }
  }

  const geActiveNeightbors = (key) => {
    const [x, y, z, w] = key.split(',').map(Number);

    let numActive = 0;

    for (let dw of [-1, 0, 1]) {
      for (let dz of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          for (let dx of [-1, 0, 1]) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
              continue;
            }

            if (coords[[x + dx, y + dy, z + dz, w + dw]] === ACTIVE) {
              numActive++;
            }
          }
        }
      }
    }

    return numActive;
  };

  const expandToNextLayer = (key) => {
    const [x, y, z, w] = key.split(',').map(Number);

    for (let dw of [-1, 0, 1]) {
      for (let dz of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          for (let dx of [-1, 0, 1]) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
              continue;
            }

            coords[[x + dx, y + dy, z + dz, w + dw]] =
              coords[[x + dx, y + dy, z + dz, w + dw]] || INACTIVE;
          }
        }
      }
    }
  };

  let cycle = 1;

  while (cycle <= 6) {
    const nextCoords = _.cloneDeep(coords);

    for (let key in coords) {
      expandToNextLayer(key);
    }

    for (let key in coords) {
      const activeNeighbors = geActiveNeightbors(key);

      // If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
      // If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.

      if (coords[key] === ACTIVE) {
        if (activeNeighbors === 2 || activeNeighbors === 3) {
          nextCoords[[key]] = ACTIVE;
        } else {
          nextCoords[[key]] = INACTIVE;
        }
      } else {
        if (activeNeighbors === 3) {
          nextCoords[[key]] = ACTIVE;
        } else {
          nextCoords[[key]] = INACTIVE;
        }
      }
    }

    coords = _.cloneDeep(nextCoords);

    cycle++;
  }

  let numActive = 0;

  for (let value of Object.values(coords)) {
    if (value === ACTIVE) {
      numActive++;
    }
  }

  return numActive;
};

console.log('part 2', part2());

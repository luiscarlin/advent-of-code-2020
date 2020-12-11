import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  let grid = fs
    .readFileSync('./day-11/11.in', 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  const ROWS = grid.length;
  const COLS = grid[0].length;

  while (true) {
    let nextGen = _.cloneDeep(grid);

    let hasAnythingChanged = false;

    for (let row of _.range(ROWS)) {
      for (let col of _.range(COLS)) {
        let neighOcc = 0;

        // get number occupied neighbors
        for (let dr of [-1, 0, 1]) {
          for (let dc of [-1, 0, 1]) {
            if (dr === 0 && dc === 0) {
              continue;
            }

            const neighbor = grid[row + dr] && grid[row + dr][col + dc];

            if (neighbor && neighbor === '#') {
              neighOcc += 1;
            }
          }
        }

        if (grid[row][col] === 'L' && neighOcc === 0) {
          nextGen[row][col] = '#';
          hasAnythingChanged = true;
        } else if (grid[row][col] === '#' && neighOcc >= 4) {
          nextGen[row][col] = 'L';
          hasAnythingChanged = true;
        } else {
          //nothing
        }
      }
    }

    if (!hasAnythingChanged) {
      let totalNumberOcc = 0;

      for (let row = 0; row < grid.length; row += 1) {
        for (let col = 0; col < grid[0].length; col += 1) {
          if (grid[row][col] === '#') {
            totalNumberOcc += 1;
          }
        }
      }

      return totalNumberOcc;
    }

    grid = _.cloneDeep(nextGen);
  }
};

const part2 = () => {
  let grid = fs
    .readFileSync('./day-11/11.in', 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  const ROWS = grid.length;
  const COLS = grid[0].length;

  while (true) {
    let nextGen = _.cloneDeep(grid);

    let hasAnythingChanged = false;

    for (let row of _.range(ROWS)) {
      for (let col of _.range(COLS)) {
        let neighOcc = 0;

        // get number occupied neighbors
        for (let dr of [-1, 0, 1]) {
          for (let dc of [-1, 0, 1]) {
            if (dr === 0 && dc === 0) {
              continue;
            }

            let r = row + dr;
            let c = col + dc;

            let neighbor = grid[r] && grid[r][c];

            while (neighbor === '.') {
              r += dr;
              c += dc;

              neighbor = grid[r] && grid[r][c];
            }

            if (neighbor && neighbor === '#') {
              neighOcc += 1;
            }
          }
        }

        if (grid[row][col] === 'L' && neighOcc === 0) {
          nextGen[row][col] = '#';
          hasAnythingChanged = true;
        } else if (grid[row][col] === '#' && neighOcc >= 5) {
          nextGen[row][col] = 'L';
          hasAnythingChanged = true;
        } else {
          //nothing
        }
      }
    }

    if (!hasAnythingChanged) {
      let totalNumberOcc = 0;

      for (let row = 0; row < grid.length; row += 1) {
        for (let col = 0; col < grid[0].length; col += 1) {
          if (grid[row][col] === '#') {
            totalNumberOcc += 1;
          }
        }
      }

      return totalNumberOcc;
    }

    grid = _.cloneDeep(nextGen);
  }
};

console.log('part 1', part1());
console.log('part 2', part2());

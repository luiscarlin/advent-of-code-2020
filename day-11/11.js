import fs from 'fs';

const deepCopy = (currentArray) => currentArray.map((arr) => arr.slice());

const getNeighbors = (row, col, grid) => {
  const raw = [];

  raw.push(grid[row + 1] && grid[row + 1][col]);
  raw.push(grid[row - 1] && grid[row - 1][col]);
  raw.push(grid[row][col + 1]);
  raw.push(grid[row][col - 1]);

  raw.push(grid[row + 1] && grid[row + 1][col + 1]);
  raw.push(grid[row - 1] && grid[row - 1][col + 1]);
  raw.push(grid[row - 1] && grid[row - 1][col - 1]);
  raw.push(grid[row + 1] && grid[row + 1][col - 1]);

  const neighbors = raw.filter((n) => !!n);

  return {
    occ: neighbors.filter((x) => x === '#').length,
    empty: neighbors.filter((x) => x === 'L').length,
  };
};

const getFirstSeenNeighbors = (row, col, grid) => {
  let numEmpty = 0;
  let numOcc = 0;

  // left
  for (let i = col - 1; i >= 0; i -= 1) {
    if (grid[row][i] === 'L') {
      numEmpty += 1;
      break;
    }
    if (grid[row][i] === '#') {
      numOcc += 1;
      break;
    }
  }

  // right
  for (let i = col + 1; i < grid[0].length; i += 1) {
    if (grid[row][i] === 'L') {
      numEmpty += 1;
      break;
    }

    if (grid[row][i] === '#') {
      numOcc += 1;
      break;
    }
  }

  // up
  for (let i = row - 1; i >= 0; i -= 1) {
    if (grid[i][col] === 'L') {
      numEmpty += 1;
      break;
    }

    if (grid[i][col] === '#') {
      numOcc += 1;
      break;
    }
  }

  // down
  for (let i = row + 1; i < grid.length; i += 1) {
    if (grid[i][col] === 'L') {
      numEmpty += 1;
      break;
    }

    if (grid[i][col] === '#') {
      numOcc += 1;
      break;
    }
  }

  // up left
  let index = 1;

  while (true) {
    const value = grid[row - index] && grid[row - index][col - index];

    if (!value) {
      break;
    }

    if (value === 'L') {
      numEmpty += 1;
      break;
    }
    if (value === '#') {
      numOcc += 1;
      break;
    }
    index += 1;
  }

  // up right

  index = 1;

  while (true) {
    const value = grid[row - index] && grid[row - index][col + index];

    if (!value) {
      break;
    }

    if (value === 'L') {
      numEmpty += 1;
      break;
    }
    if (value === '#') {
      numOcc += 1;
      break;
    }
    index += 1;
  }

  // down left

  index = 1;

  while (true) {
    const value = grid[row + index] && grid[row + index][col - index];

    if (!value) {
      break;
    }

    if (value === 'L') {
      numEmpty += 1;
      break;
    }
    if (value === '#') {
      numOcc += 1;
      break;
    }
    index += 1;
  }

  // down right

  index = 1;

  while (true) {
    const value = grid[row + index] && grid[row + index][col + index];

    if (!value) {
      break;
    }

    if (value === 'L') {
      numEmpty += 1;
      break;
    }
    if (value === '#') {
      numOcc += 1;
      break;
    }
    index += 1;
  }

  return {
    occ: numOcc,
    empty: numEmpty,
  };
};

const part1 = () => {
  let grid = fs
    .readFileSync('./day-11/11.in', 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  while (true) {
    let nextGen = deepCopy(grid);

    let hasAnythingChanged = false;

    for (let row = 0; row < grid.length; row += 1) {
      for (let col = 0; col < grid[0].length; col += 1) {
        const { occ, empty } = getNeighbors(row, col, grid);

        if (grid[row][col] === 'L' && occ === 0) {
          nextGen[row][col] = '#';
          hasAnythingChanged = true;
        } else if (grid[row][col] === '#' && occ >= 4) {
          nextGen[row][col] = 'L';
          hasAnythingChanged = true;
        } else {
          //nothing
        }
      }
    }

    if (!hasAnythingChanged) {
      let numberOcc = 0;

      for (let row = 0; row < grid.length; row += 1) {
        for (let col = 0; col < grid[0].length; col += 1) {
          if (grid[row][col] === '#') {
            numberOcc += 1;
          }
        }
      }

      return numberOcc;
    }

    grid = deepCopy(nextGen);
  }
};

const part2 = () => {
  let grid = fs
    .readFileSync('./day-11/11.in', 'utf8')
    .split('\n')
    .map((line) => line.split(''));

  while (true) {
    let nextGen = deepCopy(grid);

    let hasAnythingChanged = false;

    for (let row = 0; row < grid.length; row += 1) {
      for (let col = 0; col < grid[0].length; col += 1) {
        const { occ, empty } = getFirstSeenNeighbors(row, col, grid);

        if (grid[row][col] === 'L' && occ === 0) {
          nextGen[row][col] = '#';
          hasAnythingChanged = true;
        } else if (grid[row][col] === '#' && occ >= 5) {
          nextGen[row][col] = 'L';
          hasAnythingChanged = true;
        } else {
          //nothing
        }
      }
    }

    if (!hasAnythingChanged) {
      let numberOcc = 0;

      for (let row = 0; row < grid.length; row += 1) {
        for (let col = 0; col < grid[0].length; col += 1) {
          if (grid[row][col] === '#') {
            numberOcc += 1;
          }
        }
      }

      return numberOcc;
    }

    grid = deepCopy(nextGen);
  }
};
console.log('part 1', part1());
console.log('part 2', part2());

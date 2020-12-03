import fs from 'fs';

//[row][col]

const grid = fs
  .readFileSync('./day-03/3.in', 'utf8')
  .split('\n')
  .map((row) => row.split(''));

const findTreesSeen = (right, down) => {
  let row = 0;
  let col = 0;

  let treesSeen = 0;

  while (true) {
    row = row + down;
    col = (col + right) % grid[0].length;

    if (row >= grid.length) {
      break;
    }

    if (grid[row][col] === '#') {
      treesSeen += 1;
    }
  }

  return treesSeen;
};

console.log('part 1', findTreesSeen(3, 1));

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const product = slopes
  .map((slope) => findTreesSeen(...slope))
  .reduce((acc, current) => acc * current, 1);

console.log('part 2', product);

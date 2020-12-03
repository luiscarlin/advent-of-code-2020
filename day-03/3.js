import fs from 'fs';

// 31 cols
// index 0 => 30
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
    col = (col + right) % 31;

    if (row >= 323) {
      break;
    }

    if (grid[row][col] === '#') {
      treesSeen += 1;
    }
  }

  return treesSeen;
};

console.log('part 1', findTreesSeen(3, 1));

console.log(
  'part 2',
  findTreesSeen(1, 1) *
    findTreesSeen(3, 1) *
    findTreesSeen(5, 1) *
    findTreesSeen(7, 1) *
    findTreesSeen(1, 2)
);

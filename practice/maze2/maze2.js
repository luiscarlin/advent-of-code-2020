import fs from 'fs';

// maze[row][col]

const printMaze = (maze) => {
  maze.forEach((row) => {
    row.forEach((item) => process.stdout.write(item));
    console.log();
  });
};

const convert = (num) => (num === '1' ? '#' : '.');

const getMaze = () => {
  const lines = fs
    .readFileSync('./practice/maze2/maze2.in', 'utf8')
    .split('\n');

  const [startCol, startRow] = lines[1].split(' ');
  const [exitCol, exitRow] = lines[2].split(' ');
  const maze = lines.slice(3).map((row) => row.split(' ').map(convert));

  return { maze, startCol, startRow, exitCol, exitRow };
};

const { maze, startRow, startCol, exitRow, exitCol } = getMaze();

maze[startRow][startCol] = 'S';
maze[exitRow][exitCol] = 'E';

printMaze(maze);

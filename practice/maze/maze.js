import fs from 'fs';
import nx from 'jsnetworkx';

const getValue = (maze, row, col) =>
  maze.find((a) => a.row === row && a.col === col).value;

const getConvertedValue = (maze, row, col, start, exit) => {
  const value = getValue(maze, row, col);

  if (row === start.row && col === start.col) {
    return 'S';
  }
  if (row === exit.row && col === exit.col) {
    return 'E';
  }
  if (value === '1') {
    return '#';
  }
  if (value === '0') {
    return '.';
  }
};

const printMaze = (maze, rows, cols, start, exit) => {
  console.log();
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      process.stdout.write(getConvertedValue(maze, row, col, start, exit));
    }
    console.log();
  }

  console.log();
};

const populateGrid = () => {
  const lines = fs.readFileSync('./practice/maze/maze.in', 'utf8').split('\n');

  const [cols, rows] = lines[0].split(' ').map(Number);
  const [startX, startY] = lines[1].split(' ').map(Number);

  const start = {
    row: startX,
    col: startY,
  };

  const [exitX, exitY] = lines[2].split(' ').map(Number);

  const exit = {
    row: exitX,
    col: exitY,
  };

  const rawMaze = lines.slice(3);
  const maze = [];

  for (let row = 0; row < rows; row += 1) {
    const values = rawMaze[row].split(' ');

    for (let col = 0; col < cols; col += 1) {
      maze.push({
        row: row,
        col: col,
        value: values[col],
      });
    }
  }

  return { maze, start, exit, rows, cols };
};

const getNeighbors = (location, maze) => {
  const find = (row, col) =>
    maze.find((a) => a.row === row && a.col === col && a.value !== 1);

  const neighbors = [];

  // N
  const north = find(location.row - 1, location.col);
  north && neighbors.push(north);

  // S
  const south = find(location.row + 1, location.col);
  south && neighbors.push(south);

  // E
  const east = find(location.row, location.col + 1);
  east && neighbors.push(east);

  // W
  const west = find(location.row, location.col - 1);
  west && neighbors.push(west);

  return neighbors;
};

const { maze, start, exit, rows, cols } = populateGrid();

printMaze(maze, rows, cols, start, exit);

const graph = new nx.Graph();

maze.forEach((item) => {
  const neighbors = getNeighbors(item, maze);

  neighbors.forEach((n) => {
    graph.addEdge(`${item.row},${item.col}`, `${n.row},${n.col}`);
  });
});

const shortestPathLength = nx.shortestPathLength(graph, {
  source: start.row + ',' + start.col,
  target: exit.row + ',' + exit.col,
});

console.log('shortest path length from start to exit is', shortestPathLength);

const shortestPath = nx.shortestPath(graph, {
  source: start.row + ',' + start.col,
  target: exit.row + ',' + exit.col,
});

console.log('shortest path from start to exit is', shortestPath);

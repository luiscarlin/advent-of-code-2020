import fs from 'fs';
import _ from 'lodash';

const intersection = (array1, array2) =>
  array1.filter((value) => array2.includes(value));

const rotate = (matrix) => {
  return _.cloneDeep(
    matrix.map((row, i) =>
      row.map((val, j) => matrix[matrix.length - 1 - j][i])
    )
  );
};

const flipHorizontal = (matrix) => {
  return _.cloneDeep(matrix.map((row) => row.reverse()));
};

const flipVertical = (matrix) => {
  const matrixCopy = _.cloneDeep(matrix);

  let rows = matrixCopy.length;
  let temp;

  for (let i = 0; i < rows / 2; i++) {
    temp = matrixCopy[rows - i - 1];
    matrixCopy[rows - i - 1] = matrixCopy[i];
    matrixCopy[i] = temp;
  }
  return matrixCopy;
};

const getOrientations = (originalTile) => {
  const orientations = [];

  for (let i of _.range(0, 4)) {
    orientations.push(originalTile);

    originalTile = rotate(originalTile);
  }

  originalTile = flipHorizontal(originalTile);

  for (let i of _.range(0, 4)) {
    orientations.push(originalTile);

    originalTile = rotate(originalTile);
  }

  return orientations;
};

const getEdges = (tile) => {
  const edges = [];

  // top
  edges.push(tile[0].slice());

  // bottom
  edges.push(tile[9].slice());

  // left & right
  const right = [];
  const left = [];

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      if (col === 0) {
        left.push(tile[row][col]);
      }

      if (col === 9) {
        right.push(tile[row][col]);
      }
    }
  }

  edges.push(left);
  edges.push(right);

  return edges.map((a) => a.join(''));
};

const tiles = fs
  .readFileSync('./day-20/20.in', 'utf8')
  .split('\n\n')
  .map((t) => t.split('\n'))
  .map((line) => {
    const id = /\d+/.exec(line.shift())[0];
    const tile = line.map((t) => t.split(''));

    const possibilities = getOrientations(tile);

    return {
      id,
      possibilities,
      edges: [
        ...new Set([
          ...getEdges(tile),
          ...getEdges(flipHorizontal(tile)),
          ...getEdges(flipVertical(tile)),
        ]),
      ],
    };
  });

const corners = [];

let product = 1;

for (let tile of tiles) {
  let numMatches = 0;

  for (let otherTile of tiles) {
    if (tile.id === otherTile.id) {
      continue;
    }

    const matches = intersection(tile.edges, otherTile.edges);

    if (matches.length > 0) {
      numMatches += 1;
    }
  }

  if (numMatches === 2) {
    product *= +tile.id;
  }
}

console.log('part 1', product);

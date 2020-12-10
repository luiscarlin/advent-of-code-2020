import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const adapters = fs
    .readFileSync('./day-10/10.in', 'utf8')
    .split('\n')
    .map(Number);

  const max = _.max(adapters);
  const deviceJolts = max + 3;

  const diff = {};

  let current = _.min(adapters);

  diff[current] = 1;

  while (true) {
    let nextItem = _.min(
      adapters.filter((a) =>
        [current + 1, current + 2, current + 3].includes(a)
      )
    );

    let difference = nextItem - current;

    if ([difference] in diff) {
      diff[difference] += 1;
    } else {
      diff[difference] = 1;
    }

    if (nextItem + 3 === deviceJolts) {
      diff[3] += 1;
      break;
    }

    current = nextItem;
  }

  return diff['1'] * diff['3'];
};

const part2 = () => {
  const adapters = fs
    .readFileSync('./day-10/10.in', 'utf8')
    .split('\n')
    .map(Number);

  adapters.push(0);
  adapters.push(_.max(adapters) + 3);
  adapters.sort((a, b) => a - b);

  const cacheNumOfBranchesFromNodeIndex = {};

  const findNumberOfBranchesFromNode = (nodeIndex) => {
    if (nodeIndex === adapters.length - 1) {
      // only one branch from prev took you to the end
      return 1;
    }

    if (nodeIndex in cacheNumOfBranchesFromNodeIndex) {
      // return cached value to prevent calculating this again
      return cacheNumOfBranchesFromNodeIndex[nodeIndex];
    }

    // perform depth first traversal
    let numberOfChildBranches = 0;

    for (let i = nodeIndex + 1; i < adapters.length; i += 1) {
      if (adapters[i] - adapters[nodeIndex] <= 3) {
        numberOfChildBranches += findNumberOfBranchesFromNode(i);
      }
    }

    // we know total number of branches under this node, so cache it
    cacheNumOfBranchesFromNodeIndex[nodeIndex] = numberOfChildBranches;
    return numberOfChildBranches;
  };

  return findNumberOfBranchesFromNode(0);
};

console.log('part 1', part1());
console.log('part 2', part2());

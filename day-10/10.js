import fs from 'fs';

const adapters = fs
  .readFileSync('./day-10/10.in', 'utf8')
  .split('\n')
  .map(Number)
  .sort((a, b) => a - b);

adapters.unshift(0);
adapters.push(adapters[adapters.length - 1] + 3);

const part1 = () => {
  let numOnes = 0;
  let numThrees = 0;

  for (let i = 0; i < adapters.length - 1; i += 1) {
    const diff = adapters[i + 1] - adapters[i];

    if (diff === 1) {
      numOnes += 1;
    }

    if (diff === 3) {
      numThrees += 1;
    }
  }

  return numOnes * numThrees;
};

const part2 = () => {
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

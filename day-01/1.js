import fs from 'fs';

const part1 = () => {
  const nums = fs.readFileSync('./day-01/1.in', 'utf8').split('\n').map(Number);

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length; j += 1) {
      if (i === j) {
        continue;
      }

      if (nums[i] + nums[j] === 2020) {
        return nums[i] * nums[j];
      }
    }
  }
};

const part2 = () => {
  const nums = fs.readFileSync('./day-01/1.in', 'utf8').split('\n').map(Number);

  for (let i = 0; i < nums.length; i += 1) {
    for (let j = 0; j < nums.length; j += 1) {
      for (let z = 0; z < nums.length; z += 1) {
        if (i === j || i === z || j === z) {
          continue;
        }

        if (nums[i] + nums[j] + nums[z] === 2020) {
          return nums[i] * nums[j] * nums[z];
        }
      }
    }
  }
};

console.log('part 1', part1());
console.log('part 2', part2());

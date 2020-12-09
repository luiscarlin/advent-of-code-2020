import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const list = fs.readFileSync('./day-09/9.in', 'utf8').split('\n').map(Number);

  let index = 25;
  let startRange = 0;

  while (true) {
    const subList = list.slice(startRange, index);
    const answer = list[index];

    let isValid = false;

    for (let i = 0; i < subList.length; i += 1) {
      for (let x = 0; x < subList.length; x += 1) {
        if (i === x) {
          continue;
        }

        if (subList[i] + subList[x] === answer) {
          isValid = true;
          break;
        }
      }
      if (isValid) {
        break;
      }
    }

    if (!isValid) {
      return answer;
    }

    startRange += 1;
    index += 1;
  }
};

const part2 = () => {
  const match = part1();

  const list = fs.readFileSync('./day-09/9.in', 'utf8').split('\n').map(Number);

  let index = 0;
  let end = index + 2;
  let nums;

  while (true) {
    const subList = list.slice(index, end);

    const sum = _.sum(subList);

    if (sum === match) {
      nums = subList;
      break;
    } else if (sum < match) {
      end += 1;
    } else if (sum > match) {
      index += 1;
      end = index + 2;
    }
  }

  return _.min(nums) + _.max(nums);
};

console.log('part 1', part1());
console.log('part 2', part2());

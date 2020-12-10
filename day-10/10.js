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

//
// (0), 1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 6, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 5, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 6, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 6, 7, 10, 12, 15, 16, 19, (22)
// (0), 1, 4, 7, 10, 11, 12, 15, 16, 19, (22)
// (0), 1, 4, 7, 10, 12, 15, 16, 19, (22)

const part2 = () => {
  const adapters = fs
    .readFileSync('./day-10/10.in', 'utf8')
    .split('\n')
    .map(Number);

  adapters.push(0);
  adapters.push(_.max(adapters) + 3);
  adapters.sort((a, b) => a - b);

  const validRouteForAdapter = new Array(adapters.length).fill(0);

  validRouteForAdapter[0] = 1;

  for (let i = 0; i < adapters.length; i += 1) {
    for (let x = 0; x < adapters.length; x += 1) {
      if (i === x) {
        continue;
      }

      if (adapters[x] - adapters[i] <= 3) {
        validRouteForAdapter[x] += validRouteForAdapter[i];
      } else {
        break;
      }
    }
  }

  // the last entry has the total accumulated number of valid routes
  return validRouteForAdapter[adapters.length - 1];
};

console.log('part 1', part1());
console.log('part 2', part2());

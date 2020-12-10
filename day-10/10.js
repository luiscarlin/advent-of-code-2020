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

console.log('part 1', part1());

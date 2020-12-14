import fs from 'fs';

const part1 = () => {
  const lines = fs
    .readFileSync('./day-13/13.in', 'utf8')
    .split('\n')
    .map((n) => n.trim());

  const earliestTimestamp = +lines[0];
  const buses = lines[1]
    .split(',')
    .filter((n) => n !== 'x')
    .map(Number);

  let selectedBus = 0;
  let leastDiff = Number.MAX_SAFE_INTEGER;

  buses.forEach((bus) => {
    let timestamp = 0;
    let foundNearestTime = false;

    for (let i = 0; !foundNearestTime; i++) {
      timestamp = bus * i;

      if (timestamp > earliestTimestamp) {
        foundNearestTime = true;
      }
    }

    const diff = timestamp - earliestTimestamp;

    if (diff < leastDiff) {
      leastDiff = diff;
      selectedBus = bus;
    }
  });

  return leastDiff * selectedBus;
};

const part2 = () => {
  const lines = fs
    .readFileSync('./day-13/13.in', 'utf8')
    .split('\n')
    .map((n) => n.trim());

  const buses = lines[1].split(',').map(Number);
  const contraints = [];

  for (let i = 0; i < buses.length; i++) {
    if (isNaN(buses[i])) {
      continue;
    }

    const mod = buses[i];
    const remainder = (mod - (i % mod)) % mod;

    contraints.push({ remainder, mod });
  }

  return contraints;
};

console.log('part 1', part1());
console.log(
  'part 2. - Go to https://www.dcode.fr/chinese-remainder and enter these numbers to get the answer:\n',
  part2()
);

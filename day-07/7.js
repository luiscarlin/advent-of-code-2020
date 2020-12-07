import fs from 'fs';

const part1 = () => {
  const parts = fs
    .readFileSync('./day-07/7.in', 'utf8')
    .split('\n')
    .map((line) => line.replaceAll('bags', 'bag'))
    .map((line) => line.slice(0, -1)) // get rid of .
    .map((line) => line.split(/contain|,/g).map((a) => a.trim()));

  const dep = {};

  parts.forEach((list) => {
    list[1];

    dep[list[0]] = {};

    for (let i = 1; i < list.length; i += 1) {
      const quantity = +list[i][0];
      const value = list[i].slice(2);

      dep[list[0]] = {
        ...dep[list[0]],
        [value]: quantity,
      };
    }
  });

  const queue = [];
  const seen = [];

  let total = 0;

  Object.entries(dep).forEach(([key, value]) => {
    if (Object.keys(value).some((item) => /shiny gold/.test(item))) {
      if (!seen.includes(key)) {
        seen.push(key);
        queue.push(key);
        total += 1;
      }
    }
  });

  while (queue.length > 0) {
    const itemToSearch = queue.shift();

    Object.entries(dep).forEach(([key, value]) => {
      if (
        Object.keys(value).some((item) => new RegExp(itemToSearch).test(item))
      ) {
        if (!seen.includes(key)) {
          seen.push(key);
          queue.push(key);
          total += 1;
        }
      }
    });
  }

  return total;
};

const part2 = () => {
  const parts = fs
    .readFileSync('./day-07/7.in', 'utf8')
    .split('\n')
    .map((line) => line.replaceAll('bags', 'bag'))
    .map((line) => line.slice(0, -1)) // get rid of .
    .map((line) => line.split(/contain|,/g).map((a) => a.trim()));

  const dep = {};

  parts.forEach((list) => {
    list[1];

    dep[list[0]] = {};

    for (let i = 1; i < list.length; i += 1) {
      const quantity = +list[i][0];
      const value = list[i].slice(2);

      dep[list[0]] = {
        ...dep[list[0]],
        [value]: quantity,
      };
    }
  });

  function recurse(key) {
    const children = dep[key];

    if (!children || Object.keys(children)[0]?.includes('other bag')) {
      return 0;
    }

    const childObj = Object.entries(children);

    let acc = 0;

    for (let i = 0; i < childObj.length; i += 1) {
      const [bag, num] = childObj[i];
      acc += num + num * recurse(bag);
    }

    return acc;
  }

  return recurse('shiny gold bag');
};

console.log('part 1', part1());
console.log('part 2', part2());

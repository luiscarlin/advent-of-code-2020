import fs from 'fs';

const part1 = () => {
  const lines = fs.readFileSync('./day-14/14.in', 'utf8').split('\n');

  const memory = {};
  let mask = '';
  for (let line of lines) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1];
      continue;
    }

    const address = line.split(' = ')[0].split('[')[1].slice(0, -1);
    let original = Number(+line.split(' = ')[1]).toString(2);

    original = original.padStart(36, '0');

    const value = original
      .split('')
      .map((b, i) => {
        if (mask.charAt(i) !== 'X') {
          return mask.charAt(i);
        }

        return b;
      })
      .join('');

    memory[address] = value;
  }

  let sum = 0;

  for (let entry in memory) {
    if (memory[entry] !== '0') {
      sum += parseInt(memory[entry], 2);
    }
  }

  return sum;
};

const part2 = () => {
  const lines = fs.readFileSync('./day-14/14.in', 'utf8').split('\n');

  const memory = {};
  let mask = '';

  for (let line of lines) {
    if (line.includes('mask')) {
      mask = line.split(' = ')[1];
      continue;
    }

    let orginalAddress = Number(
      +line.split(' = ')[0].split('[')[1].slice(0, -1)
    )
      .toString(2)
      .padStart(36, '0');

    const value = Number(+line.split(' = ')[1])
      .toString(2)
      .padStart(36, '0');

    const addressWithMask = orginalAddress
      .split('')
      .map((b, i) => {
        if (mask[i] == '1' || mask[i] == 'X') {
          return mask[i];
        }
        return b;
      })
      .join('');

    const addresses = [];
    const queue = [];
    queue.push(addressWithMask);

    while (queue.length > 0) {
      const mem = queue.pop();

      const index = mem.indexOf('X');

      if (index != -1) {
        let withOne = mem.split('');

        withOne[index] = '1';
        withOne = withOne.join('');

        let withZero = mem.split('');
        withZero[index] = '0';
        withZero = withZero.join('');

        queue.push(withOne);
        queue.push(withZero);
      } else {
        addresses.push(mem);
      }
    }

    addresses.forEach((address) => {
      memory[address] = value;
    });
  }

  let sum = 0;

  for (let entry in memory) {
    if (memory[entry] !== '0') {
      sum += parseInt(memory[entry], 2);
    }
  }

  return sum;
};

console.log('part 1', part1());
console.log('part 1', part2());

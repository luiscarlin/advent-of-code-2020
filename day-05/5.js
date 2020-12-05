import fs from 'fs';

const seatIds = fs
  .readFileSync('./day-05/5.in', 'utf-8')
  .trim()
  .split('\n')
  .map((num) => {
    const binaryNumber = num
      .replaceAll('F', '0')
      .replaceAll('B', '1')
      .replaceAll('L', '0')
      .replaceAll('R', '1');

    const rowBinary = binaryNumber.slice(0, 7);
    const row = parseInt(rowBinary, 2);

    const colBinary = binaryNumber.slice(7);
    const col = parseInt(colBinary, 2);

    return row * 8 + col;
  });

const findSeatId = (seatIds) => {
  let myId = 0;

  seatIds.forEach((id) => {
    const higher = id + 1;
    const lower = id - 1;

    if (seatIds.includes(id - 2) && !seatIds.includes(lower)) {
      myId = lower;
    }

    if (seatIds.includes(id + 2) && !seatIds.includes(higher)) {
      myId = higher;
    }
  });

  return myId;
};

console.log('part 1', Math.max(...seatIds));
console.log('part 2', findSeatId(seatIds));

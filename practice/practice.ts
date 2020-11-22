import fs from 'fs';

const sum = fs.readFileSync('./file.in', 'utf8').split('\n').map(Number).map(num => Math.floor(num/3) - 2).reduce((acc, item) => acc + item)


console.log('part 1', sum)

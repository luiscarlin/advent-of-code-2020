import fs from 'fs';

const checker = (arr, target) => target.every((v) => arr.includes(v));

const part1 = () => {
  const lines = fs.readFileSync('./day-04/4.in', 'utf8').split('\n');

  const passports = [];
  let index = 0;

  lines.forEach((line) => {
    if (line === '') {
      index += 1;
    } else {
      if (passports[index]) {
        passports[index] += ' ' + line;
      } else {
        passports[index] = line;
      }
    }
  });

  let numValid = 0;

  passports.forEach((passport) => {
    if (
      passport.includes('byr') &&
      passport.includes('iyr') &&
      passport.includes('eyr') &&
      passport.includes('hgt') &&
      passport.includes('hcl') &&
      passport.includes('ecl') &&
      passport.includes('pid') &&
      passport.includes('cid')
    ) {
      numValid += 1;
    } else if (
      passport.includes('byr') &&
      passport.includes('iyr') &&
      passport.includes('eyr') &&
      passport.includes('hgt') &&
      passport.includes('hcl') &&
      passport.includes('ecl') &&
      passport.includes('pid')
    ) {
      numValid += 1;
    }
  });
  return numValid;
};

const part2 = () => {
  const lines = fs.readFileSync('./day-04/4.in', 'utf8').split('\n');

  const passports = [];
  let index = 0;

  lines.forEach((line) => {
    if (line === '') {
      index += 1;
    } else {
      if (passports[index]) {
        passports[index] += ' ' + line;
      } else {
        passports[index] = line;
      }
    }
  });

  const dict = passports.map((passport) => {
    const obj = {};
    passport.split(' ').forEach((entry) => {
      const [key, val] = entry.split(':');
      obj[key] = val;
    });

    return obj;
  });

  const required = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

  let numValid = 0;

  for (let i = 0; i < dict.length; i += 1) {
    const current = dict[i];

    // required.every((c) => Object.keys(current).includes(c));

    if (!required.every((c) => Object.keys(current).includes(c))) {
      continue;
    }

    //four digits; at least 1920 and at most 2002.
    if (current.byr.length !== 4) {
      continue;
    }
    const byrNumber = Number(current.byr);
    if (byrNumber < 1920 || byrNumber > 2002) {
      continue;
    }

    // iyr (Issue Year) - four digits; at least 2010 and at most 2020.
    if (current.iyr.length !== 4) {
      continue;
    }

    const iyrNumber = Number(current.iyr);
    if (!(iyrNumber >= 2010 && iyrNumber <= 2020)) {
      continue;
    }

    // eyr (Expiration Year) - four digits; at least 2020 and at most 2030
    if (current.eyr.length !== 4) {
      continue;
    }
    const eyrNumber = Number(current.eyr);
    if (!(eyrNumber >= 2020 && eyrNumber <= 2030)) {
      continue;
    }

    // hgt (Height) - a number followed by either cm or in:
    // If cm, the number must be at least 150 and at most 193.
    // If in, the number must be at least 59 and at most 76.

    // console.log(Object.keys(current));
    // console.log(current.hgt);
    const number = Number(current.hgt.slice(0, -2));
    const unit = current.hgt.slice(-2);

    if (!['cm', 'in'].includes(unit)) {
      continue;
    }

    if (unit === 'cm') {
      if (number < 150 || number > 193) {
        continue;
      }
    } else {
      if (number < 59 || number > 76) {
        continue;
      }
    }

    //hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f
    const digitsRegex = /^#([0-9]|[a-f]){6}$/;
    // const lettersRegex = /^#[a-f]{6}$/;

    if (!digitsRegex.test(current.hcl)) {
      continue;
    }

    // ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
    const validColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    if (!validColors.includes(current.ecl)) {
      continue;
    }

    //pid (Passport ID) - a nine-digit number, including leading zeroes.

    const pidRegex = /^[0-9]{9}$/;
    if (!pidRegex.test(current.pid)) {
      continue;
    }

    numValid += 1;
  }

  return numValid;
};

console.log('part 1', part1());
console.log('part 2', part2());

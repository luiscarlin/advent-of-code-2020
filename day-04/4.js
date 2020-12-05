import fs from 'fs';

const REQUIRED_PASSPORT_FIELDS = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
];

const EYE_COLOR = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

const valueIsBetween = (num, min, max) => num >= min && num <= max;

const isValidHgt = (hgt) => {
  const number = Number(hgt.slice(0, -2));
  const unit = hgt.slice(-2);

  if (!['cm', 'in'].includes(unit)) {
    return false;
  }

  return unit === 'cm'
    ? number >= 150 && number <= 193
    : number >= 59 && number <= 76;
};

const isValidHcl = (hcl) => {
  const digitsRegex = /^#([0-9]|[a-f]){6}$/;

  return digitsRegex.test(hcl);
};

const isValidEcl = (ecl) => EYE_COLOR.includes(ecl);

const isValidPid = (pid) => {
  const pidRegex = /^[0-9]{9}$/;

  return pidRegex.test(pid);
};

const part1 = (passports) => {
  return passports.filter((passport) =>
    REQUIRED_PASSPORT_FIELDS.every((requiredField) =>
      Object.keys(passport).includes(requiredField)
    )
  ).length;
};

const part2 = (passports) => {
  return passports.filter((passport) => {
    return (
      REQUIRED_PASSPORT_FIELDS.every((requiredField) =>
        Object.keys(passport).includes(requiredField)
      ) &&
      valueIsBetween(passport.byr, 1920, 2002) &&
      valueIsBetween(passport.iyr, 2010, 2020) &&
      valueIsBetween(passport.eyr, 2010, 2030) &&
      isValidHgt(passport.hgt) &&
      isValidHcl(passport.hcl) &&
      isValidEcl(passport.ecl) &&
      isValidPid(passport.pid)
    );
  }).length;
};

const lines = fs
  .readFileSync('./day-04/4.in', 'utf8')
  .split('\n\n')
  .map((a) => a.replace(/\n/g, ' '))
  .map((p) => p.split(' '))
  .map((a) =>
    a.reduce((acc, cur) => {
      const [key, val] = cur.split(':');

      return {
        ...acc,
        [key]: val,
      };
    }, {})
  );

console.log('part 1', part1(lines));
console.log('part 2', part2(lines));

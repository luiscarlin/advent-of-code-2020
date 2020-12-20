import fs from 'fs';

const part1 = () => {
  const [rulesList, messages] = fs
    .readFileSync('./day-19/19p1.in', 'utf-8')
    .split('\n\n')
    .map((line) => line.split('\n'));

  const rules = rulesList.reduce((acc, rule) => {
    const [key, val] = rule.split(': ');
    return { ...acc, [key]: val };
  }, {});

  const cache = Object.keys(rules).reduce(
    (acc, item) => ({ ...acc, [item]: [] }),
    {}
  );

  const getValue = (ruleKey) => {
    if (cache[ruleKey].length > 0) {
      return cache[ruleKey];
    }

    const theRules = rules[ruleKey];

    if (theRules.includes('"')) {
      const theChar = theRules.replaceAll('"', '');
      cache[ruleKey].push(theChar);
      return [theChar];
    }

    if (theRules.includes('|')) {
      const [part1, part2] = theRules.split(' | ').map((d) => d.split(' '));

      let resultp1 = [];

      for (let dep of part1) {
        const theValues = getValue(dep);
        const interimResult = [];

        if (resultp1.length === 0) {
          resultp1 = theValues;
          continue;
        }

        for (let i = 0; i < resultp1.length; i++) {
          for (let z = 0; z < theValues.length; z++) {
            interimResult.push(resultp1[i] + theValues[z]);
          }
        }

        resultp1 = interimResult;
      }

      let resultp2 = [];

      for (let dep of part2) {
        const theValues = getValue(dep);
        const interimResult = [];

        if (resultp2.length === 0) {
          resultp2 = theValues;
          continue;
        }

        for (let i = 0; i < resultp2.length; i++) {
          for (let z = 0; z < theValues.length; z++) {
            interimResult.push(resultp2[i] + theValues[z]);
          }
        }

        resultp2 = interimResult;
      }

      resultp1.push(...resultp2);

      cache[ruleKey] = resultp1;

      return resultp1;
    } else {
      // no or. ex: 4 1 5
      let result = [];
      for (let dep of theRules.split(' ')) {
        const theValues = getValue(dep);
        const interimResult = [];

        if (result.length === 0) {
          result = theValues;
          continue;
        }

        for (let i = 0; i < result.length; i++) {
          for (let z = 0; z < theValues.length; z++) {
            interimResult.push(result[i] + theValues[z]);
          }
        }

        result = interimResult;
      }
      cache[ruleKey] = result;
      return result;
    }
  };

  const rule0 = getValue(0);

  let numValid = 0;

  messages.forEach((message) => {
    if (rule0.includes(message)) {
      numValid++;
    }
  });

  return numValid;
};

console.log('part 1', part1());

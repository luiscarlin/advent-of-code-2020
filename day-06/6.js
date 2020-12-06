import fs from 'fs';
import _ from 'lodash';

const part1 = () => {
  const allYesQuestionsInGroup = fs
    .readFileSync('./day-06/6.in', 'utf8')
    .split('\n\n')
    .map((t) => t.replace(/\n/g, ''))
    .map((a) => new Set(a.split('')).size);

  return _.sum(allYesQuestionsInGroup);
};

const part2 = () => {
  const lines = fs
    .readFileSync('./day-06/6.in', 'utf8')
    .split('\n\n')
    .map((a) => a.split('\n'))
    .map(
      (answerList) =>
        answerList[0]
          .split('')
          .filter((singleAnswer) =>
            answerList.every((x) => x.includes(singleAnswer))
          ).length
    );

  return _.sum(lines);
};

console.log('part 1', part1());
console.log('part 2', part2());

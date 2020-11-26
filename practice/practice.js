#!/usr/bin/env node

import fs from 'fs';
import _ from 'lodash';

const lines = fs
  .readFileSync(`./practice.in`, 'utf8')
  .split('\n')
  .map(Number)
  .map((num) => Math.floor(num / 3) - 2);

console.log(_.sum(lines));

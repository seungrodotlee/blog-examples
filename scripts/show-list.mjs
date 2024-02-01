#!/usr/bin/env zx

import {
  flat,
  flatMap,
  join,
  map,
  pipe,
  pipeLazy,
  reduce,
  tap,
  toArray,
  values,
} from '@fxts/core';
import 'zx/globals';

echo(`${chalk.bgGreen(' DOT ')} example list`);
pipe(
  fs.readFileSync('./scripts/map.yaml', 'utf-8'),
  YAML.parse,
  values,
  toArray,
  flat,
  toArray,
  (examples) =>
    pipe(
      examples,
      reduce((prev, { name }) => 
        Math.max(
          typeof prev === 'number' ? prev : prev.name.length,
          name.length
        )
      ),
      (pad) =>
        map(
          ({ name, link }) =>
            `- ${name.padEnd(pad, ' ')} | ${chalk.blue(link)}`,
          examples
        )
    ),
  join('\n'),
  echo
);

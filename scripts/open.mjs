#!/usr/bin/env zx

import {
  entries,
  find,
  includes,
  isNil,
  not,
  pipe,
  prop,
  throwIf,
} from '@fxts/core';
import 'zx/globals';

const waitForServerStart = (callback) => async (app) => {
  const log = $`npx nx run ${app}:serve`;

  for await (const chunk of log.stdout) {
    if (chunk.includes('Web Development Server is listening at')) {
      callback(/http.+$/.exec(chunk)[0]);
    }
  }
};

const example = argv._[0];

pipe(
  fs.readFileSync('./scripts/map.yaml', 'utf-8'),
  YAML.parse,
  entries,
  find(([_, examples]) =>
    not(isNil(find(({ name }) => name === example, examples)))
  ),
  prop(0),
  throwIf(
    isNil,
    () =>
      new Error(
        '잘못된 example을 입력하셨습니다! (example을 포함하는 app이 없습니다)'
      )
  ),
  waitForServerStart((url) => {
    echo(`${chalk.bgGreen(' DOT ')} Open ${url}${example}`);
    open(`${url}${example}`);
  })
);
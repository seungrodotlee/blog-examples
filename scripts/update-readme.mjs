#!/usr/bin/env zx

import { readFileSync, writeFileSync } from 'fs';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toMarkdown } from 'mdast-util-to-markdown';
import { gfmTable } from 'micromark-extension-gfm-table';
import { gfmTableFromMarkdown, gfmTableToMarkdown } from 'mdast-util-gfm-table';
import { inspect } from 'unist-util-inspect';
import { find } from 'unist-util-find';
import { modifyChildren } from 'unist-util-modify-children';
import { pipe, tap } from '@fxts/core';

const { name, refUrl, refLabel, path } = argv;

const ref = [refUrl, refLabel];

echo(`${chalk.bgGreen(chalk.bold(' DOT '))} Update examples list (+${name})`);

const getMarkdownTree = (content) => {
  return fromMarkdown(content, 'utf-8', {
    extensions: [gfmTable()],
    mdastExtensions: [gfmTableFromMarkdown()],
  });
};

const writeMarkdown = (fileName) => (tree) => {
  return writeFileSync(
    fileName,
    toMarkdown(tree, {
      extensions: [gfmTableToMarkdown()],
    }),
    {
      encoding: 'utf-8',
    }
  );
};

const createTableCell = (node) => {
  return {
    type: 'tableCell',
    children: [node],
  };
};

const code = (value) => {
  return {
    type: 'inlineCode',
    value,
  };
};

const link = (url, label) => {
  return {
    type: 'link',
    url,
    children: [
      {
        type: 'text',
        value: label ?? url,
      },
    ],
  };
};

const appendExample = (tree, { name, ref, path }) => {
  return pipe(
    find(tree, { type: 'table' }),
    tap(
      modifyChildren((_node, index, parent) => {
        if (index === parent.children.length - 1) {
          parent.children.push({
            type: 'tableRow',
            children: [
              createTableCell(code(name)),
              createTableCell(link(...ref)),
              createTableCell(link(path)),
            ],
          });

          return index + 10;
        }
      })
    )
  );
};

const updateExamplesTable = (exampleData) => (tree) => {
  return pipe(
    tree,
    modifyChildren((node, index, parent) => {
      if (node.type === 'table') {
        parent.children.splice(index, 1, appendExample(tree, exampleData));
        return index + 1;
      }
    })
  );
};

pipe(
  readFileSync('README.md', { encoding: 'utf-8' }),
  getMarkdownTree,
  tap(
    updateExamplesTable({
      name,
      ref,
      path,
    })
  ),
  writeMarkdown('README.md')
);

echo(`${chalk.whiteBright('UPDATE')} README.md`);
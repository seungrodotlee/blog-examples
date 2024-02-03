import {
  formatFiles,
  generateFiles,
  Tree,
  names
} from '@nx/devkit';
import * as path from 'path';
import { StringTransformer, tsquery } from '@phenomnomnominal/tsquery';
import { ExampleGeneratorSchema } from './schema';
import { ArrayLiteralExpression, Node } from 'typescript';
import { append, filter, join, map, pipe, pick } from '@fxts/core';
import * as YAML from "yaml";
import { exec as _exec, spawn, spawnSync } from 'child_process';
import { promisify } from 'util';

const exec = promisify(_exec);

type Names = Record<"className" | "propertyName" | "constantName" | "fileName", string>;

const normalizeOptions = (options: ExampleGeneratorSchema) => ({
  ...options,
  ...names(options.name),
  projectRoot: `apps/${options.project}`,
  routesFile: `apps/${options.project}/src/routes/routes.data.ts`
});

const setType = <Type>(data: any) => data as Type;

const appendTo = <
  Obj extends Record<string, Value[]>,
  Key extends keyof Obj,
  Value extends Obj[Key] extends Array<infer Item> ? Item : any
>(key: Key, value: Value) => (object: Obj) => (object
  ? {
    ...object,
    [key]: [...(object[key] ?? []), value]
  }
  : {
    [key]: [value]
  }
) as Obj;

const importStatementAppender = 
  ({className, fileName}: ExampleGeneratorSchema & Names) => 
  (node: Node) => {
    return `import ${className} from "../examples/${fileName}/${fileName}.page";\n${node.getText()}`
  };

const routeDataAppender = 
  ({ fileName, className }: ExampleGeneratorSchema & Names) => 
  (node: ArrayLiteralExpression) => {
    return `[${
        pipe(
          node.getChildren(), 
          map(node => node.getText()), 
          filter(text => !"[]".includes(text)), 
          append(`{ 
            path: "/${fileName}", 
            Component: ${className} 
          }`),
          join(","),
        )
      }]`.replace(/,,/, ",");
  };

const replaceFileContent = 
  (selector: string, transformer: StringTransformer) => 
  (source: string) => {
    return tsquery.replace(source, selector, transformer);
  };

const readFile = (tree: Tree, file: string) => tree.read(file).toString();

const writeToFile = (tree: Tree, file: string) => (content: string) => tree.write(file, content);

export const exampleGenerator = async (
  tree: Tree,
  _options: ExampleGeneratorSchema
) => {
  const options = normalizeOptions(_options);

  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, {
    ...options,
  });

  pipe(
    readFile(tree, "scripts/map.yaml"),
    YAML.parse,
    setType<Record<string, Record<"name" | "link", string>[]>>,
    appendTo(options.project, {
      ...pick(["name", "link"], options)
    }),
    YAML.stringify,
    writeToFile(tree, "scripts/map.yaml")
  )

  pipe(
    readFile(tree, options.routesFile),
    replaceFileContent("ImportDeclaration + VariableStatement", importStatementAppender(options)),
    replaceFileContent("[name=routes] ~ ArrayLiteralExpression", routeDataAppender(options)),
    writeToFile(tree, options.routesFile)
  );

  console.log("\n");
  spawnSync("npx", [
    "zx",
    "./scripts/update-readme.mjs",
    "--name",
    `'${options.fileName}'`,
    "--refUrl",
    `${options.link}/${options.fileName}`,
    "--refLabel",
    `'${options.label}'`,
    "--path",
    `'apps/react-app/src/examples/${options.fileName}'`,
  ], {
    cwd: process.cwd(),
    stdio: "inherit",
    env: { ...process.env, FORCE_COLOR: "true" }
  });
  console.log("\n");

  await formatFiles(tree);
};

export default exampleGenerator;

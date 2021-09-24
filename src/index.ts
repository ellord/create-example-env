#!/usr/bin/env node --experimental-specifier-resolution=node

import * as path from 'path';
import meow from 'meow';

import { Project } from 'ts-morph';

import { createExampleEnvFromEnvs } from './createExampleEnvFromEnvs';
import { extractEnvsFromSourceFile } from './extractEnvsFromSourceFile';

const cli = meow(
  `
  Usage
`,
  {
    importMeta: import.meta,
  }
);
console.log(cli);

const tsConfigFilePath = process.argv[2];

const project = new Project({
  tsConfigFilePath,
});

const sourceFiles = project.getSourceFiles();

const envs = new Set<string>();
sourceFiles.forEach((sourceFile) => {
  const sourceFilePath = sourceFile.getFilePath();
  console.log(`Parsing ${path.relative(process.cwd(), sourceFilePath)}`);
  const envsFromSourceFile = extractEnvsFromSourceFile(sourceFile);
  envsFromSourceFile.forEach(envs.add, envs);
});

createExampleEnvFromEnvs(envs);

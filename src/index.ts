#!/usr/bin/env node

import { Project } from 'ts-morph';

import { createExampleEnvFromEnvs } from './createExampleEnvFromEnvs';
import { extractEnvsFromSourceFile } from './extractEnvsFromSourceFile';

const tsConfigFilePath = process.argv[2];

const project = new Project({
  tsConfigFilePath,
});

const sourceFiles = project.getSourceFiles();

const envs = new Set<string>();
sourceFiles.forEach((sourceFile) => {
  const envsFromSourceFile = extractEnvsFromSourceFile(sourceFile);
  envsFromSourceFile.forEach(envs.add, envs);
});

createExampleEnvFromEnvs(envs);

import { Project } from 'ts-morph';

import { generateCodeWithEnvs } from './generateSourceFileText';

export const generateTestSourceFile = () => {
  const expectedSet = new Set<string>();

  const sourceFileText = generateCodeWithEnvs({
    callback: (env) => {
      expectedSet.add(env);
    },
  });

  const project = new Project();
  const testSourceFile = project.createSourceFile('file.ts', sourceFileText);

  return { expectedSet, testSourceFile };
};

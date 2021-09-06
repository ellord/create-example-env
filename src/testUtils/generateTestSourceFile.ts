import { Project } from 'ts-morph';

const NUMBER_OF_TEST_EVS = 50;

export const generateTestSourceFile = (
  numberOfTestEnvs = NUMBER_OF_TEST_EVS
) => {
  const expectedSet = new Set<string>();
  let sourceFileText = '';

  for (let i = 0; i < numberOfTestEnvs; i++) {
    if (i % 2) {
      sourceFileText += `process.env.TEST_${i};`;
    } else {
      sourceFileText += `const { TEST_${i} } = process.env;`;
    }
    expectedSet.add(`TEST_${i}`);
  }

  const project = new Project();
  const testSourceFile = project.createSourceFile('file.ts', sourceFileText);

  return { expectedSet, testSourceFile };
};

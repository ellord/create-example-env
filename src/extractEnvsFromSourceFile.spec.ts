import { Project } from 'ts-morph';

import { extractEnvsFromSourceFile } from './extractEnvsFromSourceFile';

describe('extractEnvsFromSourceFile', () => {
  it('should return envs for a given source file', () => {
    const project = new Project();

    const testSourceFile = project.createSourceFile(
      'file.ts',
      'function test() { process.env.TEST_1; const { TEST_2 } = process.env; }'
    );

    const envs = extractEnvsFromSourceFile(testSourceFile);

    expect(envs).toEqual(new Set(['TEST_1', 'TEST_2']));
  });
});

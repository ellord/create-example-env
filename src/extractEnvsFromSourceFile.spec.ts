import { extractEnvsFromSourceFile } from './extractEnvsFromSourceFile';
import { generateTestSourceFile } from './testUtils/generateTestSourceFile';

describe('extractEnvsFromSourceFile', () => {
  it('should return envs for a given source file', () => {
    const { expectedSet, testSourceFile } = generateTestSourceFile();

    const envs = extractEnvsFromSourceFile(testSourceFile);

    expect(envs).toEqual(expectedSet);
  });
});

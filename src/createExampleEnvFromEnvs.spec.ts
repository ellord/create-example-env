import { createExampleEnvFromEnvs } from './createExampleEnvFromEnvs';
import { generateTestSourceFile } from './testUtils/generateTestSourceFile';

it('debug - this test is used only to run the function', () => {
  const { expectedSet } = generateTestSourceFile();
  createExampleEnvFromEnvs(expectedSet);
});

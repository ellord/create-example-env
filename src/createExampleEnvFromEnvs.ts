import * as fs from 'fs';
import * as path from 'path';

export const createExampleEnvFromEnvs = (envs: Set<string>) => {
  const exampleEnvPath = path.resolve(process.cwd(), '.env.example');
  let fileContent = '';

  const envsAsArray = Array.from([...envs]);
  envsAsArray.sort();

  envsAsArray.forEach((env) => {
    fileContent += `${env}=\n`;
  });

  fs.writeFileSync(exampleEnvPath, fileContent);
};

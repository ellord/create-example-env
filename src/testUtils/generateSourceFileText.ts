const NUMBER_OF_TEST_EVS = 50;

interface Params {
  callback?: (env: string) => any;
  numberOfTestEnvs?: number;
}

export const generateCodeWithEnvs = ({
  callback,
  numberOfTestEnvs = NUMBER_OF_TEST_EVS,
}: Params) => {
  let sourceFileText = '';

  for (let i = 0; i < numberOfTestEnvs; i++) {
    if (i % 2) {
      sourceFileText += `process.env.TEST_${i};`;
    } else {
      sourceFileText += `const { TEST_${i} } = process.env;`;
    }

    if (callback && typeof callback === 'function') {
      callback(`TEST_${i}`);
    }
  }

  return sourceFileText;
};

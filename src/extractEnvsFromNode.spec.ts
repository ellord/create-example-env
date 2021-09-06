import { Node, Project, SyntaxKind } from 'ts-morph';
import { extractEnvsFromNode } from './extractEnvsFromNode';

describe('extractEnvsFromNode', () => {
  it('should return envs for given nodes', () => {
    const NUM_OF_TEST_EVS = 50;

    const expectedSet = new Set<string>();
    let sourceFileText = '';

    for (let i = 0; i < NUM_OF_TEST_EVS; i++) {
      if (i % 2) {
        sourceFileText += `process.env.TEST_${i};`;
      } else {
        sourceFileText += `const { TEST_${i} } = process.env;`;
      }
      expectedSet.add(`TEST_${i}`);
    }

    const project = new Project();
    const testSourceFile = project.createSourceFile('file.ts', sourceFileText);

    const propertyAccessExpressionNodes = testSourceFile.getDescendantsOfKind(
      SyntaxKind.PropertyAccessExpression
    ) as Node[];

    const objectBindingPatternNodes = testSourceFile.getDescendantsOfKind(
      SyntaxKind.ObjectBindingPattern
    ) as Node[];

    const testNodes = [
      ...propertyAccessExpressionNodes,
      ...objectBindingPatternNodes,
    ];

    const envs = new Set<string>();
    testNodes.forEach((testNode) => {
      const extractedEnvs = extractEnvsFromNode(testNode);
      extractedEnvs.forEach(envs.add, envs);
    });

    expect(envs).toEqual(expectedSet);
  });
});

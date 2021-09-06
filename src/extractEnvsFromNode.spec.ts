import { Node, SyntaxKind } from 'ts-morph';

import { extractEnvsFromNode } from './extractEnvsFromNode';
import { generateTestSourceFile } from './testUtils/generateTestSourceFile';

describe('extractEnvsFromNode', () => {
  it('should return envs for given nodes', () => {
    const { expectedSet, testSourceFile } = generateTestSourceFile();

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

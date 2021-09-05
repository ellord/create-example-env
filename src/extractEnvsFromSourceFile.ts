import { SourceFile } from 'ts-morph';
import { extractEnvsFromNode } from './extractEnvsFromNode';

export const extractEnvsFromSourceFile = (sourceFile: SourceFile) => {
  const envsFromSourceFile = new Set<string>();

  sourceFile.forEachDescendant((node) => {
    const envsFromNode = extractEnvsFromNode(node);
    envsFromNode.forEach(envsFromSourceFile.add, envsFromSourceFile);
  });

  return envsFromSourceFile;
};

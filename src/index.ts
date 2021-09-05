#!/usr/bin/env node

import { Project, SyntaxKind } from 'ts-morph';

const tsConfigFilePath = process.argv[2];

const project = new Project({
  tsConfigFilePath,
});

const sourceFiles = project.getSourceFiles();

const envs: string[] = [];

sourceFiles.forEach((sourceFile) => {
  sourceFile.forEachDescendant((node) => {
    switch (node.getKind()) {
      // e.g. process.env.HELLO
      case SyntaxKind.PropertyAccessExpression:
        if (node.getChildren().length === 3) {
          node
            .getChildrenOfKind(SyntaxKind.PropertyAccessExpression)
            .forEach((children) => {
              if (children.getText() == 'process.env') {
                const firstIdentifier = node.getFirstChildByKind(
                  SyntaxKind.Identifier
                );
                if (firstIdentifier) {
                  envs.push(firstIdentifier.getText());
                }
              }
            });
        }
        break;

      // e.g. const { HELLO, WORLD } = process.env
      case SyntaxKind.ObjectBindingPattern:
        node.getNextSiblings().forEach((sibling) => {
          if (sibling.getKind() === SyntaxKind.PropertyAccessExpression) {
            if (sibling.getText() === 'process.env') {
              node
                .getChildrenOfKind(SyntaxKind.BindingElement)
                .forEach((env) => {
                  envs.push(env.getText());
                });
            }
          }
        });
        break;

      default:
    }
  });
});

console.log('envs', envs);

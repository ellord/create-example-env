import { Node, SyntaxKind } from 'ts-morph';

const extractEnvsFromProcessEnvProperty = (node: Node) => {
  const envs = new Set<string>();

  if (node.getChildren().length === 3) {
    node
      .getChildrenOfKind(SyntaxKind.PropertyAccessExpression)
      .forEach((children) => {
        if (children.getText() == 'process.env') {
          const firstIdentifier = node.getFirstChildByKind(
            SyntaxKind.Identifier
          );
          if (firstIdentifier) {
            envs.add(firstIdentifier.getText());
          }
        }
      });
  }

  return envs;
};

const extractEnvsFromObjectDestructure = (node: Node) => {
  const envs = new Set<string>();

  node.getNextSiblings().forEach((sibling) => {
    if (sibling.getKind() === SyntaxKind.PropertyAccessExpression) {
      if (sibling.getText() === 'process.env') {
        node.getChildrenOfKind(SyntaxKind.BindingElement).forEach((env) => {
          envs.add(env.getText());
        });
      }
    }
  });

  return envs;
};

export const extractEnvsFromNode = (node: Node) => {
  const envsFromNode = new Set<string>();

  switch (node.getKind()) {
    // e.g. process.env.HELLO
    case SyntaxKind.PropertyAccessExpression:
      const envsFromProcessEnvProperty =
        extractEnvsFromProcessEnvProperty(node);
      envsFromProcessEnvProperty.forEach(envsFromNode.add, envsFromNode);
      break;

    // e.g. const { HELLO, WORLD } = process.env
    case SyntaxKind.ObjectBindingPattern:
      const envsFromObjectDestructure = extractEnvsFromObjectDestructure(node);
      envsFromObjectDestructure.forEach(envsFromNode.add, envsFromNode);
      break;

    default:
  }

  return envsFromNode;
};

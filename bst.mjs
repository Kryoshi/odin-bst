import { mergeSortUnique } from './mergeSortUnique.mjs';

class Node {
  value;
  left;
  right;

  constructor(value = null, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  root;

  constructor(...values) {
    if (values[0].isArray()) {
      values = [...values[0]];
    }

    values = mergeSortUnique(values);
    root = this.#buildTree(values);
  }

  insert(value) {}

  delete(value) {}

  #buildTree(values) {
    const l = values.length;
    const mid = Math.floor(l / 2);
    const tree = new Node(values[mid]);

    if (l <= 3) {
      tree.left = new Node(values[mid - 1]);
      tree.right = l > 2 ? new Node(values[mid + 1]) : null;
    } else {
      tree.left = this.#buildTree(values.slice(0, mid));
      tree.right = this.#buildTree(values.slice(mid + 1));
    }

    return tree;
  }

  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

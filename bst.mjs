import { mergeSortUnique } from './mergeSortUnique.mjs';

export { BinarySearchTree };

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

class BinarySearchTree {
  root;

  constructor(...values) {
    if (Array.isArray(values[0])) {
      values = [...values[0]];
    }

    values = mergeSortUnique(values);
    this.root = this.#buildTree(values);
  }

  insert(value, node = this.root) {
    if (this.root === null) {
      this.root = new Node(value);
      return true;
    }

    if (value < node.value) {
      node.left
        ? this.insert(value, node.left)
        : (node.left = new Node(value));
    } else if (value > node.value) {
      node.right
        ? this.insert(value, node.right)
        : (node.right = new Node(value));
    }
  }

  delete(value, node = this.root, parent = null) {}

  #buildTree(values) {
    const l = values.length;

    if (l === 0) {
      return null;
    }

    const mid = Math.floor(l / 2);
    const tree = new Node(values[mid]);

    if (l <= 3) {
      tree.left = l > 1 ? new Node(values[mid - 1]) : null;
      tree.right = l > 2 ? new Node(values[mid + 1]) : null;
    } else {
      tree.left = this.#buildTree(values.slice(0, mid));
      tree.right = this.#buildTree(values.slice(mid + 1));
    }

    return tree;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(
        node.left,
        `${prefix}${isLeft ? '    ' : '│   '}`,
        true
      );
    }
  }
}

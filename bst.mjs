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

  insert(value) {
    let node = this.root;

    if (!this.root) {
      this.root = new Node(value);
      return true;
    }

    while (node) {
      if (value < node.value) {
        if (node.left) {
          node = node.left;
        } else {
          node.left = new Node(value);
          return true;
        }
      } else if (value > node.value) {
        if (node.right) {
          node = node.right;
        } else {
          node.right = new Node(value);
          return true;
        }
      } else {
        break;
      }
    }
    return false;
  }

  delete(value, node = this.root) {
    let parent;
    const d = { left: 0, right: 1 };
    let dir;

    while (node !== null) {
      if (value < node.value) {
        parent = node;
        dir = d.left;
        node = node.left;
      } else if (value > node.value) {
        parent = node;
        dir = d.right;
        node = node.right;
      } else {
        if (!node.left && !node.right) {
          if (parent) {
            dir === d.left ? (parent.left = null) : (parent.right = null);
          } else {
            this.root = null;
          }
        } else if (node.right && !node.left) {
          if (parent) {
            dir === d.left
              ? (parent.left = node.right)
              : (parent.right = node.right);
          } else {
            this.root = node.right;
          }
        } else if (node.left && !node.right) {
          if (parent) {
            dir === d.left
              ? (parent.left = node.left)
              : (parent.right = node.left);
          } else {
            this.root = node.left;
          }
        } else {
          const temp = this.getLowestValue(node.right);
          this.delete(temp, node);
          node.value = temp;
        }
        return true;
      }
    }
    return false;
  }

  find(value) {
    let node = this.root;

    while (node) {
      if (value < node.value) {
        node = node.left;
      } else if (value > node.value) {
        node = node.right;
      } else {
        break;
      }
    }

    return node;
  }

  getLowestValue(node = this.root) {
    let value = node.value;
    while (node.left) {
      value = node.left.value;
      node = node.left;
    }
    return value;
  }

  levelOrder(callback) {
    const queue = [this.root];
    const nodes = [];
    while (queue[0]) {
      let node = queue.shift();
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
      typeof callback === 'function' ? callback(node) : nodes.push(node);
    }
    if (nodes.length) {
      return nodes;
    }
  }

  inOrder(callback, node = this.root, nodes = []) {
    if (node.left) {
      this.inOrder(callback, node.left, nodes);
    }
    typeof callback === 'function' ? callback(node) : nodes.push(node);
    if (node.right) {
      this.inOrder(callback, node.right, nodes);
    }

    if (nodes.length) {
      return nodes;
    }
  }

  preOrder(callback, node = this.root, nodes = []) {
    typeof callback === 'function' ? callback(node) : nodes.push(node);
    if (node.left) {
      this.preOrder(callback, node.left, nodes);
    }
    if (node.right) {
      this.preOrder(callback, node.right, nodes);
    }

    if (nodes.length) {
      return nodes;
    }
  }

  postOrder(callback, node = this.root, nodes = []) {
    if (node.left) {
      this.postOrder(callback, node.left, nodes);
    }
    if (node.right) {
      this.postOrder(callback, node.right, nodes);
    }
    typeof callback === 'function' ? callback(node) : nodes.push(node);

    if (nodes.length) {
      return nodes;
    }
  }

  get height() {
    return this.#computeHeight();
  }

  #computeHeight(node = this.root) {
    if (!node) {
      return -1;
    }

    let height = 1;
    let leftHeight = this.#computeHeight(node.left);
    let rightHeight = this.#computeHeight(node.right);

    leftHeight > rightHeight
      ? (height += leftHeight)
      : (height += rightHeight);

    return height;
  }

  depth(node) {
    let currentNode = this.root;
    let depth = 0;
    while (currentNode) {
      if (node.value === currentNode.value) {
        return depth;
      } else {
        depth++;
        if (node.value < currentNode.value) {
          currentNode = currentNode.left;
        } else if (node.value > currentNode.value) {
          currentNode = currentNode.right;
        }
      }
    }
    return 0;
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

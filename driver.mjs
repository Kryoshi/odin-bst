import { BinarySearchTree } from './bst.mjs';
import { mergeSortUnique } from './mergeSortUnique.mjs';

const driver = (() => {
  const length = 10;
  const max = 100;
  const array = [];

  for (let i = 0; i < length; ++i) {
    const value = Math.floor(Math.random() * max);
    array.push(value);
  }
  const tree = new BinarySearchTree(array);

  tree.prettyPrint();
  console.log(tree.isBalanced());

  console.log('____________________________\n');

  let values = [];
  const getValues = (node) => {
    values.push(node.value);
  };
  tree.levelOrder(getValues);
  console.log(values);
  values = [];
  tree.preOrder(getValues);
  console.log(values);
  values = [];
  tree.postOrder(getValues);
  console.log(values);
  values = [];
  tree.inOrder(getValues);
  console.log(values);

  console.log('____________________________\n');

  for (let i = 0; i < length; ++i) {
    const value = 100 + Math.floor(Math.random() * max);
    tree.insert(value);
  }
  tree.prettyPrint();
  console.log(tree.isBalanced());

  console.log('____________________________\n');

  tree.rebalance();
  tree.prettyPrint();
  console.log(tree.isBalanced());

  console.log('____________________________\n');

  values = [];
  tree.levelOrder(getValues);
  console.log(values);
  values = [];
  tree.preOrder(getValues);
  console.log(values);
  values = [];
  tree.postOrder(getValues);
  console.log(values);
  values = [];
  tree.inOrder(getValues);
  console.log(values);

  console.log('____________________________\n');
})();

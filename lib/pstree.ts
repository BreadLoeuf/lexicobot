type TreeNode = {
  type: 'leaf',
  name: string,
} | {
  type: 'node',
  name: string,
  children: Node[],
};

// To-Do
// Convert a string like "[S [NP John] [VP [V saw] [NP Mary]]]" into a tree structure
// Split up string into several tokens
// IF [ is seen, CREATE a new node. IF ] is seen, END node and GO BACK up tree.
// The first word after a [ should be grouped as the category, while each word after that should be grouped on their own
type TreeNode = {
    type: 'leaf',
    name: string,
} | {
    type: 'node',
    name: string,
    children: TreeNode[],
};

const aNode: TreeNode = {
    type: 'leaf',
    name: 'a',
};

const bNode: TreeNode = {
    type: 'node',
    name: 'b', 
    children: [aNode],
};

const input = '[S [NP [Pron This] [N is]] [VP [V a] [N test]]]';
const splitInp = input.split(/([ \[\]])/).filter(c => c && c !== ' ');
console.log(splitInp);



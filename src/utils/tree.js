/**
 * @summary Return nodes with `fn` function applied to each node.
 * Note that the function `fn` must take a node as an argument and must return a node object.
 * @param {Object[]} nodes - Array of nodes
 * @param {Function} fn - function to be applied to each node
 * @returns {Object[]} - Result of map
 */
export function mapTree(nodes, fn) {
    return nodes.map((node) => {
        const mappedNode = fn(node);
        if (node?.children?.length) {
            mappedNode.children = mapTree(node.children, fn);
        }
        return mappedNode;
    });
}

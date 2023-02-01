/**
 * @summary Return nodes with `fn` function applied to each node.
 * Note that the function `fn` must take a node as an argument and must return a node object.
 * @param {Object[]} nodes - Array of nodes
 * @param {Function} fn - function to be applied to each node
 * @returns {Object[]} - Result of map
 */
export function mapTree(nodes, fn) {
    const target = Array.isArray(nodes) ? nodes : [nodes];
    return target.map((node) => {
        const mappedNode = fn(node);
        if (node?.children?.length) {
            mappedNode.children = mapTree(node.children, fn);
        }
        return mappedNode;
    });
}

/**
 *
 * @param nodes
 * @param fn - function to be applied to each node (must have node as argument)
 * @returns {null|Object}
 * @todo add switch between DFS and BFS
 */
export function findTree(nodes_, fn) {
    if (!nodes_) return null;
    const nodes = Array.isArray(nodes_) ? nodes_ : [nodes_];
    const result = nodes.find(fn);
    return result || findTree(nodes.flatMap((n) => n?.children).filter(Boolean), fn);
}

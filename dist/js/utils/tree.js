"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapTree = mapTree;
/**
 * @summary Return nodes with `fn` function applied to each node.
 * Note that the function `fn` must take a node as an argument and must return a node object.
 * @param {Object[]} nodes - Array of nodes
 * @param {Function} fn - function to be applied to each node
 * @returns {Object[]} - Result of map
 */
function mapTree(nodes, fn) {
    return nodes.map((node) => {
        var _a;
        const mappedNode = fn(node);
        if ((_a = node === null || node === void 0 ? void 0 : node.children) === null || _a === void 0 ? void 0 : _a.length) {
            mappedNode.children = mapTree(node.children, fn);
        }
        return mappedNode;
    });
}

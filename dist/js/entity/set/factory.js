"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructEntitySetFactoryByConfig = void 0;
const in_memory_1 = require("../in_memory");
const constructEntitySetFactoryByConfig = ({ entitySetCls = in_memory_1.InMemoryEntity }) => (config, entityCls) => {
    const Cls = entitySetCls;
    return new Cls({
        ...config,
        entityCls,
    });
};
exports.constructEntitySetFactoryByConfig = constructEntitySetFactoryByConfig;

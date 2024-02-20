"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructEntitySetFactoryByConfig = void 0;
const set_1 = require("../set");
const enums_1 = require("./enums");
const ordered_1 = require("./ordered");
const constructEntitySetFactoryByConfig =
    ({
        entitySetCls = set_1.InMemoryEntitySet,
        orderedEntitySetCls = ordered_1.OrderedInMemoryEntitySet,
    }) =>
    (config, entityCls) => {
        const Cls =
            config.entitySetType === enums_1.ENTITY_SET_TYPES.ordered
                ? orderedEntitySetCls
                : entitySetCls;
        return new Cls({
            ...config,
            entityCls,
        });
    };
exports.constructEntitySetFactoryByConfig = constructEntitySetFactoryByConfig;

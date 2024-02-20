"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntitySet = void 0;
const in_memory_1 = require("./in_memory");
const mixins_1 = require("./set/mixins");
class InMemoryEntitySet extends (0, mixins_1.InMemoryEntitySetMixin)(
    (0, mixins_1.InMemoryEntityInSetMixin)(in_memory_1.InMemoryEntity),
) {
    get isEntitySet() {
        return this.prop("isEntitySet", false);
    }
    get entitySetType() {
        return this.prop("entitySetType");
    }
    get entityCls() {
        return this.prop("entityCls");
    }
    get cls() {
        return this.entityCls || super.cls;
    }
    toJSONForInclusionInEntity() {
        const { _id, type } = this.toJSON();
        return { _id, type };
    }
}
exports.InMemoryEntitySet = InMemoryEntitySet;

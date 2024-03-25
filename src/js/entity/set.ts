import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "./in_memory";
import { InMemoryEntityInSetMixin, InMemoryEntitySetMixin } from "./set/mixins";

export class InMemoryEntitySet extends InMemoryEntitySetMixin(
    InMemoryEntityInSetMixin(InMemoryEntity),
) {
    get isEntitySet() {
        return this.prop<EntitySetSchema["isEntitySet"]>("isEntitySet", false);
    }

    get entitySetType() {
        return this.prop<EntitySetSchema["entitySetType"]>("entitySetType");
    }

    get entityCls() {
        return this.prop<EntitySetSchema["entityCls"]>("entityCls");
    }

    get cls() {
        return this.entityCls || super.cls;
    }

    toJSONForInclusionInEntity() {
        const { _id, type } = this.toJSON() as { _id: string; type: string };
        return { _id, type };
    }
}

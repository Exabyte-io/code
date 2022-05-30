import { ENTITY_SET_TYPES } from "./enums";
import { InMemoryEntitySet } from "../set";
import { OrderedInMemoryEntitySet } from "./ordered";

export const constructEntitySetFactoryByConfig = (
    {
        entitySetCls = InMemoryEntitySet,
        orderedEntitySetCls = OrderedInMemoryEntitySet,
    }
) => (config, entityCls) => {
    const cls = config.entitySetType === ENTITY_SET_TYPES.ordered ? orderedEntitySetCls : entitySetCls;
    return new cls({
        ...config,
        entityCls: entityCls,
    });
};

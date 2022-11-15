import { InMemoryEntitySet } from "../set";
import { ENTITY_SET_TYPES } from "./enums";
import { OrderedInMemoryEntitySet } from "./ordered";

export const constructEntitySetFactoryByConfig = ({
    entitySetCls = InMemoryEntitySet,
    orderedEntitySetCls = OrderedInMemoryEntitySet,
}) => (config, entityCls) => {
    const Cls = config.entitySetType === ENTITY_SET_TYPES.ordered
        ? orderedEntitySetCls
        : entitySetCls;
    return new Cls({
        ...config,
        entityCls,
    });
};

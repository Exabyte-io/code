import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntitySet } from "../set";
import { ENTITY_SET_TYPES } from "./enums";
import { OrderedInMemoryEntitySet } from "./ordered";

export const constructEntitySetFactoryByConfig =
    ({ entitySetCls = InMemoryEntitySet, orderedEntitySetCls = OrderedInMemoryEntitySet }) =>
    (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => {
        const Cls =
            config.entitySetType === ENTITY_SET_TYPES.ordered ? orderedEntitySetCls : entitySetCls;
        return new Cls({
            ...config,
            entityCls,
        });
    };

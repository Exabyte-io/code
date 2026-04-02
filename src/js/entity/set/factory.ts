import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntitySet } from "../set";
import { ENTITY_SET_TYPES } from "./enums";

export const constructEntitySetFactoryByConfig =
    ({ entitySetCls = InMemoryEntitySet, orderedEntitySetCls = InMemoryEntitySet }) =>
    (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => {
        const Cls =
            config.entitySetType === ENTITY_SET_TYPES.ordered ? orderedEntitySetCls : entitySetCls;
        return new Cls({
            ...config,
            entityCls,
        });
    };

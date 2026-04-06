import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntity } from "../in_memory";

export const constructEntitySetFactoryByConfig =
    ({ entitySetCls = InMemoryEntity }) =>
    (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => {
        const Cls = entitySetCls;
        return new Cls({
            ...config,
            entityCls,
        });
    };

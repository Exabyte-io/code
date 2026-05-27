import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntity } from "../in_memory";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls }: {
    entitySetCls?: typeof InMemoryEntity | undefined;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntity;

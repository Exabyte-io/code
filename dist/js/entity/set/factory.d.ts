import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntitySet } from "../set";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls, orderedEntitySetCls }: {
    entitySetCls?: typeof InMemoryEntitySet | undefined;
    orderedEntitySetCls?: (typeof InMemoryEntitySet & import("./ordered/OrderedInMemoryEntityInSetMixin").OrderedInMemoryEntityInSetConstructor & import("./ordered/OrderedInMemoryEntitySetMixin").OrderedInMemoryEntitySetConstructor) | undefined;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntitySet;

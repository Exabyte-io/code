import { EntitySetSchema } from "../../esse/types";
import { AnyObject } from "../in_memory";
import { InMemoryEntitySet } from "../set";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls, orderedEntitySetCls }: {
    entitySetCls?: typeof InMemoryEntitySet;
    orderedEntitySetCls?: {
        new (...args: any[]): {
            entitySetType: string;
            readonly isOrderedSet: boolean;
            _json: AnyObject;
            prop<T = null>(name: string, defaultValue?: T): T;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
        };
    } & {
        new (...args: any[]): {
            inSet: {
                _id?: string;
                cls?: string;
                slug?: string;
                type?: string;
                index?: number;
            }[];
            getIndexByIdInOrderedSet(setId: string): number;
            _json: AnyObject;
            prop<T = null>(name: string, defaultValue?: T): T;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): any;
        };
    } & typeof InMemoryEntitySet;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntitySet;

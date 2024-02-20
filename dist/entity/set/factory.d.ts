import { EntitySetSchema } from "@mat3ra/esse/lib/js/types";
import { AnyObject } from "../in_memory";
import { InMemoryEntitySet } from "../set";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls, orderedEntitySetCls }: {
    entitySetCls?: typeof InMemoryEntitySet | undefined;
    orderedEntitySetCls?: ({
        new (...args: any[]): {
            entitySetType: string | undefined;
            readonly isOrderedSet: boolean;
            _json: AnyObject;
            prop<T = null>(name: string, defaultValue?: T | undefined): T;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        };
    } & {
        new (...args: any[]): {
            inSet: {
                _id?: string | undefined;
                cls?: string | undefined;
                slug?: string | undefined;
                type?: string | undefined;
                index?: number | undefined;
            }[];
            getIndexByIdInOrderedSet(setId: string): number;
            _json: AnyObject;
            prop<T = null>(name: string, defaultValue?: T | undefined): T;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            id: string;
            readonly cls: string;
            getClsName(): string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/lib/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
        };
    } & typeof InMemoryEntitySet) | undefined;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntitySet;

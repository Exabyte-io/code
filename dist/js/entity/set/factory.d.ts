import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntitySet } from "../set";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls, orderedEntitySetCls }: {
    entitySetCls?: typeof InMemoryEntitySet | undefined;
    orderedEntitySetCls?: ({
        new (...args: any[]): {
            entitySetType: string | undefined;
            readonly isOrderedSet: boolean;
            _json: AnyObject;
            prop<T = undefined>(name: string, defaultValue: T): T;
            prop<T_1 = undefined>(name: string): T_1 | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            setProps(json?: AnyObject): any;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            readonly cls: string;
            getClsName(): string;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
            id: string;
            _id: string;
            schemaVersion: string;
            systemName: string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
        };
    } & {
        new (...args: any[]): {
            inSet: {
                _id: string;
                cls?: string | undefined;
                slug?: string | undefined;
                type?: string | undefined;
                index?: number | undefined;
            }[];
            getIndexByIdInOrderedSet(setId: string): number;
            _json: AnyObject;
            prop<T = undefined>(name: string, defaultValue: T): T;
            prop<T_1 = undefined>(name: string): T_1 | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            setProps(json?: AnyObject): any;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object | undefined): any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            readonly cls: string;
            getClsName(): string;
            getAsEntityReference(byIdOnly?: boolean): import("@mat3ra/esse/dist/js/types").EntityReferenceSchema;
            getEntityByName(entities: import("../in_memory").InMemoryEntity[], entity: string, name: string): import("../in_memory").InMemoryEntity;
            id: string;
            _id: string;
            schemaVersion: string;
            systemName: string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
        };
    } & typeof InMemoryEntitySet) | undefined;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntitySet;

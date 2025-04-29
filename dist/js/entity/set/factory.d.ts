import { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { EntitySetSchema } from "@mat3ra/esse/dist/js/types";
import { InMemoryEntitySet } from "../set";
export declare const constructEntitySetFactoryByConfig: ({ entitySetCls, orderedEntitySetCls }: {
    entitySetCls?: typeof InMemoryEntitySet | undefined;
    orderedEntitySetCls?: ({
        new (...args: any[]): {
            entitySetType: EntitySetSchema["entitySetType"];
            readonly isOrderedSet: boolean;
            _json: AnyObject;
            prop<T = undefined>(name: string, defaultValue: T): T;
            prop<T = undefined>(name: string): T | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            setProps(json?: AnyObject): /*elided*/ any;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object): /*elided*/ any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            readonly cls: string;
            getClsName(): string;
            getAsEntityReference(byIdOnly: true): {
                _id: string;
            };
            getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
            getEntityByName(entities: import("..").InMemoryEntity[], entity: string, name: string): import("..").InMemoryEntity;
            id: string;
            _id: string;
            schemaVersion: string;
            systemName: string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
        };
    } & {
        new (...args: any[]): {
            inSet: Required<import("@mat3ra/esse/dist/js/types").SystemInSetSchema>["inSet"];
            getIndexByIdInOrderedSet(setId: string): number;
            _json: AnyObject;
            prop<T = undefined>(name: string, defaultValue: T): T;
            prop<T = undefined>(name: string): T | undefined;
            setProp(name: string, value: unknown): void;
            unsetProp(name: string): void;
            setProps(json?: AnyObject): /*elided*/ any;
            toJSON(exclude?: string[]): AnyObject;
            toJSONSafe(exclude?: string[]): AnyObject;
            toJSONQuick(exclude?: string[]): AnyObject;
            clone(extraContext?: object): /*elided*/ any;
            validate(): void;
            clean(config: AnyObject): AnyObject;
            isValid(): boolean;
            readonly cls: string;
            getClsName(): string;
            getAsEntityReference(byIdOnly: true): {
                _id: string;
            };
            getAsEntityReference(byIdOnly?: false): Required<import("@mat3ra/esse/dist/js/types").EntityReferenceSchema>;
            getEntityByName(entities: import("..").InMemoryEntity[], entity: string, name: string): import("..").InMemoryEntity;
            id: string;
            _id: string;
            schemaVersion: string;
            systemName: string;
            readonly slug: string;
            readonly isSystemEntity: boolean;
        };
    } & typeof InMemoryEntitySet) | undefined;
}) => (config: AnyObject, entityCls: EntitySetSchema["entityCls"]) => InMemoryEntitySet;

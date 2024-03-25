import { ExtendedBaseEntitySchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../in_memory";

type ExtendedBaseEntity = Required<ExtendedBaseEntitySchema>;

export function DefaultableMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get isDefault() {
            return this.prop("isDefault", false);
        }

        declare static readonly defaultConfig: object | null;

        static createDefault() {
            // @ts-ignore
            return new this.prototype.constructor(this.defaultConfig);
        }
    };
}

export function TaggableMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get tags(): string[] {
            return this.prop("tags", []);
        }

        set tags(array: string[]) {
            this.setProp("tags", array);
        }

        // only keep unique elements in tags
        setTags(array: string[]) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        }
    };
}

export function HasScopeTrackMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get scopeTrack() {
            return this.prop("scopeTrack", []);
        }

        set scopeTrack(array: unknown[]) {
            this.setProp("scopeTrack", array);
        }
    };
}

export function HasMetadataMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get metadata(): object {
            return this.prop("metadata", {});
        }

        set metadata(object: object) {
            this.setProp("metadata", object);
        }

        updateMetadata(object: object) {
            this.metadata = { ...this.metadata, ...object };
        }
    };
}

export function HasDescriptionMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get description() {
            return this.prop<ExtendedBaseEntity["description"]>("description", "");
        }

        set description(string) {
            this.setProp("description", string);
        }

        get descriptionObject() {
            return this.prop<ExtendedBaseEntity["descriptionObject"]>("descriptionObject");
        }

        set descriptionObject(obj) {
            this.setProp("descriptionObject", obj);
        }
    };
}

export function NamedEntityMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get name(): string {
            return this.prop("name", "");
        }

        set name(name: string) {
            this.setProp("name", name);
        }

        // to be used when getter is overriden
        setName(name: string) {
            this.setProp("name", name);
        }
    };
}

export function HasConsistencyChecksMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        get consistencyChecks(): object[] {
            return this.prop("consistencyChecks", []);
        }

        set consistencyChecks(array: object[]) {
            this.setProp("consistencyChecks", array);
        }

        addConsistencyChecks(array: object[]) {
            this.consistencyChecks = [...this.consistencyChecks, ...array];
        }
    };
}

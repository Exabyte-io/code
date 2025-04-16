import {
    type ConsistencyCheck,
    type DescriptionSchema,
    type EntityTagsSchema,
    type HasConsistencyCheckSchema,
    type MetadataSchema,
} from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../in_memory";
import DefaultableMixin from "./DefaultableMixin";
import NamedEntityMixin from "./NamedEntityMixin";

export { DefaultableMixin, NamedEntityMixin };

export function TaggableMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass implements EntityTagsSchema {
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
    return class extends superclass implements MetadataSchema {
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
    return class extends superclass implements DescriptionSchema {
        get description() {
            return this.prop("description", "");
        }

        set description(string) {
            this.setProp("description", string);
        }

        get descriptionObject() {
            return this.prop<DescriptionSchema["descriptionObject"]>("descriptionObject");
        }

        set descriptionObject(obj) {
            this.setProp("descriptionObject", obj);
        }
    };
}

export function HasConsistencyChecksMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class HasConsistencyChecksMixin extends superclass implements HasConsistencyCheckSchema {
        get consistencyChecks(): ConsistencyCheck[] {
            return this.prop("consistencyChecks", []);
        }

        set consistencyChecks(array: ConsistencyCheck[]) {
            this.setProp("consistencyChecks", array);
        }

        addConsistencyChecks(array: ConsistencyCheck[]) {
            this.consistencyChecks = [...this.consistencyChecks, ...array];
        }
    };
}

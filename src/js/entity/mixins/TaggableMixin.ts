import type { Constructor } from "../../utils/types";
import { InMemoryEntity } from "../in_memory";

export function taggableMixin<T extends InMemoryEntity>(item: T) {
    // @ts-expect-error
    const properties: InMemoryEntity & TaggableInMemoryEntity = {
        get tags(): string[] {
            return this.prop("tags", []);
        },
        set tags(array: string[]) {
            this.setProp("tags", array);
        },
        setTags(array: string[]) {
            this.tags = array.filter((value, index, self) => self.indexOf(value) === index);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

export type TaggableInMemoryEntity = {
    tags: string[];
    setTags: (array: string[]) => void;
};

export type TaggableInMemoryEntityConstructor = Constructor<TaggableInMemoryEntity>;

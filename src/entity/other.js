import { mix } from "mixwith";
import { InMemoryEntity } from "./in_memory";
import { DefaultableMixin, HasMetadataMixin, NamedEntityMixin } from "./mixins";

export class DefaultableInMemoryEntity extends mix(InMemoryEntity).with(
    DefaultableMixin
) {

}

export class NamedInMemoryEntity extends mix(InMemoryEntity).with(
    NamedEntityMixin
) {

}
export class NamedDefaultableInMemoryEntity extends mix(InMemoryEntity).with(
    DefaultableMixin,
    NamedEntityMixin,
) {

}

export class HasMetadataNamedDefaultableInMemoryEntity extends mix(InMemoryEntity).with(
    DefaultableMixin,
    NamedEntityMixin,
    HasMetadataMixin,
) {

}

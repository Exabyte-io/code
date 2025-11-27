import type { Constructor } from "../utils/types";
import { InMemoryEntity } from "./in_memory";
import { type Defaultable } from "./mixins/DefaultableMixin";
import { type HasConsistencyChecks } from "./mixins/HasConsistencyChecksMixin";
import { type HasMetadata } from "./mixins/HasMetadataMixin";
import { type NamedEntity } from "./mixins/NamedEntityMixin";
type DefaultableBase = typeof InMemoryEntity & Constructor<Defaultable>;
type NamedBase = typeof InMemoryEntity & Constructor<NamedEntity>;
type NamedDefaultableBase = typeof InMemoryEntity & Constructor<Defaultable> & Constructor<NamedEntity>;
type HasMetadataNamedDefaultableBase = typeof InMemoryEntity & Constructor<Defaultable> & Constructor<NamedEntity> & Constructor<HasMetadata>;
type HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase = typeof HasMetadataNamedDefaultableInMemoryEntity & Constructor<HasConsistencyChecks>;
declare const DefaultableInMemoryEntity_base: DefaultableBase;
export declare class DefaultableInMemoryEntity extends DefaultableInMemoryEntity_base {
}
declare const NamedInMemoryEntity_base: NamedBase;
export declare class NamedInMemoryEntity extends NamedInMemoryEntity_base {
}
declare const NamedDefaultableInMemoryEntity_base: NamedDefaultableBase;
export declare class NamedDefaultableInMemoryEntity extends NamedDefaultableInMemoryEntity_base {
}
declare const HasMetadataNamedDefaultableInMemoryEntity_base: HasMetadataNamedDefaultableBase;
export declare class HasMetadataNamedDefaultableInMemoryEntity extends HasMetadataNamedDefaultableInMemoryEntity_base {
}
declare const HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity_base: HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase;
export declare class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity_base {
}
export {};

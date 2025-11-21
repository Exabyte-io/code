import { InMemoryEntity } from "./in_memory";
import { type DefaultableInMemoryEntityConstructor } from "./mixins/DefaultableMixin";
import { type HasConsistencyChecksInMemoryEntityConstructor } from "./mixins/HasConsistencyChecksMixin";
import { type HasMetadataInMemoryEntityConstructor } from "./mixins/HasMetadataMixin";
import { type NamedInMemoryEntityConstructor } from "./mixins/NamedEntityMixin";
type DefaultableBase = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor;
type NamedBase = typeof InMemoryEntity & NamedInMemoryEntityConstructor;
type NamedDefaultableBase = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor & NamedInMemoryEntityConstructor;
type HasMetadataNamedDefaultableBase = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor & NamedInMemoryEntityConstructor & HasMetadataInMemoryEntityConstructor;
type HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase = typeof HasMetadataNamedDefaultableInMemoryEntity & HasConsistencyChecksInMemoryEntityConstructor;
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

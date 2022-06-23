import { mix } from "mixwith";
import { InMemoryEntity } from "./in_memory";
import { DefaultableMixin, HasMetadataMixin, NamedEntityMixin } from "./mixins/props";
import { ContextAndRenderFieldsMixin } from "./mixins/context";
import { HashedEntityMixin } from "./mixins/hash";
import { HasRepetitionMixin } from "./mixins/repetition";
import { RuntimeItemsUILogicMixin, RuntimeItemsUIAllowedMixin } from "./mixins/runtime_items";

export class DefaultableInMemoryEntity extends mix(InMemoryEntity).with(DefaultableMixin) {}

export class NamedInMemoryEntity extends mix(InMemoryEntity).with(NamedEntityMixin) {}

export class NamedDefaultableInMemoryEntity extends mix(InMemoryEntity).with(
    DefaultableMixin,
    NamedEntityMixin,
) {}

export class HasMetadataNamedDefaultableInMemoryEntity extends mix(InMemoryEntity).with(
    DefaultableMixin,
    NamedEntityMixin,
    HasMetadataMixin,
) {}

export class NamedDefaultableRepetitionContextAndRenderInMemoryEntity extends mix(
    InMemoryEntity,
).with(DefaultableMixin, NamedEntityMixin, HasRepetitionMixin, ContextAndRenderFieldsMixin) {}

export class NamedDefaultableRepetitionRuntimeContextAndRenderInMemoryEntity extends mix(
    InMemoryEntity,
).with(
    DefaultableMixin,
    NamedEntityMixin,
    HasRepetitionMixin,
    ContextAndRenderFieldsMixin,
    RuntimeItemsUILogicMixin,
    RuntimeItemsUIAllowedMixin,
    HashedEntityMixin,
) {}

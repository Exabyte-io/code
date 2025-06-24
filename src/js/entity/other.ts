import { InMemoryEntity } from "./in_memory";
import { ContextAndRenderFieldsMixin, ImportantSettingsProviderMixin } from "./mixins/context";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
    defaultableEntityStaticMixin,
} from "./mixins/DefaultableMixin";
import {
    type HasConsistencyChecksInMemoryEntityConstructor,
    hasConsistencyChecksMixin,
} from "./mixins/HasConsistencyChecksMixin";
import { HashedEntityMixin } from "./mixins/hash";
import {
    type HasMetadataInMemoryEntityConstructor,
    hasMetadataMixin,
} from "./mixins/HasMetadataMixin";
import { type NamedInMemoryEntityConstructor, namedEntityMixin } from "./mixins/NamedEntityMixin";
import { HasRepetitionMixin } from "./mixins/repetition";
import { RuntimeItemsUIAllowedMixin, RuntimeItemsUILogicMixin } from "./mixins/runtime_items";

type DefaultableBase = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor;

type NamedBase = typeof InMemoryEntity & NamedInMemoryEntityConstructor;

type NamedDefaultableBase = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor;

type HasMetadataNamedDefaultableBase = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    HasMetadataInMemoryEntityConstructor;

type HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase =
    typeof HasMetadataNamedDefaultableInMemoryEntity &
        HasConsistencyChecksInMemoryEntityConstructor;

export class DefaultableInMemoryEntity extends (InMemoryEntity as DefaultableBase) {}
defaultableEntityMixin(DefaultableInMemoryEntity.prototype);
defaultableEntityStaticMixin(DefaultableInMemoryEntity);

export class NamedInMemoryEntity extends (InMemoryEntity as NamedBase) {}
namedEntityMixin(NamedInMemoryEntity.prototype);

export class NamedDefaultableInMemoryEntity extends (DefaultableInMemoryEntity as NamedDefaultableBase) {}
namedEntityMixin(NamedDefaultableInMemoryEntity.prototype);

export class HasMetadataNamedDefaultableInMemoryEntity extends (NamedDefaultableInMemoryEntity as HasMetadataNamedDefaultableBase) {}
hasMetadataMixin(HasMetadataNamedDefaultableInMemoryEntity.prototype);

export class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends (HasMetadataNamedDefaultableInMemoryEntity as HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase) {}
hasConsistencyChecksMixin(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);

export const NamedDefaultableRepetitionImportantSettingsInMemoryEntity =
    ImportantSettingsProviderMixin(HasRepetitionMixin(NamedDefaultableInMemoryEntity));

export const NamedDefaultableRepetitionContextAndRenderInMemoryEntity = ContextAndRenderFieldsMixin(
    HasRepetitionMixin(NamedDefaultableInMemoryEntity),
);

export const NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity =
    HashedEntityMixin(
        ContextAndRenderFieldsMixin(
            ImportantSettingsProviderMixin(
                RuntimeItemsUIAllowedMixin(
                    RuntimeItemsUILogicMixin(HasRepetitionMixin(NamedDefaultableInMemoryEntity)),
                ),
            ),
        ),
    );

import { InMemoryEntity } from "./in_memory";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "./mixins/DefaultableMixin";
import {
    type HasConsistencyChecksInMemoryEntityConstructor,
    hasConsistencyChecksMixin,
} from "./mixins/HasConsistencyChecksMixin";
import {
    type HasMetadataInMemoryEntityConstructor,
    hasMetadataMixin,
} from "./mixins/HasMetadataMixin";
import { type NamedInMemoryEntityConstructor, namedEntityMixin } from "./mixins/NamedEntityMixin";

type DefaultableBase = typeof InMemoryEntity & DefaultableInMemoryEntityConstructor;

type NamedBase = typeof InMemoryEntity & NamedInMemoryEntityConstructor;

type NamedDefaultableBase = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor;

type HasMetadataNamedDefaultableBase = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    HasMetadataInMemoryEntityConstructor;

type HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase = typeof InMemoryEntity &
    DefaultableInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    HasConsistencyChecksInMemoryEntityConstructor;

export class DefaultableInMemoryEntity extends (InMemoryEntity as DefaultableBase) {}
defaultableEntityMixin(DefaultableInMemoryEntity);

export class NamedInMemoryEntity extends (InMemoryEntity as NamedBase) {}
namedEntityMixin(NamedInMemoryEntity.prototype);

export class NamedDefaultableInMemoryEntity extends (InMemoryEntity as NamedDefaultableBase) {}
namedEntityMixin(NamedDefaultableInMemoryEntity.prototype);
defaultableEntityMixin(NamedDefaultableInMemoryEntity);

export class HasMetadataNamedDefaultableInMemoryEntity extends (InMemoryEntity as HasMetadataNamedDefaultableBase) {}
namedEntityMixin(HasMetadataNamedDefaultableInMemoryEntity.prototype);
defaultableEntityMixin(HasMetadataNamedDefaultableInMemoryEntity);
hasMetadataMixin(HasMetadataNamedDefaultableInMemoryEntity.prototype);

export class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends (InMemoryEntity as HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase) {}
namedEntityMixin(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
defaultableEntityMixin(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity);
hasMetadataMixin(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
hasConsistencyChecksMixin(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);

// export const NamedDefaultableRepetitionImportantSettingsInMemoryEntity =
//     ImportantSettingsProviderMixin(HasRepetitionMixin(NamedDefaultableInMemoryEntity));

// export const NamedDefaultableRepetitionContextAndRenderInMemoryEntity = ContextAndRenderFieldsMixin(
//     HasRepetitionMixin(NamedDefaultableInMemoryEntity),
// );

// export const NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity =
//     HashedEntityMixin(
//         ContextAndRenderFieldsMixin(
//             ImportantSettingsProviderMixin(
//                 RuntimeItemsUIAllowedMixin(
//                     RuntimeItemsUILogicMixin(HasRepetitionMixin(NamedDefaultableInMemoryEntity)),
//                 ),
//             ),
//         ),
//     );

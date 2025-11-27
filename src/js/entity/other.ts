import type { Constructor } from "../utils/types";
import { InMemoryEntity } from "./in_memory";
// import { ContextAndRenderFieldsMixin, ImportantSettingsProviderMixin } from "./mixins/context";
import { type Defaultable, defaultableEntityMixin } from "./mixins/DefaultableMixin";
import {
    type HasConsistencyChecks,
    hasConsistencyChecksMixin,
} from "./mixins/HasConsistencyChecksMixin";
// import { HashedEntityMixin } from "./mixins/hash";
import { type HasMetadata, hasMetadataMixin } from "./mixins/HasMetadataMixin";
import { type NamedEntity, namedEntityMixin } from "./mixins/NamedEntityMixin";
// import { HasRepetitionMixin } from "./mixins/repetition";

type DefaultableBase = typeof InMemoryEntity & Constructor<Defaultable>;

type NamedBase = typeof InMemoryEntity & Constructor<NamedEntity>;

type NamedDefaultableBase = typeof InMemoryEntity &
    Constructor<Defaultable> &
    Constructor<NamedEntity>;

type HasMetadataNamedDefaultableBase = typeof InMemoryEntity &
    Constructor<Defaultable> &
    Constructor<NamedEntity> &
    Constructor<HasMetadata>;

type HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntityBase =
    typeof HasMetadataNamedDefaultableInMemoryEntity & Constructor<HasConsistencyChecks>;

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

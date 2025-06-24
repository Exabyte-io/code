import { InMemoryEntity } from "./in_memory";
import { ContextAndRenderFieldsMixin, ImportantSettingsProviderMixin } from "./mixins/context";
import { defaultableEntityMixin, defaultableEntityStaticMixin } from "./mixins/DefaultableMixin";
import { hasConsistencyChecksMixin } from "./mixins/HasConsistencyChecksMixin";
import { HashedEntityMixin } from "./mixins/hash";
import { hasMetadataMixin } from "./mixins/HasMetadataMixin";
import { namedEntityMixin } from "./mixins/NamedEntityMixin";
import { HasRepetitionMixin } from "./mixins/repetition";
import { RuntimeItemsUIAllowedMixin, RuntimeItemsUILogicMixin } from "./mixins/runtime_items";

export class DefaultableInMemoryEntity extends InMemoryEntity {}
defaultableEntityMixin(DefaultableInMemoryEntity.prototype);
defaultableEntityStaticMixin(DefaultableInMemoryEntity);

export class NamedInMemoryEntity extends InMemoryEntity {}
namedEntityMixin(NamedInMemoryEntity.prototype);

export class NamedDefaultableInMemoryEntity extends DefaultableInMemoryEntity {}
namedEntityMixin(NamedDefaultableInMemoryEntity.prototype);

export class HasMetadataNamedDefaultableInMemoryEntity extends NamedDefaultableInMemoryEntity {}
hasMetadataMixin(HasMetadataNamedDefaultableInMemoryEntity.prototype);

export class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends HasMetadataNamedDefaultableInMemoryEntity {}
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

import { InMemoryEntity } from "./in_memory";
import { ContextAndRenderFieldsMixin, ImportantSettingsProviderMixin } from "./mixins/context";
import { HashedEntityMixin } from "./mixins/hash";
import {
    DefaultableMixin,
    HasConsistencyChecksMixin,
    HasMetadataMixin,
    NamedEntityMixin,
} from "./mixins/props";
import { HasRepetitionMixin } from "./mixins/repetition";
import { RuntimeItemsUIAllowedMixin, RuntimeItemsUILogicMixin } from "./mixins/runtime_items";

export class DefaultableInMemoryEntity extends DefaultableMixin(InMemoryEntity) {}

export const NamedInMemoryEntity = NamedEntityMixin(InMemoryEntity);

export const NamedDefaultableInMemoryEntity = NamedEntityMixin(DefaultableMixin(InMemoryEntity));

export const HasMetadataNamedDefaultableInMemoryEntity = HasMetadataMixin(
    NamedEntityMixin(DefaultableMixin(InMemoryEntity)),
);

export const HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity =
    HasConsistencyChecksMixin(HasMetadataNamedDefaultableInMemoryEntity);

export const NamedDefaultableRepetitionImportantSettingsInMemoryEntity =
    ImportantSettingsProviderMixin(
        HasRepetitionMixin(NamedEntityMixin(DefaultableMixin(InMemoryEntity))),
    );

export const NamedDefaultableRepetitionContextAndRenderInMemoryEntity = ContextAndRenderFieldsMixin(
    HasRepetitionMixin(NamedEntityMixin(DefaultableMixin(InMemoryEntity))),
);

export const NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity =
    HashedEntityMixin(
        ContextAndRenderFieldsMixin(
            ImportantSettingsProviderMixin(
                RuntimeItemsUIAllowedMixin(
                    RuntimeItemsUILogicMixin(
                        HasRepetitionMixin(NamedEntityMixin(DefaultableMixin(InMemoryEntity))),
                    ),
                ),
            ),
        ),
    );

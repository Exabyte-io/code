"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity = exports.NamedDefaultableRepetitionContextAndRenderInMemoryEntity = exports.NamedDefaultableRepetitionImportantSettingsInMemoryEntity = exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = exports.HasMetadataNamedDefaultableInMemoryEntity = exports.NamedDefaultableInMemoryEntity = exports.NamedInMemoryEntity = exports.DefaultableInMemoryEntity = void 0;
const in_memory_1 = require("./in_memory");
const context_1 = require("./mixins/context");
const DefaultableMixin_1 = require("./mixins/DefaultableMixin");
const HasConsistencyChecksMixin_1 = require("./mixins/HasConsistencyChecksMixin");
const hash_1 = require("./mixins/hash");
const HasMetadataMixin_1 = require("./mixins/HasMetadataMixin");
const NamedEntityMixin_1 = require("./mixins/NamedEntityMixin");
const repetition_1 = require("./mixins/repetition");
const runtime_items_1 = require("./mixins/runtime_items");
class DefaultableInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.DefaultableInMemoryEntity = DefaultableInMemoryEntity;
(0, DefaultableMixin_1.defaultableEntityMixin)(DefaultableInMemoryEntity);
class NamedInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.NamedInMemoryEntity = NamedInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(NamedInMemoryEntity.prototype);
class NamedDefaultableInMemoryEntity extends DefaultableInMemoryEntity {
}
exports.NamedDefaultableInMemoryEntity = NamedDefaultableInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(NamedDefaultableInMemoryEntity.prototype);
class HasMetadataNamedDefaultableInMemoryEntity extends NamedDefaultableInMemoryEntity {
}
exports.HasMetadataNamedDefaultableInMemoryEntity = HasMetadataNamedDefaultableInMemoryEntity;
(0, HasMetadataMixin_1.hasMetadataMixin)(HasMetadataNamedDefaultableInMemoryEntity.prototype);
class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends HasMetadataNamedDefaultableInMemoryEntity {
}
exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity;
(0, HasConsistencyChecksMixin_1.hasConsistencyChecksMixin)(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
exports.NamedDefaultableRepetitionImportantSettingsInMemoryEntity = (0, context_1.ImportantSettingsProviderMixin)((0, repetition_1.HasRepetitionMixin)(NamedDefaultableInMemoryEntity));
exports.NamedDefaultableRepetitionContextAndRenderInMemoryEntity = (0, context_1.ContextAndRenderFieldsMixin)((0, repetition_1.HasRepetitionMixin)(NamedDefaultableInMemoryEntity));
exports.NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity = (0, hash_1.HashedEntityMixin)((0, context_1.ContextAndRenderFieldsMixin)((0, context_1.ImportantSettingsProviderMixin)((0, runtime_items_1.RuntimeItemsUIAllowedMixin)((0, runtime_items_1.RuntimeItemsUILogicMixin)((0, repetition_1.HasRepetitionMixin)(NamedDefaultableInMemoryEntity))))));

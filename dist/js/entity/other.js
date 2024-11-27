"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity = exports.NamedDefaultableRepetitionContextAndRenderInMemoryEntity = exports.NamedDefaultableRepetitionImportantSettingsInMemoryEntity = exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = exports.HasMetadataNamedDefaultableInMemoryEntity = exports.NamedDefaultableInMemoryEntity = exports.NamedInMemoryEntity = exports.DefaultableInMemoryEntity = void 0;
const in_memory_1 = require("./in_memory");
const context_1 = require("./mixins/context");
const hash_1 = require("./mixins/hash");
const props_1 = require("./mixins/props");
const repetition_1 = require("./mixins/repetition");
const runtime_items_1 = require("./mixins/runtime_items");
class DefaultableInMemoryEntity extends (0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity) {
}
exports.DefaultableInMemoryEntity = DefaultableInMemoryEntity;
exports.NamedInMemoryEntity = (0, props_1.NamedEntityMixin)(in_memory_1.InMemoryEntity);
exports.NamedDefaultableInMemoryEntity = (0, props_1.NamedEntityMixin)((0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity));
class HasMetadataNamedDefaultableInMemoryEntity extends (0, props_1.HasMetadataMixin)((0, props_1.NamedEntityMixin)((0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity))) {
}
exports.HasMetadataNamedDefaultableInMemoryEntity = HasMetadataNamedDefaultableInMemoryEntity;
class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends (0, props_1.HasConsistencyChecksMixin)(HasMetadataNamedDefaultableInMemoryEntity) {
}
exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity;
exports.NamedDefaultableRepetitionImportantSettingsInMemoryEntity = (0, context_1.ImportantSettingsProviderMixin)((0, repetition_1.HasRepetitionMixin)((0, props_1.NamedEntityMixin)((0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity))));
exports.NamedDefaultableRepetitionContextAndRenderInMemoryEntity = (0, context_1.ContextAndRenderFieldsMixin)((0, repetition_1.HasRepetitionMixin)((0, props_1.NamedEntityMixin)((0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity))));
exports.NamedDefaultableRepetitionRuntimeItemsImportantSettingsContextAndRenderHashedInMemoryEntity = (0, hash_1.HashedEntityMixin)((0, context_1.ContextAndRenderFieldsMixin)((0, context_1.ImportantSettingsProviderMixin)((0, runtime_items_1.RuntimeItemsUIAllowedMixin)((0, runtime_items_1.RuntimeItemsUILogicMixin)((0, repetition_1.HasRepetitionMixin)((0, props_1.NamedEntityMixin)((0, props_1.DefaultableMixin)(in_memory_1.InMemoryEntity))))))));

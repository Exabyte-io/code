"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = exports.HasMetadataNamedDefaultableInMemoryEntity = exports.NamedDefaultableInMemoryEntity = exports.NamedInMemoryEntity = exports.DefaultableInMemoryEntity = void 0;
const in_memory_1 = require("./in_memory");
// import { ContextAndRenderFieldsMixin, ImportantSettingsProviderMixin } from "./mixins/context";
const DefaultableMixin_1 = require("./mixins/DefaultableMixin");
const HasConsistencyChecksMixin_1 = require("./mixins/HasConsistencyChecksMixin");
// import { HashedEntityMixin } from "./mixins/hash";
const HasMetadataMixin_1 = require("./mixins/HasMetadataMixin");
const NamedEntityMixin_1 = require("./mixins/NamedEntityMixin");
class DefaultableInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.DefaultableInMemoryEntity = DefaultableInMemoryEntity;
(0, DefaultableMixin_1.defaultableEntityMixin)(DefaultableInMemoryEntity);
class NamedInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.NamedInMemoryEntity = NamedInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(NamedInMemoryEntity.prototype);
class NamedDefaultableInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.NamedDefaultableInMemoryEntity = NamedDefaultableInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(NamedDefaultableInMemoryEntity.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(NamedDefaultableInMemoryEntity);
class HasMetadataNamedDefaultableInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.HasMetadataNamedDefaultableInMemoryEntity = HasMetadataNamedDefaultableInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(HasMetadataNamedDefaultableInMemoryEntity.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(HasMetadataNamedDefaultableInMemoryEntity);
(0, HasMetadataMixin_1.hasMetadataMixin)(HasMetadataNamedDefaultableInMemoryEntity.prototype);
class HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity extends in_memory_1.InMemoryEntity {
}
exports.HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity = HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity;
(0, NamedEntityMixin_1.namedEntityMixin)(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
(0, DefaultableMixin_1.defaultableEntityMixin)(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity);
(0, HasMetadataMixin_1.hasMetadataMixin)(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
(0, HasConsistencyChecksMixin_1.hasConsistencyChecksMixin)(HasConsistencyChecksHasMetadataNamedDefaultableInMemoryEntity.prototype);
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

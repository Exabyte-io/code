import _ from "underscore";
import {mix} from "mixwith";

import { InMemoryEntity } from "./in_memory";
import {NamedEntityMixin, TaggableMixin } from "./mixins";
import {InMemoryEntitySetMixin, InMemoryEntityInSetMixin } from "./set/mixins";

export class InMemoryEntitySet extends mix(InMemoryEntity).with(
    InMemoryEntitySetMixin,
    InMemoryEntityInSetMixin,
    NamedEntityMixin,
    TaggableMixin,
) {

    get isEntitySet() {return this.prop('isEntitySet')}

    get entitySetType() {return this.prop('entitySetType')}

    get entityCls() {return this.prop('entityCls')}

    get cls() {return this.entityCls || super.cls}

    toJSONForInclusionInEntity() {
        return _.pick(this.toJSON(), ['_id', 'type']);

    }

}

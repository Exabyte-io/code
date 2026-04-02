import { InMemoryEntity } from "./in_memory";
import { inMemoryEntityInSetMixin } from "./set/InMemoryEntityInSetMixin";
import InMemoryEntitySetBaseMixin from "./set/InMemoryEntitySetBaseMixin";
import { InMemoryEntitySetMixin } from "./set/mixins";

export class InMemoryEntitySet extends InMemoryEntitySetMixin(
    InMemoryEntitySetBaseMixin(InMemoryEntity),
) {}

inMemoryEntityInSetMixin(InMemoryEntitySet.prototype);

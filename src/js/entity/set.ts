import { InMemoryEntity } from "./in_memory";
import InMemoryEntitySetBaseMixin from "./set/InMemoryEntitySetBaseMixin";
import { InMemoryEntityInSetMixin, InMemoryEntitySetMixin } from "./set/mixins";

export class InMemoryEntitySet extends InMemoryEntitySetMixin(
    InMemoryEntityInSetMixin(InMemoryEntitySetBaseMixin(InMemoryEntity)),
) {}

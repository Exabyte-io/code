import { mix } from "mixwith";

import { InMemoryEntitySet } from "../set";
import { OrderedInMemoryEntityInSetMixin, OrderedInMemoryEntitySetMixin } from "./ordered/mixins";

export class OrderedInMemoryEntitySet extends mix(InMemoryEntitySet).with(
    OrderedInMemoryEntitySetMixin,
    OrderedInMemoryEntityInSetMixin,
) {}

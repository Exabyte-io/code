import { InMemoryEntitySet } from "../set";
import { OrderedInMemoryEntityInSetMixin, OrderedInMemoryEntitySetMixin } from "./ordered/mixins";

export const OrderedInMemoryEntitySet = OrderedInMemoryEntitySetMixin(
    OrderedInMemoryEntityInSetMixin(InMemoryEntitySet),
);

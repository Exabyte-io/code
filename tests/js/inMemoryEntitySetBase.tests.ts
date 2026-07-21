/* eslint-disable no-unused-expressions */
import type { BaseInMemoryEntitySchema, EntitySetSchema } from "@mat3ra/esse/dist/js/types";
import { expect } from "chai";

import { InMemoryEntity } from "../../src/js/entity/in_memory";
import {
    type InMemoryEntitySetBaseMixin,
    inMemoryEntitySetBaseMixin,
} from "../../src/js/entity/set/InMemoryEntitySetBaseMixin";

type WiderEntitySetSchema = BaseInMemoryEntitySchema &
    EntitySetSchema & {
        owner?: string;
    };

/**
 * Mirrors web-app CoreEntitySet: schema-generic class + interface merge of the
 * mixin shape (not InMemoryEntitySetBase, which bakes in a narrower `_json`).
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface WiderEntitySet extends InMemoryEntitySetBaseMixin {}

class WiderEntitySet extends InMemoryEntity<WiderEntitySetSchema> {}

inMemoryEntitySetBaseMixin(WiderEntitySet.prototype);

describe("InMemoryEntitySetBaseMixin", () => {
    it("merges into a schema-generic InMemoryEntity subclass without _json conflict", () => {
        const entity = new WiderEntitySet({
            _id: "set-1",
            isEntitySet: true,
            entitySetType: "unordered",
            owner: "account-1",
        });

        expect(entity.isEntitySet).to.equal(true);
        expect(entity.entitySetType).to.equal("unordered");
        expect(entity._json.owner).to.equal("account-1");
        expect(entity.toJSONForInclusionInEntity()).to.deep.equal({
            _id: "set-1",
            type: undefined,
        });
    });
});

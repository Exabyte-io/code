/* eslint-disable max-classes-per-file, class-methods-use-this */
import { expect } from "chai";

import {
    InMemoryEntity,
    NamedInMemoryEntity,
    RuntimeItemsMixin,
} from "../../../src/js/entity/index";
import {
    defaultableEntityMixin,
    defaultableEntityStaticMixin,
} from "../../../src/js/entity/mixins/DefaultableMixin";
import { extendClass, extendThis } from "../../../src/js/utils/class";

class BaseEntity extends RuntimeItemsMixin(InMemoryEntity) {
    baseMethod() {
        return "base";
    }
}

class ExtendClassEntity extends NamedInMemoryEntity {
    declare results: unknown;

    constructor(config: object, excluded = []) {
        super(config);
        extendClass(ExtendClassEntity, BaseEntity, excluded, [config]);
    }

    baseMethod() {
        return "derived";
    }
}

defaultableEntityStaticMixin(ExtendClassEntity);
defaultableEntityMixin(ExtendClassEntity.prototype);

class BaseBetweenEntity extends NamedInMemoryEntity {
    static staticAttr = "base";

    instanceAttr = "base";

    constructor(config: object) {
        super(config);
        this.instanceAttr = "base";
    }

    betweenMethod() {
        return "base";
    }
}

class BetweenEntity extends BaseBetweenEntity {
    static staticAttr = "between";

    constructor(config: object) {
        super(config);
        this.instanceAttr = "between";
    }

    betweenMethod() {
        return "between";
    }
}

class ExtendThisEntity extends BetweenEntity {
    declare results: unknown;

    constructor(config: object) {
        super(config);
        extendThis(ExtendThisEntity, BaseEntity, config);
    }

    baseMethod() {
        return "derived";
    }
}

defaultableEntityStaticMixin(ExtendThisEntity);
defaultableEntityMixin(ExtendThisEntity.prototype);

describe("extendClass", () => {
    it("extends classes no excluded props", () => {
        const obj = new ExtendClassEntity({});
        expect(obj.baseMethod()).to.be.equal("base");
    });

    it("should support excluded props but doesnt", () => {
        const obj = new ExtendClassEntity({});
        expect(obj.baseMethod()).not.to.be.equal("derived");
    });

    it("should have results but doesnt", () => {
        const obj = new ExtendClassEntity({ results: ["test"] });
        expect(JSON.stringify(obj.results)).not.to.be.equal(JSON.stringify([{ name: "test" }]));
    });
});

describe("extendThis", () => {
    it("extends this prefer child method", () => {
        const obj = new ExtendThisEntity({});
        expect(obj.baseMethod()).to.be.equal("derived");
    });

    it("extends this support base mixins", () => {
        const obj = new ExtendThisEntity({ results: ["test"] });
        expect(JSON.stringify(obj.results)).to.be.equal(JSON.stringify([{ name: "test" }]));
    });

    it("remembers intermediate methods", () => {
        const base = new BaseBetweenEntity({});
        expect(base.betweenMethod()).to.be.equal("base");
        const obj = new ExtendThisEntity({});
        expect(obj.betweenMethod()).to.be.equal("between");
    });

    it("propagates instance attributes", () => {
        const base = new BaseBetweenEntity({});
        expect(base.instanceAttr).to.be.equal("base");
        const obj = new ExtendThisEntity({});
        expect(obj.instanceAttr).to.be.equal("between");
    });

    it("propagates static attributes", () => {
        expect(BaseBetweenEntity.staticAttr).to.be.equal("base");
        expect(ExtendThisEntity.staticAttr).to.be.equal("between");
    });
});

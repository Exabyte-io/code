Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-classes-per-file, class-methods-use-this */
const chai_1 = require("chai");
const index_1 = require("../../../src/js/entity/index");
const class_1 = require("../../../src/js/utils/class");

class BaseEntity extends (0, index_1.RuntimeItemsMixin)(index_1.InMemoryEntity) {
    baseMethod() {
        return "base";
    }
}
class ExtendClassEntity extends (0, index_1.DefaultableMixin)(index_1.NamedInMemoryEntity) {
    constructor(config, excluded = []) {
        super(config);
        (0, class_1.extendClass)(ExtendClassEntity, BaseEntity, excluded, [config]);
    }

    baseMethod() {
        return "derived";
    }
}
class BaseBetweenEntity extends index_1.NamedInMemoryEntity {
    constructor(config) {
        super(config);
        this.instanceAttr = "base";
        this.instanceAttr = "base";
    }

    betweenMethod() {
        return "base";
    }
}
BaseBetweenEntity.staticAttr = "base";
class BetweenEntity extends BaseBetweenEntity {
    constructor(config) {
        super(config);
        this.instanceAttr = "between";
    }

    betweenMethod() {
        return "between";
    }
}
BetweenEntity.staticAttr = "between";
class ExtendThisEntity extends (0, index_1.DefaultableMixin)(BetweenEntity) {
    constructor(config) {
        super(config);
        (0, class_1.extendThis)(ExtendThisEntity, BaseEntity, config);
    }

    baseMethod() {
        return "derived";
    }
}
describe("extendClass", () => {
    it("extends classes no excluded props", () => {
        const obj = new ExtendClassEntity({});
        (0, chai_1.expect)(obj.baseMethod()).to.be.equal("base");
    });
    it("should support excluded props but doesnt", () => {
        const obj = new ExtendClassEntity({});
        (0, chai_1.expect)(obj.baseMethod()).not.to.be.equal("derived");
    });
    it("should have results but doesnt", () => {
        const obj = new ExtendClassEntity({ results: ["test"] });
        (0, chai_1.expect)(JSON.stringify(obj.results)).not.to.be.equal(
            JSON.stringify([{ name: "test" }]),
        );
    });
});
describe("extendThis", () => {
    it("extends this prefer child method", () => {
        const obj = new ExtendThisEntity({});
        (0, chai_1.expect)(obj.baseMethod()).to.be.equal("derived");
    });
    it("extends this support base mixins", () => {
        const obj = new ExtendThisEntity({ results: ["test"] });
        (0, chai_1.expect)(JSON.stringify(obj.results)).to.be.equal(
            JSON.stringify([{ name: "test" }]),
        );
    });
    it("remembers intermediate methods", () => {
        const base = new BaseBetweenEntity({});
        (0, chai_1.expect)(base.betweenMethod()).to.be.equal("base");
        const obj = new ExtendThisEntity({});
        (0, chai_1.expect)(obj.betweenMethod()).to.be.equal("between");
    });
    it("propagates instance attributes", () => {
        const base = new BaseBetweenEntity({});
        (0, chai_1.expect)(base.instanceAttr).to.be.equal("base");
        const obj = new ExtendThisEntity({});
        (0, chai_1.expect)(obj.instanceAttr).to.be.equal("between");
    });
    it("propagates static attributes", () => {
        (0, chai_1.expect)(BaseBetweenEntity.staticAttr).to.be.equal("base");
        (0, chai_1.expect)(ExtendThisEntity.staticAttr).to.be.equal("between");
    });
});

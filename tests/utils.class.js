import { mix } from "mixwith";
import { expect } from "chai";
import { InMemoryEntity, NamedInMemoryEntity, DefaultableMixin, RuntimeItemsMixin } from "../src/entity";
import { deepClone } from "../src/utils/clone";
import { extendClass, extendThis } from "../src/utils/class";


class BaseEntity extends mix(InMemoryEntity).with(RuntimeItemsMixin) {

    constructor(config) {
        super(config);
    }

    baseMethod() {
        return "base";
    }

}


class ExtendClassEntity extends mix(NamedInMemoryEntity).with(DefaultableMixin) {

    constructor(config, excluded = []) {
        super(config);
        extendClass(ExtendClassEntity, BaseEntity, excluded, [config]);

    }

    baseMethod() {
        return "derived";
    }

}


class BaseBetweenEntity extends NamedInMemoryEntity {

    static staticAttr = "base";

    constructor(config) {
        super(config);
        this.instanceAttr = "base";
    }

    betweenMethod() {
        return "base";
    }

}


class BetweenEntity extends BaseBetweenEntity {

    static staticAttr = "between";

    constructor(config) {
        super(config);
        this.instanceAttr = "between";
    }

    betweenMethod() {
        return "between";
    }
}


class ExtendThisEntity extends mix(BetweenEntity).with(DefaultableMixin) {

    constructor(config, excluded = []) {
        super(config);
        extendThis(ExtendThisEntity, BaseEntity, config);

    }

    baseMethod() {
        return "derived";
    }

}


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
        const obj = new ExtendClassEntity({"results": ["test"]});
        expect(JSON.stringify(obj.results)).not.to.be.equal(JSON.stringify([{"name": "test"}]));
    });

});


describe("extendThis", () => {

    it("extends this prefer child method", () => {
        const obj = new ExtendThisEntity({});
        expect(obj.baseMethod()).to.be.equal("derived");
    });

    it("extends this support base mixins", () => {
        const obj = new ExtendThisEntity({"results": ["test"]});
        expect(JSON.stringify(obj.results)).to.be.equal(JSON.stringify([{"name": "test"}]));
    });

    it("remembers intermediate methods", () => {
        const base = new BaseBetweenEntity();
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

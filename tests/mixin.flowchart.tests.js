/* eslint-disable max-classes-per-file */
import { expect } from "chai";
import { mix } from "mixwith";

import { FlowchartEntityMixin, FlowchartItemMixin, InMemoryEntity } from "../src/entity";

class FlowchartEntity extends mix(InMemoryEntity).with(FlowchartEntityMixin) {}

class FlowchartItem extends mix(InMemoryEntity).with(FlowchartItemMixin) {}

describe("Flowchart Mixins", () => {
    it("flowchart item can be added", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        expect(entity.units.length).to.be.equal(1);
    });

    it("flowchart item can be added inbetween", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        expect(entity.units[0].next).to.be.equal(entity.units[1].flowchartId);
        const item = new FlowchartItem();
        entity.addUnit(item, 1);
        expect(entity.units[1].flowchartId).to.be.equal(item.flowchartId);
        expect(entity.units[1].next).to.be.equal(entity.units[2].flowchartId);
    });

    it("flowchart item points to correct target after removalof inbetween unit", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.removeUnit(entity.units[1].flowchartId);
        expect(entity.units[0].next).to.be.equal(entity.units[1].flowchartId);
    });

    it("flowchart item points to correct target after removal of last unit", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.removeUnit(entity.units[2].flowchartId);
        // eslint-disable-next-line no-unused-expressions
        expect(entity.units[1].next).to.be.null;
    });

    it("flowchart item can be removed", () => {
        const entity = new FlowchartEntity();
        const item = new FlowchartItem();
        entity.addUnit(item);
        entity.removeUnit(item.flowchartId);
        expect(entity.units.length).to.be.equal(0);
    });

    it("flowchart item can be replaced inbetween", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const unitsBeforeReplace = entity.units.length;
        const item = new FlowchartItem();
        entity.replaceUnit(item, 1);
        expect(entity.units[1].flowchartId).to.be.equal(item.flowchartId);
        expect(entity.units.length).to.be.equal(unitsBeforeReplace);
    });

    it("flowchart item can be accessed by flowchart Id", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const item = new FlowchartItem();
        entity.addUnit(item);
        const fetchedUnit = entity.getUnit(item.flowchartId);
        expect(fetchedUnit._json).to.be.deep.equal(item._json);
    });

    it("flowchart item index can be found by flowchart Id", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const item = new FlowchartItem();
        entity.addUnit(item);
        const index = entity.getUnitIndexByFlowchartId(item.flowchartId);
        expect(index).to.be.equal(entity.units.length - 1); // last unit
    });
});

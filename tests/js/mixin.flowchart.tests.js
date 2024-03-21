Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const entity_1 = require("../../src/js/entity");

const FlowchartEntity = (0, entity_1.FlowchartEntityMixin)(entity_1.InMemoryEntity);
const FlowchartItem = (0, entity_1.FlowchartItemMixin)(entity_1.InMemoryEntity);
function assertString(prop) {
    (0, chai_1.expect)(prop).to.be.a("string");
    return typeof prop === "string";
}
describe("Flowchart Mixins", () => {
    it("flowchart item can be added", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        (0, chai_1.expect)(entity.units.length).to.be.equal(1);
    });
    it("flowchart item can be added between two other units", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        (0, chai_1.expect)(entity.units[0].next).to.be.equal(entity.units[1].flowchartId);
        const item = new FlowchartItem();
        entity.addUnit(item, 1);
        (0, chai_1.expect)(entity.units[1].flowchartId).to.be.equal(item.flowchartId);
        (0, chai_1.expect)(entity.units[1].next).to.be.equal(entity.units[2].flowchartId);
    });
    it("flowchart item points to correct target after removal of the in-between unit", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        if (assertString(entity.units[1].flowchartId)) {
            entity.removeUnit(entity.units[1].flowchartId);
        }
        (0, chai_1.expect)(entity.units[0].next).to.be.equal(entity.units[1].flowchartId);
    });
    it("flowchart item points to correct target after removal of last unit", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        if (assertString(entity.units[2].flowchartId)) {
            entity.removeUnit(entity.units[2].flowchartId);
        }
        // eslint-disable-next-line no-unused-expressions
        (0, chai_1.expect)(entity.units[1].next).to.be.undefined;
    });
    it("flowchart item can be removed", () => {
        const entity = new FlowchartEntity();
        const item = new FlowchartItem();
        entity.addUnit(item);
        entity.removeUnit(item.flowchartId);
        (0, chai_1.expect)(entity.units.length).to.be.equal(0);
    });
    it("flowchart item can be replaced between two other units", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const unitsBeforeReplace = entity.units.length;
        const item = new FlowchartItem();
        entity.replaceUnit(item, 1);
        (0, chai_1.expect)(entity.units[1].flowchartId).to.be.equal(item.flowchartId);
        (0, chai_1.expect)(entity.units.length).to.be.equal(unitsBeforeReplace);
    });
    it("flowchart item can be accessed by flowchart Id", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const item = new FlowchartItem();
        entity.addUnit(item);
        const fetchedUnit = entity.getUnit(item.flowchartId);
        (0, chai_1.expect)(fetchedUnit).to.be.instanceof(FlowchartItem);
        (0, chai_1.expect)(
            fetchedUnit === null || fetchedUnit === void 0 ? void 0 : fetchedUnit.flowchartId,
        ).to.be.equal(item.flowchartId);
    });
    it("flowchart item index can be found by flowchart Id", () => {
        const entity = new FlowchartEntity();
        entity.addUnit(new FlowchartItem());
        entity.addUnit(new FlowchartItem());
        const item = new FlowchartItem();
        entity.addUnit(item);
        const index = entity.getUnitIndexByFlowchartId(item.flowchartId);
        (0, chai_1.expect)(index).to.be.equal(entity.units.length - 1); // last unit
    });
});

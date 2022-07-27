import { expect } from "chai";
import { JSONSchemasInterface } from './../src/JSONSchemasInterface';

describe("JSONSchemasInterface", () => {

    it("can find schema", () => {
        const schema = JSONSchemasInterface.schemaById('workflow');
        expect(schema).to.be.an('object');
    });

});

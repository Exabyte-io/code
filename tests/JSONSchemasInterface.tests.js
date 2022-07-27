import { expect } from "chai";
import { JSONSchemasInterface } from './../src/utils/JSONSchemasInterface';

describe("JSONSchemasInterface", () => {

    it("can find schema", () => {
        const schema = JSONSchemasInterface.schemaById('workflow');
        expect(schema).to.be.an('object');
    });

});

/* eslint-disable no-unused-expressions */
import { assert, expect } from "chai";
import path from "path";

import { JSONSchemasInterface } from "../src/JSONSchemasInterface";
import { assertArray, assertObject } from "./utils";

describe("JSONSchemasInterface", () => {
    it("can find registered schemas; the schema is merged and clean", async () => {
        JSONSchemasInterface.setSchemaFolder(path.join(__dirname, "./fixtures/json/example1"));

        const schema = JSONSchemasInterface.schemaById("system/in-set");

        expect(schema).to.be.an("object");
        assert(schema?.$id, "system/in-set");
        expect(schema?.properties?.inSet).to.be.an("object");

        if (
            assertObject(schema?.properties?.inSet) &&
            assertObject(schema?.properties?.inSet?.items)
        ) {
            expect(schema?.properties?.inSet?.items?.$id).to.be.an("undefined");
            expect(schema?.properties?.inSet?.items?.properties).to.be.an("object");
        }

        if (
            assertObject(schema?.properties?.valueMapFunction) &&
            assertArray(schema?.properties?.valueMapFunction?.enum)
        ) {
            expect(schema?.properties?.valueMapFunction?.enum[0]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[1]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[2]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[3]).to.be.an("string");
            expect(schema?.properties?.valueMapFunction?.enum[4]).to.be.an("string");
        }
    });
});

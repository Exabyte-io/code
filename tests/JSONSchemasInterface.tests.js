import { expect } from "chai";

import { JSONSchemasInterface } from "../src/JSONSchemasInterface";
import { baseSchemas, mixSchemas } from "../src/utils/schemas";

describe("JSONSchemasInterface", () => {
    it("can find main schema", () => {
        Object.values(baseSchemas).forEach((schemaId) => {
            const schema = JSONSchemasInterface.schemaById(schemaId);
            expect(schema).to.be.an("object");
        });
    });

    it("can find mix schemas", () => {
        Object.values(mixSchemas).forEach((schemaIds) => {
            schemaIds.forEach((schemaId) => {
                const schema = JSONSchemasInterface.schemaById(schemaId);
                expect(schema).to.be.an("object");
            });
        });
    });

    it("can match schemas", () => {
        const schemaId = Object.values(baseSchemas)[0];
        const schema = JSONSchemasInterface.matchSchema({
            schemaId: {
                $regex: schemaId,
            },
        });

        expect(schema).to.be.an("object");
    });
});

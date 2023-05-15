import { expect } from "chai";

import { generateName } from "../../src/utils";

describe("generateName", () => {
    it("should substitute flat properties", () => {
        const template = "Hello {{ user }}!";
        const data = { user: "user001" };
        const substitutionMap = { user001: "John Doe" };

        const result = generateName(template, data, substitutionMap);

        expect(result).to.be.equal("Hello John Doe!");
    });

    it("should substitute nested properties", () => {
        const template = "Hello {{ parameters.user }}!";
        const data = { parameters: { user: "user001" } };
        const substitutionMap = { user001: "John Doe" };

        const result = generateName(template, data, substitutionMap);

        expect(result).to.be.equal("Hello John Doe!");
    });

    it("should leave properties without substitution unchanged", () => {
        const template = "Hello {{ user }}!";
        const data = { user: "user001" };
        const substitutionMap = {};

        const result = generateName(template, data, substitutionMap);

        expect(result).to.be.equal("Hello user001!");
    });
});

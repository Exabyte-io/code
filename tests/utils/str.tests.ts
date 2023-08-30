import { expect } from "chai";

import { renderTextWithSubstitutes } from "../../src/utils";

describe("renderTextWithSubstitutes", () => {
    it("should substitute flat properties", () => {
        const template = "Hello {{ user }}!";
        const data = { user: "user001" };
        const substitutionMap = { user001: "John Doe" };

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello John Doe!");
    });

    it("should substitute nested properties", () => {
        const template = "Hello {{ parameters.user }}!";
        const data = { parameters: { user: "user001" } };
        const substitutionMap = { user001: "John Doe" };

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello John Doe!");
    });

    it("should leave properties without substitution unchanged", () => {
        const template = "Hello {{ user }}!";
        const data = { user: "user001" };
        const substitutionMap = {};

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello user001!");
    });

    it("should return the original string if the template does not contain any variable", () => {
        const template = "Hello world!";
        const data = { user: "user001" };
        const substitutionMap = {};

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello world!");
    });

    it("should return the an empty string if the template is undefined", () => {
        const template = undefined;
        const data = { user: "user001" };
        const substitutionMap = {};

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("");
    });

    it("should replace the template variable with an empty string if the value is falsy", () => {
        const template = "Hello {{ user }}!";
        const data = { user: null };
        const substitutionMap = {};

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello !");
    });
});

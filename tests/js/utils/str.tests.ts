import { expect } from "chai";

import { findPreviousVersion, renderTextWithSubstitutes } from "../../../src/js/utils";

describe("str: renderTextWithSubstitutes", () => {
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

    it("should be able to access nested elements in template notation", () => {
        const template = "Hello {{ user }} of {{ array[1]['planet'] }}!";
        const data = { user: "user001", array: [{ planet: "A" }, { planet: "B" }] };
        const substitutionMap = {
            A: "Earth",
            B: "Mars",
        };

        const result = renderTextWithSubstitutes(template, data, substitutionMap);

        expect(result).to.be.equal("Hello user001 of Mars!");
    });
});

describe("str: findPreviousVersion", () => {
    const versions = ["5.4.2", "3.2", "6.2", "4", "7.2.1"];

    it("should find a previous semantic version", () => {
        const previous = findPreviousVersion(versions, "5.2");
        expect(previous).to.be.equal("4");
    });

    it("should return undefined if no previous version is found", () => {
        const previous = findPreviousVersion(versions, "2");
        // eslint-disable-next-line no-unused-expressions
        expect(previous).to.be.undefined;
    });
});

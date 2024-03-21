Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const file_1 = require("../../../src/js/utils/file");

describe("file utilities", () => {
    it("should create an object path from a file path", () => {
        const thisFile = "/code.js/tests/utils/file.tests.js";
        const objectPath = (0, file_1.createObjectPathFromFilePath)(thisFile, "/code.js");
        (0, chai_1.expect)(objectPath).to.be.equal("['tests']['utils']['file.tests']");
    });
});

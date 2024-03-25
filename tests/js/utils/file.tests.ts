import { expect } from "chai";

import { createObjectPathFromFilePath } from "../../../src/js/utils/file";

describe("file utilities", () => {
    it("should create an object path from a file path", () => {
        const thisFile = "/code.js/tests/utils/file.tests.js";
        const objectPath = createObjectPathFromFilePath(thisFile, "/code.js");
        expect(objectPath).to.be.equal("['tests']['utils']['file.tests']");
    });
});

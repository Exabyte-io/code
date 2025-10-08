/* eslint-disable no-unused-expressions */
import { expect } from "chai";
import fs from "fs";
import type { JSONSchema7 } from "json-schema";
import path from "path";

import generateShemaMixin from "../../src/js/generateSchemaMixin";

describe("generateSchemaMixin Tests", function () {
    // Increase timeout to 10 seconds because generateShemaMixin runs ESLint autofix
    // which can take several seconds to complete, especially on first run
    this.timeout(10000);
    const tempDir = path.join(__dirname, "temp_test_output");

    // Mock schemas for testing
    const mockSchemas: JSONSchema7[] = [
        {
            $id: "property/holder",
            title: "Property Holder",
            type: "object",
            properties: {
                metadata: { type: "object" },
                name: { type: "string" },
                description: { type: "string" },
            },
            required: ["name"],
        },
    ];

    beforeEach(() => {
        // Create a temporary directory for test files
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir, { recursive: true });
        }
    });

    afterEach(() => {
        // Clean up temporary files and directories
        if (fs.existsSync(tempDir)) {
            const removeRecursive = (dirPath: string) => {
                if (fs.existsSync(dirPath)) {
                    const files = fs.readdirSync(dirPath);
                    files.forEach((file) => {
                        const filePath = path.join(dirPath, file);
                        const stat = fs.statSync(filePath);
                        if (stat.isDirectory()) {
                            removeRecursive(filePath);
                        } else {
                            fs.unlinkSync(filePath);
                        }
                    });
                    fs.rmdirSync(dirPath);
                }
            };
            removeRecursive(tempDir);
        }
    });

    describe("generateShemaMixin - Basic Functionality", () => {
        it("should handle empty output paths object", () => {
            const outputPaths = {};

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result.successCount).to.equal(0);
            expect(result.errorCount).to.equal(0);
        });

        it("should create directories if they don't exist", () => {
            const nestedDir = path.join(tempDir, "nested", "directory");
            const outputPaths = {
                "property/holder": path.join(nestedDir, "PropertyHolderSchemaMixin.ts"),
            };

            generateShemaMixin(mockSchemas, outputPaths);

            // The function should attempt to create the directory
            expect(fs.existsSync(nestedDir)).to.be.true;
        });

        it("should handle skip fields parameter", () => {
            const outputPaths = {
                "property/holder": path.join(tempDir, "PropertyHolderSchemaMixin.ts"),
            };
            const skipFields = ["metadata"];

            // This should not throw an error even if the schema doesn't exist
            expect(() => {
                generateShemaMixin(mockSchemas, outputPaths, skipFields);
            }).to.not.throw();
        });
    });

    describe("generateShemaMixin - Error Handling", () => {
        it("should handle non-existent schema IDs gracefully", () => {
            const outputPaths = {
                "non/existent": path.join(tempDir, "NonExistentSchemaMixin.ts"),
            };

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result.successCount).to.equal(0);
            expect(result.errorCount).to.equal(1);
        });

        it("should handle missing output paths", () => {
            const outputPaths = {
                "property/holder": undefined as unknown as string,
            };

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result.successCount).to.equal(0);
            expect(result.errorCount).to.equal(1);
        });

        it("should handle invalid output paths", () => {
            const outputPaths = {
                "property/holder": "",
            };

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result.successCount).to.equal(0);
            expect(result.errorCount).to.equal(1);
        });
    });

    describe("generateShemaMixin - Return Value", () => {
        it("should return an object with successCount and errorCount", () => {
            const outputPaths = {};

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result).to.have.property("successCount");
            expect(result).to.have.property("errorCount");
            expect(typeof result.successCount).to.equal("number");
            expect(typeof result.errorCount).to.equal("number");
        });

        it("should return correct counts for mixed results", () => {
            const outputPaths = {
                "non/existent": path.join(tempDir, "NonExistentSchemaMixin.ts"),
                "another/non/existent": path.join(tempDir, "AnotherNonExistentSchemaMixin.ts"),
            };

            const result = generateShemaMixin(mockSchemas, outputPaths);

            expect(result.successCount).to.equal(0);
            expect(result.errorCount).to.equal(2);
        });
    });

    describe("generateShemaMixin - Function Interface", () => {
        it("should accept schemas as first parameter", () => {
            const outputPaths = {};

            expect(() => {
                generateShemaMixin(mockSchemas, outputPaths);
            }).to.not.throw();
        });

        it("should accept outputPaths as second parameter", () => {
            const outputPaths = {};

            expect(() => {
                generateShemaMixin(mockSchemas, outputPaths);
            }).to.not.throw();
        });

        it("should accept skipFields as optional third parameter", () => {
            const outputPaths = {};
            const skipFields = ["field1", "field2"];

            expect(() => {
                generateShemaMixin(mockSchemas, outputPaths, skipFields);
            }).to.not.throw();
        });

        it("should work without skipFields parameter", () => {
            const outputPaths = {};

            expect(() => {
                generateShemaMixin(mockSchemas, outputPaths);
            }).to.not.throw();
        });
    });
});

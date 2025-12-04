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

    describe("generateShemaMixin - Omit Type Generation", () => {
        it("should not use Omit when skipFields is undefined", () => {
            const outputPath = path.join(tempDir, "NoSkipFieldsSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };

            generateShemaMixin(mockSchemas, outputPaths);

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.not.include("Omit<");
            expect(generatedCode).to.include(
                "export type NoSkipFieldsSchemaMixin = PropertyHolder;",
            );
            // Verify getters and setters are generated
            expect(generatedCode).to.include("get name()");
            expect(generatedCode).to.include("set name(value:");
            expect(generatedCode).to.include('this.setProp("name", value);');
            // Verify generic type and assertion
            expect(generatedCode).to.include(
                "export function noSkipFieldsSchemaMixin<T extends InMemoryEntity>",
            );
            expect(generatedCode).to.include("): asserts item is T & NoSkipFieldsSchemaMixin {");
        });

        it("should not use Omit when skipFields is an empty array", () => {
            const outputPath = path.join(tempDir, "EmptySkipFieldsSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };
            const skipFields: string[] = [];

            generateShemaMixin(mockSchemas, outputPaths, skipFields);

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.not.include("Omit<");
            expect(generatedCode).to.include(
                "export type EmptySkipFieldsSchemaMixin = PropertyHolder;",
            );
            // Verify getters and setters are generated
            expect(generatedCode).to.include("get description()");
            expect(generatedCode).to.include("set description(value:");
            expect(generatedCode).to.include('this.setProp("description", value);');
            // Verify generic type and assertion
            expect(generatedCode).to.include(
                "export function emptySkipFieldsSchemaMixin<T extends InMemoryEntity>",
            );
            expect(generatedCode).to.include("): asserts item is T & EmptySkipFieldsSchemaMixin {");
        });

        it("should use Omit when skipFields has values", () => {
            const outputPath = path.join(tempDir, "WithSkipFieldsSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };
            const skipFields = ["metadata"];

            generateShemaMixin(mockSchemas, outputPaths, skipFields);

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.include("Omit<");
            expect(generatedCode).to.include(
                'export type WithSkipFieldsSchemaMixin = Omit<PropertyHolder, "metadata">;',
            );
            // Verify getters and setters are generated (metadata should be skipped)
            expect(generatedCode).to.include("get name()");
            expect(generatedCode).to.include("set name(value:");
            expect(generatedCode).to.not.include("get metadata()");
            expect(generatedCode).to.not.include("set metadata(");
        });

        it("should use Omit with multiple fields when skipFields has multiple values", () => {
            const outputPath = path.join(tempDir, "MultipleSkipFieldsSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };
            const skipFields = ["metadata", "description"];

            generateShemaMixin(mockSchemas, outputPaths, skipFields);

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.include("Omit<");
            expect(generatedCode).to.include(
                'export type MultipleSkipFieldsSchemaMixin = Omit<PropertyHolder, "metadata" | "description">;',
            );
            // Verify getters and setters are generated (only name should be present)
            expect(generatedCode).to.include("get name()");
            expect(generatedCode).to.include("set name(value:");
            expect(generatedCode).to.not.include("get metadata()");
            expect(generatedCode).to.not.include("get description()");
        });
    });

    describe("generateShemaMixin - Entity Import Path", () => {
        it("should use default entity import path when not specified", () => {
            const outputPath = path.join(tempDir, "DefaultEntityPathSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };

            generateShemaMixin(mockSchemas, outputPaths);

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.include(
                'import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";',
            );
            // Verify setters are generated
            expect(generatedCode).to.include("set name(value:");
            expect(generatedCode).to.include('this.setProp("name", value);');
            // Verify generic type and assertion
            expect(generatedCode).to.include(
                "export function defaultEntityPathSchemaMixin<T extends InMemoryEntity>",
            );
            expect(generatedCode).to.include(
                "): asserts item is T & DefaultEntityPathSchemaMixin {",
            );
        });

        it("should use custom entity import path when specified", () => {
            const outputPath = path.join(tempDir, "CustomEntityPathSchemaMixin.ts");
            const outputPaths = {
                "property/holder": outputPath,
            };
            const customEntityPath = "@custom/package/dist/entity";

            generateShemaMixin(
                mockSchemas,
                outputPaths,
                [],
                "@mat3ra/esse/dist/js/types",
                customEntityPath,
            );

            const generatedCode = fs.readFileSync(outputPath, "utf-8");
            expect(generatedCode).to.include(
                `import type { InMemoryEntity } from "${customEntityPath}";`,
            );
            // Verify setters are generated
            expect(generatedCode).to.include("set description(value:");
            expect(generatedCode).to.include('this.setProp("description", value);');
        });
    });
});

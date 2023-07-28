/**
 * This script should be run with ts-node before transpile step as TS interfaces is required to transpile step
 */
import { compileTS } from "./src/bin/compileTS";
import { esseSchema } from "./src/JSONSchemasInterface";

compileTS(esseSchema, `./src/types.ts`);

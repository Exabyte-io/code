/**
 * This script should be run with ts-node before transpile step as TS interfaces is required to transpile step
 */
import { compileNewTS, compileTS } from "./src/bin/compileTS";
import { esseSchema } from "./src/JSONSchemasInterface";

// compileTS(esseSchema, `./src/types.ts`);
compileNewTS("./node_modules/@mat3ra/esse/lib/js/schema", `./src/types.ts`);

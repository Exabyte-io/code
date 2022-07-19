import mergeAllOf from "json-schema-merge-allof";
import { schemas } from '@exabyte-io/esse.js/lib/js/esse/schemas.js';

const mainSchemas = {
    Material: "material",
    Entity: "system-entity",
    BankMaterial: "material",
    Workflow: "workflow",
    Subworkflow: "workflow-subworkflow",
    BankWorkflow: "workflow",
    Job: "job",
    AssertionUnit: "workflow-unit-assertion",
    AssignmentUnit: "workflow-unit-assignment",
    ConditionUnit: "workflow-unit-condition",
    ExecutionUnit: "workflow-unit-execution",
    IOUnit: "workflow-unit-io",
    MapUnit: "workflow-unit-map",
    ProcessingUnit: "workflow-unit-processing",
    ReduceUnit: "workflow-unit-reduce",
    SubworkflowUnit: "workflow-unit",
    Unit: "workflow-unit",
};


const schemaCache = new Map();

function getSchemaById(schemaId) {
    if (!schemaCache.has(schemaId)) {
        const rawSchema = schemas.find((schema) => schema.schemaId === schemaId);

        const schema = mergeAllOf(rawSchema, {
            resolvers: {
                defaultResolver: mergeAllOf.options.resolvers.title
            }
        });
    
        schemaCache.set(schemaId, schema);
    }
    
    return schemaCache.get(schemaId);
}

export function getSchemaByClassName(className) {
    return getSchemaById(mainSchemas[className]);
}

export function getSchemasByIds(ids) {
    return ids.map(id => getSchemaById(id));
}

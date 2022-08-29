import { JSONSchemasInterface } from "../JSONSchemasInterface";

export const baseSchemas = {
    Material: "material",
    Entity: "system-entity",
    BankMaterial: "material",
    Workflow: "workflow",
    Subworkflow: "workflow-subworkflow",
    BankWorkflow: "workflow",
    Job: "job",
    Application: "software-application",
    Executable: "software-executable",
    Flavor: "software-flavor",
    Template: "software-template",
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

export const entityMix = [
    "system-description-object",
    "system-base-entity-set",
    "system-sharing",
    "system-metadata",
    "system-defaultable",
];

export const subWorkflowMix = ["system-system-name", "system-is-multi-material"];

export const workflowMix = ["workflow-base-flow", "system-history", "system-is-outdated"];

export const bankMaterialMix = ["material-conventional", "system-creator-account"];

export const bankWorkflowMix = ["system-creator-account"];

export const jobMix = ["system-status", "system-job-extended"];

export const unitMix = [
    "system-unit-extended",
    "system-status",
    "workflow-unit-runtime-runtime-items",
];

export const assignmentUnitMix = ["system-scope"];

export const flavorMix = ["system-is-multi-material"];

export const systemEntityMix = ["system-entity"];

export const mixSchemas = {
    Entity: [...entityMix],
    Material: [...entityMix],
    BankMaterial: [...entityMix, ...bankMaterialMix],
    Workflow: [...entityMix, ...subWorkflowMix, ...workflowMix],
    Subworkflow: [...subWorkflowMix],
    BankWorkflow: [...entityMix, ...subWorkflowMix, ...workflowMix, ...bankWorkflowMix],
    Job: [...entityMix, ...jobMix],
    Application: [...entityMix, ...systemEntityMix],
    Executable: [...entityMix, ...systemEntityMix],
    Flavor: [...entityMix, ...flavorMix, ...systemEntityMix],
    Template: [...entityMix, ...systemEntityMix],
    AssertionUnit: [...unitMix],
    AssignmentUnit: [...unitMix, ...assignmentUnitMix],
    ConditionUnit: [...unitMix],
    ExecutionUnit: [...unitMix],
    IOUnit: [...unitMix],
    MapUnit: [...unitMix],
    ProcessingUnit: [...unitMix],
    ReduceUnit: [...unitMix],
    SubworkflowUnit: [...unitMix],
    Unit: [...unitMix],
};

export function getSchemaByClassName(className) {
    return baseSchemas[className] ? JSONSchemasInterface.schemaById(baseSchemas[className]) : null;
}

export function getMixSchemasByClassName(className) {
    return mixSchemas[className]
        ? mixSchemas[className].map((schemaId) => JSONSchemasInterface.schemaById(schemaId))
        : [];
}

/**
 * Register additional Entity classes to be resolved with jsonSchema property
 * @param {String} className - class name derived from InMemoryEntity
 * @param {String} classBaseSchema - base schemaId
 * @param {Array} classMixSchemas - array of schemaId to mix
 */
export function registerClassName(className, classBaseSchema, classMixSchemas) {
    baseSchemas[className] = classBaseSchema;
    mixSchemas[className] = classMixSchemas;
}

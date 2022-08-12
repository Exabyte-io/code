import { JSONSchemasInterface } from "../JSONSchemasInterface";

export const baseSchemas = {
    Material: "material",
    Entity: "system/entity",
    BankMaterial: "material",
    Workflow: "workflow",
    Subworkflow: "workflow/subworkflow",
    BankWorkflow: "workflow",
    Job: "job",
    Application: "software/application",
    Executable: "software/executable",
    Flavor: "software/flavor",
    Template: "software/template",
    AssertionUnit: "workflow/unit/assertion",
    AssignmentUnit: "workflow/unit/assignment",
    ConditionUnit: "workflow/unit/condition",
    ExecutionUnit: "workflow/unit/execution",
    IOUnit: "workflow/unit/io",
    MapUnit: "workflow/unit/map",
    ProcessingUnit: "workflow/unit/processing",
    ReduceUnit: "workflow/unit/reduce",
    SubworkflowUnit: "workflow/unit",
    Unit: "workflow/unit",
};

const entityMix = [
    "system/description/object",
    "system/base/entity/set",
    "system/sharing",
    "system/metadata",
    "system/defaultable",
];

const subWorkflowMix = ["system/system/name", "system/is/multi/material"];

const workflowMix = ["workflow/base/flow", "system/history", "system/is/outdated"];

const bankMaterialMix = ["material/conventional", "system/creator/account"];

const bankWorkflowMix = ["system/creator/account"];

const jobMix = ["system/status", "system/job/extended"];

const unitMix = ["system/unit/extended", "system/status", "workflow/unit/runtime/runtime/items"];

const assignmentUnitMix = ["system/scope"];

const flavorMix = ["system/is/multi/material"];

const systemEntityMix = ["system/entity"];

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

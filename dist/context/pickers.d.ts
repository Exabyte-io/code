export function WorkflowContextPickKeysForMixin(workflow: any): {
    workflow: Pick<any, "hasRelaxation">;
};
export function JobContextPickKeysForMixin(job: any): {
    job: Pick<any, "parentJob">;
};

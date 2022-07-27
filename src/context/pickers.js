import _ from "underscore";

export const WorkflowContextPickKeysForMixin = (workflow) => {
    return {
        workflow: _.pick(workflow, ["hasRelaxation"]),
    };
};

export const JobContextPickKeysForMixin = (job) => {
    return {
        job: _.pick(job, ["parentJob"]),
    };
};

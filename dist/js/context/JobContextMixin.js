"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobContextMixin = jobContextMixin;
exports.JobContextMixin = JobContextMixin;
const defaultJob = {
    workflow: {
        subworkflows: [],
        units: [],
    },
    status: "pre-submission",
    compute: {
        queue: "D",
        nodes: 1,
        ppn: 1,
        timeLimit: "3600",
    },
    _project: {
        _id: "",
    },
};
function jobContextMixin(item) {
    const properties = {
        isEdited: false,
        _job: defaultJob,
        get job() {
            return this._job;
        },
        initJobContextMixin() {
            const config = this.config;
            this._job = (config.context && config.context.job) || defaultJob;
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function JobContextMixin(superclass) {
    jobContextMixin(superclass.prototype);
    return superclass;
}

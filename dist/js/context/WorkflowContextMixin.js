"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowContextMixin = workflowContextMixin;
exports.WorkflowContextMixin = WorkflowContextMixin;
const defaultWorkflow = {
    subworkflows: [],
    units: [],
};
function workflowContextMixin(item) {
    const properties = {
        isEdited: false,
        _workflow: defaultWorkflow,
        get workflow() {
            return this._workflow;
        },
        initWorkflowContextMixin() {
            const config = this.config;
            this._workflow = (config.context && config.context.workflow) || defaultWorkflow;
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
function WorkflowContextMixin(superclass) {
    workflowContextMixin(superclass.prototype);
    return superclass;
}

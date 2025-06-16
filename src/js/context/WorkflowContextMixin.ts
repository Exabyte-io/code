import type { WorkflowSchema } from "@mat3ra/esse/dist/js/types";

import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";

type WorkflowConfig = {
    context?: {
        workflow?: WorkflowSchema;
    };
};

const defaultWorkflow: WorkflowSchema = {
    subworkflows: [],
    units: [],
};

export type WorkflowContextMixinType = {
    isEdited?: boolean;
    workflow: WorkflowSchema;
    _workflow: WorkflowSchema;
    initWorkflowContextMixin: () => void;
};

export function workflowContextMixin(item: ContextProvider) {
    const properties = {
        isEdited: false,

        _workflow: defaultWorkflow,

        get workflow() {
            return this._workflow;
        },

        initWorkflowContextMixin() {
            const config = this.config as WorkflowConfig;
            this._workflow = (config.context && config.context.workflow) || defaultWorkflow;
            this.isEdited = false; // we always get the `defaultData` (recalculated from scratch, not persistent)
        },
    } as WorkflowContextMixinType & typeof item;

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function WorkflowContextMixin<T extends Constructor<ContextProvider>>(superclass: T) {
    workflowContextMixin(superclass.prototype);
    return superclass as T & Constructor<WorkflowContextMixinType>;
}

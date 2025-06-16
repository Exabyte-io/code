import type { WorkflowSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
export type WorkflowContextMixinType = {
    isEdited?: boolean;
    workflow: WorkflowSchema;
    _workflow: WorkflowSchema;
    initWorkflowContextMixin: () => void;
};
export declare function workflowContextMixin(item: ContextProvider): void;
export declare function WorkflowContextMixin<T extends Constructor<ContextProvider>>(superclass: T): T & Constructor<WorkflowContextMixinType>;

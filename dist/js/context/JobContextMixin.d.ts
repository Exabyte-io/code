import type { JobSchema } from "@mat3ra/esse/dist/js/types";
import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
export type JobContextMixinType = {
    isEdited?: boolean;
    job: JobSchema;
    _job: JobSchema;
    initJobContextMixin: () => void;
};
export declare function jobContextMixin(item: ContextProvider): void;
export declare function JobContextMixin<T extends Constructor<ContextProvider>>(superclass: T): T & Constructor<JobContextMixinType>;

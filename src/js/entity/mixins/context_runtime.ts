import { JobBaseSchema } from "@mat3ra/esse/dist/js/types";

import { InMemoryEntityConstructor } from "../in_memory";

type RuntimeContext = Required<JobBaseSchema>["runtimeContext"];

export function RuntimeContextFieldMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        _runtimeContext: RuntimeContext;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        constructor(...args: any[]) {
            super(...args);

            const config = args[0];

            this._runtimeContext = config.runtimeContext || {};
        }

        // in-memory, or "volatile" runtimeContext that is reset when the `parent` object is destroyed
        get runtimeContext() {
            return this._runtimeContext;
        }

        set runtimeContext(newContext: RuntimeContext) {
            this._runtimeContext = newContext;
        }

        updateRuntimeContext(ctx: RuntimeContext = {}) {
            this.runtimeContext = Object.assign(this._runtimeContext, ctx);
        }

        toJSON(exclude: string[] = []) {
            return { ...super.toJSON(exclude), runtimeContext: this._runtimeContext };
        }
    };
}

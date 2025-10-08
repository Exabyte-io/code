import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import { expect } from "chai";

export function assertObject(prop: unknown): prop is AnyObject {
    expect(prop).to.be.an("object");
    return Boolean(prop) && typeof prop === "object" && !Array.isArray(prop);
}

export function assertArray(prop: unknown): prop is unknown[] {
    expect(prop).to.be.an("array");
    return Array.isArray(prop);
}

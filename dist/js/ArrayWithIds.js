"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoundedArrayWithIds = exports.ArrayWithIds = void 0;
const ValueWithId_1 = require("./ValueWithId");
class ArrayWithIds {
    constructor(values = [], ids = []) {
        if (values.length !== ids.length) {
            throw new Error("Values and IDs must have the same length");
        }
        this.values = [...values];
        this.ids = [...ids];
    }
    static fromValues(values) {
        const ids = values.map((_, i) => i);
        return new this(values, ids);
    }
    static fromObjects(objects) {
        const values = objects.map((obj) => obj.value);
        const ids = objects.map((obj) => obj.id);
        return new this(values, ids);
    }
    toJSON() {
        return this.values.map((value, index) => ({
            id: this.ids[index],
            value:
                value !== null &&
                typeof value === "object" &&
                "toJSON" in value &&
                typeof value.toJSON === "function"
                    ? value.toJSON()
                    : value,
        }));
    }
    toValueWithIdArray() {
        return this.values.map(
            (value, index) => new ValueWithId_1.ValueWithId(this.ids[index], value),
        );
    }
    getElementValueByIndex(index) {
        return this.values[index];
    }
    getElementIdByValue(value) {
        const index = this.values.findIndex((v) =>
            Array.isArray(v) && Array.isArray(value)
                ? v.length === value.length && v.every((val, idx) => val === value[idx])
                : v === value,
        );
        return index !== -1 ? this.ids[index] : undefined;
    }
    filterByValues(valuesToKeep) {
        const toHash = (v) => (Array.isArray(v) ? JSON.stringify(v) : String(v));
        const keepSet = new Set(
            Array.isArray(valuesToKeep) ? valuesToKeep.map(toHash) : [toHash(valuesToKeep)],
        );
        const filtered = this.values
            .map((value, i) => [value, this.ids[i]])
            .filter(([value]) => keepSet.has(toHash(value)));
        this.values = filtered.map(([v]) => v);
        this.ids = filtered.map(([_, id]) => id);
    }
    filterByIndices(indices) {
        const keepSet = new Set(Array.isArray(indices) ? indices : [indices]);
        this.values = this.values.filter((_, i) => keepSet.has(i));
        this.ids = this.ids.filter((_, i) => keepSet.has(i));
    }
    filterByIds(ids, invert = false) {
        const idSet = new Set(Array.isArray(ids) ? ids : [ids]);
        const keep = invert
            ? this.ids.map((id, i) => (idSet.has(id) ? -1 : i)).filter((i) => i >= 0)
            : this.ids.map((id, i) => (idSet.has(id) ? i : -1)).filter((i) => i >= 0);
        this.values = keep.map((i) => this.values[i]);
        this.ids = keep.map((i) => this.ids[i]);
    }
    equals(other) {
        if (!(other instanceof ArrayWithIds)) return false;
        if (this.values.length !== other.values.length) return false;
        if (this.ids.length !== other.ids.length) return false;
        return (
            this.values.every((v, i) => {
                const ov = other.values[i];
                return Array.isArray(v) && Array.isArray(ov)
                    ? v.length === ov.length && v.every((val, idx) => val === ov[idx])
                    : v === ov;
            }) && this.ids.every((id, i) => id === other.ids[i])
        );
    }
    mapArrayInPlace(func) {
        this.values = this.values.map(func);
    }
    addItem(value, id) {
        const newId = id !== null && id !== void 0 ? id : Math.max(-1, ...this.ids) + 1;
        this.values.push(value);
        this.ids.push(newId);
    }
    removeItem(index, id) {
        if (id !== undefined) {
            index = this.ids.indexOf(id);
            if (index === -1) throw new Error("ID not found");
        }
        if (index < 0 || index >= this.values.length) {
            throw new Error("Index out of range");
        }
        this.values.splice(index, 1);
        this.ids.splice(index, 1);
    }
}
exports.ArrayWithIds = ArrayWithIds;
class RoundedArrayWithIds extends ArrayWithIds {
    constructor(values = [], ids = [], options = ValueWithId_1.defaultRoundingOptions) {
        super(values, ids);
        this.roundingOptions = options;
    }
    toJSON() {
        return this.values.map((value, index) =>
            new ValueWithId_1.RoundedValueWithId(
                this.ids[index],
                value,
                this.roundingOptions,
            ).toJSON(),
        );
    }
}
exports.RoundedArrayWithIds = RoundedArrayWithIds;

export function deepClone(obj) {
    return structuredClone(obj);
}

export function clone(obj) {
    return { ...obj };
}

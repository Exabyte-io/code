// TODO: consider other options for performance reasons - http://jsben.ch/bWfk9
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

export function clone(obj) {
    return { ...obj };
}

// import EntityTAO from "../tao/entity";

declare const window: {
    __CACHE__?: {
        [key: string]: unknown;
    };
    [key: string]: unknown;
};

export function getCacheValue(key: string) {
    if (!window.__CACHE__) {
        return undefined;
    }
    return window.__CACHE__[key];
}

export function setCacheValue(key: string, value: unknown) {
    window.__CACHE__ = window.__CACHE__ || {};
    window.__CACHE__[key] = value;
}

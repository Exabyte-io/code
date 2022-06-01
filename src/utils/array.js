import lodash from "lodash";

export function safeMakeArray(x) {
    if (!lodash.isArray(x)) return [x];
    return x;
}

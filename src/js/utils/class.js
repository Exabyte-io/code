export function cloneClass(classToClone) {
    return Object.assign(Object.create(Object.getPrototypeOf(classToClone)), classToClone);
}

/**
 * Extends a child class with the parent class.
 * Note: this function does not handle static functions.
 * Note: this function does not quite handle custom constructor logic like one might expect.
 *       The workaround is to follow the convention established as in Application classes.
 * @param childClass {Object} child class.
 * @param parentClass {Object} parent class.
 * @param excludedProps {Array} properties to exclude.
 * @param args {Array} args to pass to the constructor of the parent class.
 */
export function extendClass(childClass, parentClass, excludedProps = [], ...args) {
    const parentNonStaticProps = Object.getOwnPropertyNames(parentClass.prototype);
    parentNonStaticProps
        .filter((p) => !excludedProps.includes(p))
        .forEach((prop) => {
            if (prop === "constructor") {
                Object.assign(childClass.prototype, new parentClass.prototype.constructor(...args));
            } else {
                const get = parentClass.prototype.__lookupGetter__(prop);
                const set = parentClass.prototype.__lookupSetter__(prop);
                if (get || set) {
                    Object.defineProperty(childClass.prototype, prop, { get, set });
                } else {
                    childClass.prototype[prop] = parentClass.prototype[prop];
                }
            }
        });
}

export function extendClassStaticProps(childClass, parentClass, excludedProps = []) {
    const parentStaticProps = Object.getOwnPropertyNames(parentClass).filter(
        (p) => !["length", "name", "prototype"].includes(p),
    );
    parentStaticProps
        .filter((p) => !excludedProps.includes(p))
        .forEach((prop) => {
            childClass[prop] = parentClass[prop];
        });
}

/**
 * Slightly different implementation of extendClass assuming excludedProps
 * is contained within the child-most class definition and assigning only
 * the most recent props rather than the most distant props.
 * See extendClass.
 */
export function extendThis(childClass, parentClass, config) {
    let props, protos;
    let obj = new parentClass.prototype.constructor(config);
    const exclude = ["constructor", ...Object.getOwnPropertyNames(childClass.prototype)];
    const seen = []; // remember most recent occurrence of prop name (like inheritance)
    while (Object.getPrototypeOf(obj)) {
        protos = Object.getPrototypeOf(obj);
        props = Object.getOwnPropertyNames(protos);
        props
            .filter((p) => !exclude.includes(p))
            // eslint-disable-next-line no-loop-func
            .map((prop) => {
                if (seen.includes(prop)) return;
                const get = protos.__lookupGetter__(prop);
                const set = protos.__lookupSetter__(prop);
                if (get || set) {
                    Object.defineProperty(childClass.prototype, prop, { get, set });
                } else {
                    childClass.prototype[prop] = parentClass.prototype[prop];
                }
                seen.push(prop); // don't override with older definition in hierarchy
                return null;
            });
        obj = protos;
    }
}

export function cloneClass(classToClone) {
    return Object.assign(Object.create(Object.getPrototypeOf(classToClone)), classToClone)
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
    parentNonStaticProps.filter(p => !excludedProps.includes(p)).forEach(prop => {
        if (prop === 'constructor') {
            Object.assign(childClass.prototype, new parentClass.prototype.constructor(...args));
        } else {
            const getter = parentClass.prototype.__lookupGetter__(prop);
            const setter = parentClass.prototype.__lookupSetter__(prop);
            if (getter) childClass.prototype.__defineGetter__(prop, getter);
            if (setter) childClass.prototype.__defineSetter__(prop, setter);
            if (!(getter || setter)) childClass.prototype[prop] = parentClass.prototype[prop];
        }
    });
}

export function extendClassStaticProps(childClass, parentClass, excludedProps = [], ...args) {
    const parentStaticProps = Object.getOwnPropertyNames(parentClass).filter(p => ![
        "length", "name", "prototype"
    ].includes(p));
    parentStaticProps.filter(p => !excludedProps.includes(p)).forEach(prop => {
        childClass[prop] = parentClass[prop]
    });
}

/**
 * Extends an object with a parent class namespace.
 * See extendClass
 */
export function extendThis(child, parentClass, excludedProps = [], ...args) {
    let props;
    let obj = new parentClass.prototype.constructor(...args);
    const exclude = ["constructor", ...excludedProps];
    while (obj.__proto__) {
        props = Object.getOwnPropertyNames(obj.__proto__);
        props.filter(p => !exclude.includes(p)).map((prop) => {
            const getter = obj.__lookupGetter__(prop);
            const setter = obj.__lookupSetter__(prop);
            if (getter) child.__defineGetter__(prop, getter);
            if (setter) child.__defineSetter__(prop, setter);
            if (!(getter || setter)) child[prop] = obj[prop];
        })
        obj = obj.__proto__;
    }
}

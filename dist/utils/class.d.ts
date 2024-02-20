export function cloneClass(classToClone: any): any;
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
export function extendClass(childClass: Object, parentClass: Object, excludedProps?: any[], ...args: any[]): void;
export function extendClassStaticProps(childClass: any, parentClass: any, excludedProps?: any[]): void;
/**
 * Slightly different implementation of extendClass assuming excludedProps
 * is contained within the child-most class definition and assigning only
 * the most recent props rather than the most distant props.
 * See extendClass.
 */
export function extendThis(childClass: any, parentClass: any, config: any): void;

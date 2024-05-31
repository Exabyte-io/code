import mathjs from "mathjs";
export type MathArray = mathjs.MathArray;
export type MathType = mathjs.MathType;
export type MathExpression = mathjs.MathExpression;
export type MathJsStatic = mathjs.MathJsStatic;
export type Matrix = mathjs.Matrix;
export type BigNumber = mathjs.BigNumber;
export type Fraction = mathjs.Fraction;
export type Complex = mathjs.Complex;
export type PolarCoordinates = mathjs.PolarCoordinates;
export type MathJSON = mathjs.MathJSON;
export type Unit = mathjs.Unit;
export type CreateUnitOptions = mathjs.CreateUnitOptions;
export type UnitDefinition = mathjs.UnitDefinition;
export type Index = mathjs.Index;
export type EvalFunction = mathjs.EvalFunction;
export type MathNode = mathjs.MathNode;
export type Parser = mathjs.Parser;
export type Distribution = mathjs.Distribution;
export type FormatOptions = mathjs.FormatOptions;
export type Help = mathjs.Help;
export type MathJsChain = mathjs.MathJsChain;
export type MathJsJson = mathjs.MathJsJson;
/**
 * @summary Wrapper for native [Number.toPrecision](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_objects/Number/toPrecision) method.
 * Returns a string representing the Number object to the specified precision.
 * @memberOf Helpers
 * @package exabyte:core
 * @locus Client
 * @method
 * @name toPrecision
 * @param number
 * @param precision Optional. An integer specifying the number of significant digits.
 */
export declare function numberToPrecision(number: number | string, precision?: number): string;
export declare const math: {
    PI: number;
    trunc: (x: number) => number;
    product: (v1: number[], v2: number[]) => mathjs.Matrix;
    vlen: (v: number[]) => mathjs.Matrix;
    angle: (a: number[], b: number[], unit: string) => number;
    angleUpTo90: (a: number[], b: number[], unit: string) => number;
    vDist: (v1: number[], v2: number[]) => mathjs.Matrix | undefined;
    vEqualWithTolerance: (vec1: number[], vec2: number[], tolerance?: number) => boolean;
    roundToZero: (n: number) => number;
    precise: (x: number, n?: number) => number;
    mod: (num: number, tolerance?: number) => number;
    isBetweenZeroInclusiveAndOne: (number: number, tolerance?: number) => boolean;
    cartesianProduct: (...arg: number[][]) => number[][];
    almostEqual: (a: number, b: number, tolerance?: number) => boolean;
    combinations: (a: number, b: number, c: number) => number[][];
    combinationsFromIntervals: (arrA: number[], arrB: number[], arrC: number[]) => number[][];
    calculateSegmentsBetweenPoints3D: (point1: (string | number)[], point2: (string | number)[], n: number | string) => number[][];
    roundValueToNDecimals: (value: number, decimals?: number) => number;
    numberToPrecision: typeof numberToPrecision;
    e: number;
    pi: number;
    i: number;
    Infinity: number;
    LN2: number;
    LN10: number;
    LOG2E: number;
    LOG10E: number;
    NaN: number;
    null: number;
    phi: number;
    SQRT1_2: number;
    SQRT2: number;
    tau: number;
    uninitialized: any;
    version: string;
    expression: mathjs.MathNode;
    json: mathjs.MathJsJson;
    config: (options: any) => void;
    lsolve(L: mathjs.MathArray | mathjs.Matrix, b: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    lup(A?: mathjs.MathArray | mathjs.Matrix | undefined): mathjs.MathArray;
    lusolve(A: number | mathjs.MathArray | mathjs.Matrix, b: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    slu(A: mathjs.Matrix, order: number, threshold: number): any;
    usolve(U: mathjs.MathArray | mathjs.Matrix, b: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    abs(x: number): number;
    abs(x: mathjs.BigNumber): mathjs.BigNumber;
    abs(x: mathjs.Fraction): mathjs.Fraction;
    abs(x: mathjs.Complex): mathjs.Complex;
    abs(x: mathjs.MathArray): mathjs.MathArray;
    abs(x: mathjs.Matrix): mathjs.Matrix;
    abs(x: mathjs.Unit): mathjs.Unit;
    add(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    cbrt(x: number, allRoots?: boolean | undefined): number;
    cbrt(x: mathjs.BigNumber, allRoots?: boolean | undefined): mathjs.BigNumber;
    cbrt(x: mathjs.Fraction, allRoots?: boolean | undefined): mathjs.Fraction;
    cbrt(x: mathjs.Complex, allRoots?: boolean | undefined): mathjs.Complex;
    cbrt(x: mathjs.MathArray, allRoots?: boolean | undefined): mathjs.MathArray;
    cbrt(x: mathjs.Matrix, allRoots?: boolean | undefined): mathjs.Matrix;
    cbrt(x: mathjs.Unit, allRoots?: boolean | undefined): mathjs.Unit;
    ceil(x: number): number;
    ceil(x: mathjs.BigNumber): mathjs.BigNumber;
    ceil(x: mathjs.Fraction): mathjs.Fraction;
    ceil(x: mathjs.Complex): mathjs.Complex;
    ceil(x: mathjs.MathArray): mathjs.MathArray;
    ceil(x: mathjs.Matrix): mathjs.Matrix;
    ceil(x: mathjs.Unit): mathjs.Unit;
    cube(x: number): number;
    cube(x: mathjs.BigNumber): mathjs.BigNumber;
    cube(x: mathjs.Fraction): mathjs.Fraction;
    cube(x: mathjs.Complex): mathjs.Complex;
    cube(x: mathjs.MathArray): mathjs.MathArray;
    cube(x: mathjs.Matrix): mathjs.Matrix;
    cube(x: mathjs.Unit): mathjs.Unit;
    divide(x: mathjs.Unit, y: mathjs.Unit): mathjs.Unit;
    divide(x: number, y: number): number;
    divide(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    dotDivide(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    dotMultiply(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    dotPow(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    exp(x: number): number;
    exp(x: mathjs.BigNumber): mathjs.BigNumber;
    exp(x: mathjs.Complex): mathjs.Complex;
    exp(x: mathjs.MathArray): mathjs.MathArray;
    exp(x: mathjs.Matrix): mathjs.Matrix;
    fix(x: number): number;
    fix(x: mathjs.BigNumber): mathjs.BigNumber;
    fix(x: mathjs.Fraction): mathjs.Fraction;
    fix(x: mathjs.Complex): mathjs.Complex;
    fix(x: mathjs.MathArray): mathjs.MathArray;
    fix(x: mathjs.Matrix): mathjs.Matrix;
    floor(x: number): number;
    floor(x: mathjs.BigNumber): mathjs.BigNumber;
    floor(x: mathjs.Fraction): mathjs.Fraction;
    floor(x: mathjs.Complex): mathjs.Complex;
    floor(x: mathjs.MathArray): mathjs.MathArray;
    floor(x: mathjs.Matrix): mathjs.Matrix;
    gcd(...args: number[]): number;
    gcd(...args: mathjs.BigNumber[]): mathjs.BigNumber;
    gcd(...args: mathjs.Fraction[]): mathjs.Fraction;
    gcd(...args: mathjs.MathArray[]): mathjs.MathArray;
    gcd(...args: mathjs.Matrix[]): mathjs.Matrix;
    hypot(...args: number[]): number;
    hypot(...args: mathjs.BigNumber[]): mathjs.BigNumber;
    kron(x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathArray | mathjs.Matrix): mathjs.Matrix;
    lcm(a: number, b: number): number;
    lcm(a: mathjs.BigNumber, b: mathjs.BigNumber): mathjs.BigNumber;
    lcm(a: mathjs.MathArray, b: mathjs.MathArray): mathjs.MathArray;
    lcm(a: mathjs.Matrix, b: mathjs.Matrix): mathjs.Matrix;
    log(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix, base?: number | mathjs.BigNumber | mathjs.Complex | undefined): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix;
    log10(x: number): number;
    log10(x: mathjs.BigNumber): mathjs.BigNumber;
    log10(x: mathjs.Complex): mathjs.Complex;
    log10(x: mathjs.MathArray): mathjs.MathArray;
    log10(x: mathjs.Matrix): mathjs.Matrix;
    multiply(x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathType): mathjs.Matrix;
    multiply(x: mathjs.Unit, y: mathjs.Unit): mathjs.Unit;
    multiply(x: number, y: number): number;
    multiply(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    norm(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix, p?: string | number | mathjs.BigNumber | undefined): number | mathjs.BigNumber;
    nthRoot(a: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix, root?: number | mathjs.BigNumber | undefined): number | mathjs.MathArray | mathjs.Complex | mathjs.Matrix;
    pow(x: mathjs.MathType, y: number | mathjs.BigNumber | mathjs.Complex): mathjs.MathType;
    round(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Fraction | mathjs.Complex | mathjs.Matrix, n?: number | mathjs.MathArray | mathjs.BigNumber | undefined): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Fraction | mathjs.Complex | mathjs.Matrix;
    sign(x: number): number;
    sign(x: mathjs.BigNumber): mathjs.BigNumber;
    sign(x: mathjs.Fraction): mathjs.Fraction;
    sign(x: mathjs.Complex): mathjs.Complex;
    sign(x: mathjs.MathArray): mathjs.MathArray;
    sign(x: mathjs.Matrix): mathjs.Matrix;
    sign(x: mathjs.Unit): mathjs.Unit;
    sqrt(x: number): number;
    sqrt(x: mathjs.BigNumber): mathjs.BigNumber;
    sqrt(x: mathjs.Complex): mathjs.Complex;
    sqrt(x: mathjs.MathArray): mathjs.MathArray;
    sqrt(x: mathjs.Matrix): mathjs.Matrix;
    sqrt(x: mathjs.Unit): mathjs.Unit;
    square(x: number): number;
    square(x: mathjs.BigNumber): mathjs.BigNumber;
    square(x: mathjs.Fraction): mathjs.Fraction;
    square(x: mathjs.Complex): mathjs.Complex;
    square(x: mathjs.MathArray): mathjs.MathArray;
    square(x: mathjs.Matrix): mathjs.Matrix;
    square(x: mathjs.Unit): mathjs.Unit;
    subtract(x: mathjs.MathType, y: mathjs.MathType): mathjs.MathType;
    unaryMinus(x: number): number;
    unaryMinus(x: mathjs.BigNumber): mathjs.BigNumber;
    unaryMinus(x: mathjs.Fraction): mathjs.Fraction;
    unaryMinus(x: mathjs.Complex): mathjs.Complex;
    unaryMinus(x: mathjs.MathArray): mathjs.MathArray;
    unaryMinus(x: mathjs.Matrix): mathjs.Matrix;
    unaryMinus(x: mathjs.Unit): mathjs.Unit;
    unaryPlus(x: number): number;
    unaryPlus(x: mathjs.BigNumber): mathjs.BigNumber;
    unaryPlus(x: mathjs.Fraction): mathjs.Fraction;
    unaryPlus(x: string): string;
    unaryPlus(x: mathjs.Complex): mathjs.Complex;
    unaryPlus(x: mathjs.MathArray): mathjs.MathArray;
    unaryPlus(x: mathjs.Matrix): mathjs.Matrix;
    unaryPlus(x: mathjs.Unit): mathjs.Unit;
    xgcd(a: number | mathjs.BigNumber, b: number | mathjs.BigNumber): mathjs.MathArray;
    bitAnd(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix, y: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    bitNot(x: number): number;
    bitNot(x: mathjs.BigNumber): mathjs.BigNumber;
    bitNot(x: mathjs.MathArray): mathjs.MathArray;
    bitNot(x: mathjs.Matrix): mathjs.Matrix;
    bitOr(x: number): number;
    bitOr(x: mathjs.BigNumber): mathjs.BigNumber;
    bitOr(x: mathjs.MathArray): mathjs.MathArray;
    bitOr(x: mathjs.Matrix): mathjs.Matrix;
    bitXor(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix, y: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    leftShift(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix, y: number | mathjs.BigNumber): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    rightArithShift(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix, y: number | mathjs.BigNumber): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    rightLogShift(x: number | mathjs.MathArray | mathjs.Matrix, y: number): number | mathjs.MathArray | mathjs.Matrix;
    bellNumbers(n: number): number;
    bellNumbers(n: mathjs.BigNumber): mathjs.BigNumber;
    catalan(n: number): number;
    catalan(n: mathjs.BigNumber): mathjs.BigNumber;
    composition(n: number | mathjs.BigNumber, k: number | mathjs.BigNumber): number | mathjs.BigNumber;
    stirlingS2(n: number | mathjs.BigNumber, k: number | mathjs.BigNumber): number | mathjs.BigNumber;
    arg(x: number | mathjs.Complex): number;
    arg(x: mathjs.MathArray): mathjs.MathArray;
    arg(x: mathjs.Matrix): mathjs.Matrix;
    conj(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix;
    im(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    re(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    bignumber(x?: string | number | boolean | mathjs.MathArray | mathjs.Matrix | undefined): mathjs.BigNumber;
    boolean(x: string | number | boolean | mathjs.MathArray | mathjs.Matrix): boolean | mathjs.MathArray | mathjs.Matrix;
    chain(value?: any): mathjs.MathJsChain;
    complex(arg?: string | mathjs.MathArray | mathjs.Complex | mathjs.PolarCoordinates | undefined): mathjs.Complex;
    complex(re: number, im: number): mathjs.Complex;
    fraction(numerator: string | number | mathjs.MathArray | mathjs.Matrix, denominator?: string | number | mathjs.MathArray | mathjs.Matrix | undefined): mathjs.MathArray | mathjs.Fraction | mathjs.Matrix;
    index(...ranges: any[]): mathjs.Index;
    matrix(format?: "sparse" | "dense" | undefined): mathjs.Matrix;
    matrix(data: mathjs.MathArray | mathjs.Matrix, format?: "sparse" | "dense" | undefined, dataType?: string | undefined): mathjs.Matrix;
    number(value?: string | number | boolean | mathjs.MathArray | mathjs.BigNumber | mathjs.Fraction | mathjs.Unit | mathjs.Matrix | undefined): number | mathjs.MathArray | mathjs.Matrix;
    number(unit: mathjs.Unit, valuelessUnit: string | mathjs.Unit): number | mathjs.MathArray | mathjs.Matrix;
    sparse(data?: mathjs.MathArray | mathjs.Matrix | undefined, dataType?: string | undefined): mathjs.Matrix;
    string(value: any): string | mathjs.MathArray | mathjs.Matrix;
    unit(unit: string): mathjs.Unit;
    unit(value: number, unit: string): mathjs.Unit;
    createUnit(name: string, definition?: string | mathjs.UnitDefinition | undefined, options?: mathjs.CreateUnitOptions | undefined): mathjs.Unit;
    createUnit(units: Record<string, string | mathjs.UnitDefinition>, options?: mathjs.CreateUnitOptions | undefined): mathjs.Unit;
    compile(expr: mathjs.MathExpression): mathjs.EvalFunction;
    compile(exprs: mathjs.MathExpression[]): mathjs.EvalFunction[];
    eval(expr: mathjs.MathExpression | mathjs.MathExpression[], scope?: any): any;
    help(search: any): mathjs.Help;
    parse(expr: mathjs.MathExpression, options?: any): mathjs.MathNode;
    parse(exprs: mathjs.MathExpression[], options?: any): mathjs.MathNode[];
    parser(): mathjs.Parser;
    distance(x: mathjs.MathType, y: mathjs.MathType): number | mathjs.BigNumber;
    intersect(w: mathjs.MathArray | mathjs.Matrix, x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathArray | mathjs.Matrix, z: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray;
    and(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix, y: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix): boolean | mathjs.MathArray | mathjs.Matrix;
    not(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix): boolean | mathjs.MathArray | mathjs.Matrix;
    or(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix, y: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix): boolean | mathjs.MathArray | mathjs.Matrix;
    xor(x: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix, y: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Complex | mathjs.Unit | mathjs.Matrix): boolean | mathjs.MathArray | mathjs.Matrix;
    concat(...args: (number | mathjs.MathArray | mathjs.Matrix)[]): mathjs.MathArray | mathjs.Matrix;
    cross(x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathArray | mathjs.Matrix): mathjs.Matrix;
    det(x: mathjs.MathArray | mathjs.Matrix): number;
    diag(X: mathjs.MathArray | mathjs.Matrix, format?: string | undefined): mathjs.Matrix;
    diag(X: mathjs.MathArray | mathjs.Matrix, k: number | mathjs.BigNumber, format?: string | undefined): mathjs.Matrix;
    dot(x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathArray | mathjs.Matrix): number;
    eye(n: number | number[], format?: string | undefined): mathjs.Matrix;
    eye(m: number, n: number, format?: string | undefined): mathjs.Matrix;
    flatten(x: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    inv(x: number | mathjs.MathArray | mathjs.Complex | mathjs.Matrix): number | mathjs.MathArray | mathjs.Complex | mathjs.Matrix;
    ones(n: number | number[], format?: string | undefined): mathjs.MathArray | mathjs.Matrix;
    ones(m: number, n: number, format?: string | undefined): mathjs.MathArray | mathjs.Matrix;
    range(str: string, includeEnd?: boolean | undefined): mathjs.Matrix;
    range(start: number | mathjs.BigNumber, end: number | mathjs.BigNumber, includeEnd?: boolean | undefined): mathjs.Matrix;
    range(start: number | mathjs.BigNumber, end: number | mathjs.BigNumber, step: number | mathjs.BigNumber, includeEnd?: boolean | undefined): mathjs.Matrix;
    resize(x: mathjs.MathArray | mathjs.Matrix, size: mathjs.MathArray | mathjs.Matrix, defaultValue?: string | number | undefined): mathjs.MathArray | mathjs.Matrix;
    size(x: string | number | boolean | mathjs.MathArray | mathjs.Complex | mathjs.Unit | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    squeeze(x: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    subset(value: string | mathjs.MathArray | mathjs.Matrix, index: mathjs.Index, replacement?: any, defaultValue?: any): string | mathjs.MathArray | mathjs.Matrix;
    trace(x: mathjs.MathArray | mathjs.Matrix): number;
    transpose(x: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    zeros(n: number | number[], format?: string | undefined): mathjs.MathArray | mathjs.Matrix;
    zeros(m: number, n: number, format?: string | undefined): mathjs.MathArray | mathjs.Matrix;
    distribution(name: string): mathjs.Distribution;
    factorial(n: number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Matrix;
    gamma(n: number | mathjs.MathArray | mathjs.Matrix): number | mathjs.MathArray | mathjs.Matrix;
    kldivergence(x: mathjs.MathArray | mathjs.Matrix, y: mathjs.MathArray | mathjs.Matrix): number;
    multinomial(a: number[] | mathjs.BigNumber[]): number | mathjs.BigNumber;
    permutations(n: number | mathjs.BigNumber, k?: number | mathjs.BigNumber | undefined): number | mathjs.BigNumber;
    pickRandom(array: number[]): number;
    random(min?: number | undefined, max?: number | undefined): number;
    random(size: mathjs.MathArray | mathjs.Matrix, min?: number | undefined, max?: number | undefined): mathjs.MathArray | mathjs.Matrix;
    randomInt(min: number, max?: number | undefined): number;
    randomInt(size: mathjs.MathArray | mathjs.Matrix, min?: number | undefined, max?: number | undefined): mathjs.MathArray | mathjs.Matrix;
    compare(x: mathjs.MathType, y: mathjs.MathType): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Fraction | mathjs.Matrix;
    deepEqual(x: mathjs.MathType, y: mathjs.MathType): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Fraction | mathjs.Complex | mathjs.Unit | mathjs.Matrix;
    equal(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    larger(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    largerEq(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    smaller(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    smallerEq(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    unequal(x: mathjs.MathType, y: mathjs.MathType): boolean | mathjs.MathArray | mathjs.Matrix;
    max(...args: mathjs.MathType[]): any;
    max(A: mathjs.MathArray | mathjs.Matrix, dim?: number | undefined): any;
    mean(...args: mathjs.MathType[]): any;
    mean(A: mathjs.MathArray | mathjs.Matrix, dim?: number | undefined): any;
    median(...args: mathjs.MathType[]): any;
    min(...args: mathjs.MathType[]): any;
    min(A: mathjs.MathArray | mathjs.Matrix, dim?: number | undefined): any;
    mode(...args: mathjs.MathType[]): any;
    prod(...args: mathjs.MathType[]): any;
    quantileSeq(A: mathjs.MathArray | mathjs.Matrix, prob: number | mathjs.MathArray | mathjs.BigNumber, sorted?: boolean | undefined): number | mathjs.MathArray | mathjs.BigNumber | mathjs.Unit;
    std(array: mathjs.MathArray | mathjs.Matrix, normalization?: string | undefined): number;
    sum(...args: (number | mathjs.BigNumber | mathjs.Fraction)[]): any;
    sum(array: mathjs.MathArray | mathjs.Matrix): any;
    var(...args: (number | mathjs.BigNumber | mathjs.Fraction)[]): any;
    var(array: mathjs.MathArray | mathjs.Matrix, normalization?: string | undefined): any;
    acos(x: number): number;
    acos(x: mathjs.BigNumber): mathjs.BigNumber;
    acos(x: mathjs.Complex): mathjs.Complex;
    acos(x: mathjs.MathArray): mathjs.MathArray;
    acos(x: mathjs.Matrix): mathjs.Matrix;
    acosh(x: number): number;
    acosh(x: mathjs.BigNumber): mathjs.BigNumber;
    acosh(x: mathjs.Complex): mathjs.Complex;
    acosh(x: mathjs.MathArray): mathjs.MathArray;
    acosh(x: mathjs.Matrix): mathjs.Matrix;
    acot(x: number): number;
    acot(x: mathjs.BigNumber): mathjs.BigNumber;
    acot(x: mathjs.MathArray): mathjs.MathArray;
    acot(x: mathjs.Matrix): mathjs.Matrix;
    acoth(x: number): number;
    acoth(x: mathjs.BigNumber): mathjs.BigNumber;
    acoth(x: mathjs.MathArray): mathjs.MathArray;
    acoth(x: mathjs.Matrix): mathjs.Matrix;
    acsc(x: number): number;
    acsc(x: mathjs.BigNumber): mathjs.BigNumber;
    acsc(x: mathjs.MathArray): mathjs.MathArray;
    acsc(x: mathjs.Matrix): mathjs.Matrix;
    acsch(x: number): number;
    acsch(x: mathjs.BigNumber): mathjs.BigNumber;
    acsch(x: mathjs.MathArray): mathjs.MathArray;
    acsch(x: mathjs.Matrix): mathjs.Matrix;
    asec(x: number): number;
    asec(x: mathjs.BigNumber): mathjs.BigNumber;
    asec(x: mathjs.MathArray): mathjs.MathArray;
    asec(x: mathjs.Matrix): mathjs.Matrix;
    asech(x: number): number;
    asech(x: mathjs.BigNumber): mathjs.BigNumber;
    asech(x: mathjs.MathArray): mathjs.MathArray;
    asech(x: mathjs.Matrix): mathjs.Matrix;
    asin(x: number): number;
    asin(x: mathjs.BigNumber): mathjs.BigNumber;
    asin(x: mathjs.Complex): mathjs.Complex;
    asin(x: mathjs.MathArray): mathjs.MathArray;
    asin(x: mathjs.Matrix): mathjs.Matrix;
    asinh(x: number): number;
    asinh(x: mathjs.BigNumber): mathjs.BigNumber;
    asinh(x: mathjs.MathArray): mathjs.MathArray;
    asinh(x: mathjs.Matrix): mathjs.Matrix;
    atan(x: number): number;
    atan(x: mathjs.BigNumber): mathjs.BigNumber;
    atan(x: mathjs.MathArray): mathjs.MathArray;
    atan(x: mathjs.Matrix): mathjs.Matrix;
    atan2(y: number, x: number): number;
    atan2(y: mathjs.MathArray | mathjs.Matrix, x: mathjs.MathArray | mathjs.Matrix): mathjs.MathArray | mathjs.Matrix;
    atanh(x: number): number;
    atanh(x: mathjs.BigNumber): mathjs.BigNumber;
    atanh(x: mathjs.MathArray): mathjs.MathArray;
    atanh(x: mathjs.Matrix): mathjs.Matrix;
    cosh(x: number | mathjs.Unit): number;
    cosh(x: mathjs.BigNumber): mathjs.BigNumber;
    cosh(x: mathjs.Complex): mathjs.Complex;
    cosh(x: mathjs.MathArray): mathjs.MathArray;
    cosh(x: mathjs.Matrix): mathjs.Matrix;
    cot(x: number | mathjs.Unit): number;
    cot(x: mathjs.Complex): mathjs.Complex;
    cot(x: mathjs.MathArray): mathjs.MathArray;
    cot(x: mathjs.Matrix): mathjs.Matrix;
    coth(x: number | mathjs.Unit): number;
    coth(x: mathjs.Complex): mathjs.Complex;
    coth(x: mathjs.MathArray): mathjs.MathArray;
    coth(x: mathjs.Matrix): mathjs.Matrix;
    csc(x: number | mathjs.Unit): number;
    csc(x: mathjs.Complex): mathjs.Complex;
    csc(x: mathjs.MathArray): mathjs.MathArray;
    csc(x: mathjs.Matrix): mathjs.Matrix;
    csch(x: number | mathjs.Unit): number;
    csch(x: mathjs.Complex): mathjs.Complex;
    csch(x: mathjs.MathArray): mathjs.MathArray;
    csch(x: mathjs.Matrix): mathjs.Matrix;
    sec(x: number | mathjs.Unit): number;
    sec(x: mathjs.Complex): mathjs.Complex;
    sec(x: mathjs.MathArray): mathjs.MathArray;
    sec(x: mathjs.Matrix): mathjs.Matrix;
    sech(x: number | mathjs.Unit): number;
    sech(x: mathjs.Complex): mathjs.Complex;
    sech(x: mathjs.MathArray): mathjs.MathArray;
    sech(x: mathjs.Matrix): mathjs.Matrix;
    sin(x: number | mathjs.Unit): number;
    sin(x: mathjs.BigNumber): mathjs.BigNumber;
    sin(x: mathjs.Complex): mathjs.Complex;
    sin(x: mathjs.MathArray): mathjs.MathArray;
    sin(x: mathjs.Matrix): mathjs.Matrix;
    cos(x: number | mathjs.Unit): number;
    cos(x: mathjs.BigNumber): mathjs.BigNumber;
    cos(x: mathjs.Complex): mathjs.Complex;
    cos(x: mathjs.MathArray): mathjs.MathArray;
    cos(x: mathjs.Matrix): mathjs.Matrix;
    sinh(x: number | mathjs.Unit): number;
    sinh(x: mathjs.BigNumber): mathjs.BigNumber;
    sinh(x: mathjs.Complex): mathjs.Complex;
    sinh(x: mathjs.MathArray): mathjs.MathArray;
    sinh(x: mathjs.Matrix): mathjs.Matrix;
    tan(x: number | mathjs.Unit): number;
    tan(x: mathjs.BigNumber): mathjs.BigNumber;
    tan(x: mathjs.Complex): mathjs.Complex;
    tan(x: mathjs.MathArray): mathjs.MathArray;
    tan(x: mathjs.Matrix): mathjs.Matrix;
    tanh(x: number | mathjs.Unit): number;
    tanh(x: mathjs.BigNumber): mathjs.BigNumber;
    tanh(x: mathjs.Complex): mathjs.Complex;
    tanh(x: mathjs.MathArray): mathjs.MathArray;
    tanh(x: mathjs.Matrix): mathjs.Matrix;
    to(x: mathjs.MathArray | mathjs.Unit | mathjs.Matrix, unit: string | mathjs.Unit): mathjs.MathArray | mathjs.Unit | mathjs.Matrix;
    clone(x: any): any;
    filter(x: mathjs.MathArray | mathjs.Matrix, test: RegExp | ((item: any) => boolean)): mathjs.MathArray | mathjs.Matrix;
    forEach: (x: mathjs.MathArray | mathjs.Matrix, callback: (item: any) => any) => void;
    format(value: any, options?: number | mathjs.FormatOptions | ((item: any) => string) | undefined): string;
    isInteger(x: any): boolean;
    isNegative(x: any): boolean;
    isNumeric(x: any): boolean;
    isPositive(x: any): boolean;
    isZero(x: any): boolean;
    map(x: mathjs.MathArray | mathjs.Matrix, callback: (item: any) => any): mathjs.MathArray | mathjs.Matrix;
    partitionSelect(x: mathjs.MathArray | mathjs.Matrix, k: number, compare?: string | ((a: any, b: any) => number) | undefined): any;
    print: (template: string, values: any, precision?: number | undefined) => void;
    sort(x: mathjs.MathArray | mathjs.Matrix, compare?: string | ((a: any, b: any) => number) | undefined): mathjs.MathArray | mathjs.Matrix;
    typeof(x: any): string;
};

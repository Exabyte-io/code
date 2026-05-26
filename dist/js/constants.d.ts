export declare enum Units {
    bohr = "bohr",
    angstrom = "angstrom",
    degree = "degree",
    radian = "radian",
    alat = "alat"
}
/**
 * @summary Coordinates units for a material's basis.
 */
export declare enum AtomicCoordinateUnits {
    crystal = "crystal",
    cartesian = "cartesian"
}
export declare enum Tolerance {
    length = 0.01,
    lengthAngstrom = 0.001,
    pointsDistance = 0.001
}
export declare enum Coefficients {
    EV_TO_RY = 0.0734986176,
    BOHR_TO_ANGSTROM = 0.52917721092,
    ANGSTROM_TO_BOHR = 1.8897261245650618,
    EV_A_TO_RY_BOHR = 0.03889379346800142
}
export declare const HASH_TOLERANCE: 3;
export declare const coefficients: {
    EV_TO_RY: number;
    BOHR_TO_ANGSTROM: number;
    ANGSTROM_TO_BOHR: number;
    EV_A_TO_RY_BOHR: number;
};
export declare const tolerance: {
    length: number;
    lengthAngstrom: number;
    pointsDistance: number;
};
export declare const units: {
    bohr: string;
    angstrom: string;
    degree: string;
    radian: string;
    alat: string;
};
/**
 * @summary Coordinates units for a material's basis.
 */
export declare const ATOMIC_COORD_UNITS: {
    crystal: string;
    cartesian: string;
};
declare const _default: {
    coefficients: {
        EV_TO_RY: number;
        BOHR_TO_ANGSTROM: number;
        ANGSTROM_TO_BOHR: number;
        EV_A_TO_RY_BOHR: number;
    };
    tolerance: {
        length: number;
        lengthAngstrom: number;
        pointsDistance: number;
    };
    units: {
        bohr: string;
        angstrom: string;
        degree: string;
        radian: string;
        alat: string;
    };
    ATOMIC_COORD_UNITS: {
        crystal: string;
        cartesian: string;
    };
};
export default _default;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HASH_TOLERANCE = exports.ATOMIC_COORD_UNITS = exports.units = exports.tolerance = exports.coefficients = void 0;
exports.coefficients = {
    EV_TO_RY: 0.0734986176,
    BOHR_TO_ANGSTROM: 0.52917721092,
    ANGSTROM_TO_BOHR: 1 / 0.52917721092,
    EV_A_TO_RY_BOHR: 1 / 25.71104309541616,
};
exports.tolerance = {
    // in crystal coordinates
    length: 0.01,
    lengthAngstrom: 0.001,
    pointsDistance: 0.001,
};
exports.units = {
    bohr: "bohr",
    angstrom: "angstrom",
    degree: "degree",
    radian: "radian",
    alat: "alat",
};
/**
 * @summary Coordinates units for a material's basis.
 */
exports.ATOMIC_COORD_UNITS = {
    crystal: "crystal",
    cartesian: "cartesian",
};
// Only 3 digits will be considered for lattice and basis params on hashing
exports.HASH_TOLERANCE = 3;
exports.default = {
    coefficients: exports.coefficients,
    tolerance: exports.tolerance,
    units: exports.units,
    ATOMIC_COORD_UNITS: exports.ATOMIC_COORD_UNITS,
};

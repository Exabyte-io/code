"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ATOMIC_COORD_UNITS = exports.units = exports.tolerance = exports.coefficients = exports.HASH_TOLERANCE = exports.Coefficients = exports.Tolerance = exports.AtomicCoordinateUnits = exports.Units = void 0;
var Units;
(function (Units) {
    Units["bohr"] = "bohr";
    Units["angstrom"] = "angstrom";
    Units["degree"] = "degree";
    Units["radian"] = "radian";
    Units["alat"] = "alat";
})(Units || (exports.Units = Units = {}));
/**
 * @summary Coordinates units for a material's basis.
 */
var AtomicCoordinateUnits;
(function (AtomicCoordinateUnits) {
    AtomicCoordinateUnits["crystal"] = "crystal";
    AtomicCoordinateUnits["cartesian"] = "cartesian";
})(AtomicCoordinateUnits || (exports.AtomicCoordinateUnits = AtomicCoordinateUnits = {}));
// in crystal coordinates
var Tolerance;
(function (Tolerance) {
    Tolerance[Tolerance["length"] = 0.01] = "length";
    Tolerance[Tolerance["lengthAngstrom"] = 0.001] = "lengthAngstrom";
    Tolerance[Tolerance["pointsDistance"] = 0.001] = "pointsDistance";
})(Tolerance || (exports.Tolerance = Tolerance = {}));
var Coefficients;
(function (Coefficients) {
    Coefficients[Coefficients["EV_TO_RY"] = 0.0734986176] = "EV_TO_RY";
    Coefficients[Coefficients["BOHR_TO_ANGSTROM"] = 0.52917721092] = "BOHR_TO_ANGSTROM";
    Coefficients[Coefficients["ANGSTROM_TO_BOHR"] = 1.8897261245650618] = "ANGSTROM_TO_BOHR";
    Coefficients[Coefficients["EV_A_TO_RY_BOHR"] = 0.03889379346800142] = "EV_A_TO_RY_BOHR";
})(Coefficients || (exports.Coefficients = Coefficients = {}));
// Only 3 digits will be considered for lattice and basis params on hashing
exports.HASH_TOLERANCE = 3;
// TODO: remove everything below this line
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
exports.default = {
    coefficients: exports.coefficients,
    tolerance: exports.tolerance,
    units: exports.units,
    ATOMIC_COORD_UNITS: exports.ATOMIC_COORD_UNITS,
};

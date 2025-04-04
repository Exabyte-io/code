from math import pi

from mat3ra.esse.models.definitions.constants import FundamentalConstants

CONSTANTS = FundamentalConstants()


class Coefficients:
    # Same as used in: JS/TS
    EV_TO_RY = 0.0734986176
    BOHR_TO_ANGSTROM = 0.52917721092
    ANGSTROM_TO_BOHR = 1 / 0.52917721092
    EV_A_TO_RY_BOHR = 1 / 25.71104309541616

    # The below is migrated from:
    # https://github.com/Exabyte-io/express/blob/22614e549cdc3b0c344718b72ee2000383d77922/express/parsers/settings.py
    # and originally taken from https://github.com/hplgit/physical-quantities/blob/master/PhysicalQuantities.py

    # Internal, for convenience purposes
    _c = CONSTANTS.c  # speed of light, m/s
    _Grav = CONSTANTS.G  # gravitational constant
    _hplanck = CONSTANTS.h  # Planck constant, J s
    _e = CONSTANTS.e  # elementary charge
    _me = CONSTANTS.me  # electron mass
    _mu0 = 4.0e-7 * pi  # permeability of vacuum, atomic units

    _mp = 1.6726231e-27  # proton mass
    _Nav = 6.0221367e23  # Avogadro number
    _k = 1.380658e-23  # Boltzmann constant, J/K
    _amu = 1.6605402e-27  # atomic mass unit, kg
    _eps0 = 1 / _mu0 / _c**2  # permittivity of vacuum
    _hbar = _hplanck / (2 * pi)  # Planck constant / 2pi, J s

    # External
    BOHR = 4e10 * pi * _eps0 * _hbar**2 / _me / _e**2  # Bohr radius in angstrom
    eV = 1.0
    HARTREE = _me * _e**3 / 16 / pi**2 / _eps0**2 / _hbar**2  # in eV
    RYDBERG = 0.5 * HARTREE  # in eV
    Ry = RYDBERG
    Ha = HARTREE
    kJ = 1000.0 / _e
    kcal = 4.184 * kJ
    cm_inv_to_ev = 0.00012398  # cm^-1 to eV
    ry_bohr_to_eV_A = 25.71104309541616  # or RYDBERG / BOHR


class Tolerance:
    # in crystal coordinates
    length = 0.01
    lengthAngstrom = 0.001
    pointsDistance = 0.001


class Units:
    bohr = "bohr"
    angstrom = "angstrom"
    degree = "degree"
    radian = "radian"
    alat = "alat"


class AtomicCoordinateUnits:
    crystal = "crystal"
    cartesian = "cartesian"

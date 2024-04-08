class Coefficients:
    EV_TO_RY = 0.0734986176
    BOHR_TO_ANGSTROM = 0.52917721092
    ANGSTROM_TO_BOHR = 1 / 0.52917721092
    EV_A_TO_RY_BOHR = 1 / 25.71104309541616


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

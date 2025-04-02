from mat3ra.code.constants import FundamentalConstants


def test_constants():
    CONSTANTS = FundamentalConstants()
    assert CONSTANTS.c == 299792458.0
    assert CONSTANTS.h == 6.62607015e-34
    assert CONSTANTS.e == 1.602176634e-19
    assert CONSTANTS.me == 9.109383713928e-31
    assert CONSTANTS.G == 6.6743015e-11
    assert CONSTANTS.eps0 == 8.854187818814e-12
    assert CONSTANTS.mu0 == 1.256637061272e-6

import { expect } from "chai";

import { RoundedVector3D, Vector3D } from "../../src/js/vector";

const VECTOR_FLOAT: [number, number, number] = [1.23456789, 2.345678901, 3.456789012];
const VECTOR_FLOAT_NORM = 4.3561172682906;
const FLOAT_PRECISION = 1e-8;

const VECTOR_FLOAT_DIFFERENT_WITHIN_TOL: [number, number, number] = [
    1.23456789999, 2.345678901, 3.456789012,
];
const VECTOR_FLOAT_DIFFERENT_OUTSIDE_TOL: [number, number, number] = [
    1.2345699999, 2.345678901, 3.456789012,
];

const VECTOR_FLOAT_ROUNDED_4: [number, number, number] = [1.2346, 2.3457, 3.4568];
const VECTOR_FLOAT_ROUNDED_3: [number, number, number] = [1.235, 2.346, 3.457];

describe("Vector3D", () => {
    it("should do init and value access", () => {
        const vector = new Vector3D(VECTOR_FLOAT);
        expect(vector.value).to.deep.equal(VECTOR_FLOAT);
        expect(vector.x).to.be.closeTo(1.23456789, FLOAT_PRECISION);
        expect(vector.y).to.be.closeTo(2.345678901, FLOAT_PRECISION);
        expect(vector.z).to.be.closeTo(3.456789012, FLOAT_PRECISION);
    });

    it("should do init with wrong type throws", () => {
        expect(() => new Vector3D([1, 2, "3"] as any)).to.throw();
    });

    it("should do init with wrong size throws", () => {
        expect(() => new Vector3D([1, 2] as any)).to.throw();
    });

    it("should do equality", () => {
        const vector = new Vector3D(VECTOR_FLOAT);
        expect(vector.equals(VECTOR_FLOAT)).to.equal(true);
        expect(vector.equals(VECTOR_FLOAT_DIFFERENT_WITHIN_TOL)).to.equal(true);
        expect(vector.equals(VECTOR_FLOAT_DIFFERENT_OUTSIDE_TOL)).to.equal(false);
    });

    it("should do norm is close to expected", () => {
        const vector = new Vector3D(VECTOR_FLOAT);
        expect(Math.abs(vector.norm - VECTOR_FLOAT_NORM)).to.be.lessThan(FLOAT_PRECISION);
    });
});

describe("RoundedVector3D", () => {
    it("should do init and default value access", () => {
        const vector = new RoundedVector3D(VECTOR_FLOAT);
        expect(vector.value).to.deep.equal(VECTOR_FLOAT);
    });

    it("should do serialization with precision 4", () => {
        RoundedVector3D.roundPrecision = 4;
        const vector = new RoundedVector3D(VECTOR_FLOAT);

        expect(vector.toJSON()).to.deep.equal(VECTOR_FLOAT_ROUNDED_4);
        expect(vector.value_rounded).to.deep.equal(VECTOR_FLOAT_ROUNDED_4);
        expect(vector.x_rounded).to.be.deep.equal(VECTOR_FLOAT_ROUNDED_4[0]);
        expect(vector.y_rounded).to.be.deep.equal(VECTOR_FLOAT_ROUNDED_4[1]);
        expect(vector.z_rounded).to.be.deep.equal(VECTOR_FLOAT_ROUNDED_4[2]);
    });

    it("should do serialization with precision 3", () => {
        RoundedVector3D.roundPrecision = 3;
        const vector = new RoundedVector3D(VECTOR_FLOAT);

        expect(vector.toJSON()).to.deep.equal(VECTOR_FLOAT_ROUNDED_3);
        expect(vector.value_rounded).to.deep.equal(VECTOR_FLOAT_ROUNDED_3);
    });

    it("should do equality changes with precision", () => {
        RoundedVector3D.roundPrecision = 4;
        let vector = new RoundedVector3D(VECTOR_FLOAT);
        expect(vector.equals(VECTOR_FLOAT)).to.equal(true);
        expect(vector.equals(VECTOR_FLOAT_ROUNDED_4)).to.equal(true);
        expect(vector.equals(VECTOR_FLOAT_ROUNDED_3)).to.equal(false);

        RoundedVector3D.roundPrecision = 3;
        vector = new RoundedVector3D(VECTOR_FLOAT);
        expect(vector.equals(VECTOR_FLOAT_ROUNDED_4)).to.equal(true);
        expect(vector.equals(VECTOR_FLOAT_ROUNDED_3)).to.equal(true);
    });
});

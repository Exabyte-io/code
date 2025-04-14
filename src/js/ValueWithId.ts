export class ValueWithId<T> {
    id: number;

    value: T | null;

    constructor(id = 0, value: T | null = null) {
        this.id = id;
        this.value = value;
    }

    /**
     * Converts the instance to a plain JavaScript object.
     */
    toJSON(): object {
        if (
            this.value !== null &&
            typeof this.value === "object" &&
            "toJSON" in this.value &&
            typeof (this.value as any).toJSON === "function"
        ) {
            return { id: this.id, value: (this.value as any).toJSON() };
        }
        return { id: this.id, value: this.value };
    }

    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals(other: ValueWithId<T>): boolean {
        if (!(other instanceof ValueWithId)) {
            return false;
        }

        if (Array.isArray(this.value) && Array.isArray(other.value)) {
            if (this.value.length !== other.value.length) {
                return false;
            }

            for (let i = 0; i < this.value.length; i++) {
                if (this.value[i] !== other.value[i]) {
                    return false;
                }
            }

            return this.id === other.id;
        }

        return this.id === other.id && this.value === other.value;
    }
}

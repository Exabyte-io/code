/**
 * Represents a value with an associated ID.
 */
export class ValueWithId<T> {
    constructor(public id: number = 0, public value: T = null as unknown as T) {}

    /**
     * Converts the instance to a plain object.
     */
    toDict(): { id: number; value: any } {
        // If value has a toDict method, call it
        if (
            this.value !== null &&
            typeof this.value === "object" &&
            "toDict" in this.value &&
            typeof (this.value as any).toDict === "function"
        ) {
            return { id: this.id, value: (this.value as any).toDict() };
        }
        return { id: this.id, value: this.value };
    }

    /**
     * Converts the instance to a JSON string.
     */
    toJson(): string {
        return JSON.stringify(this.toDict());
    }

    /**
     * Checks if this instance is equal to another ValueWithId.
     */
    equals(other: ValueWithId<T>): boolean {
        if (!(other instanceof ValueWithId)) {
            return false;
        }

        // Handle array comparison
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

        // Handle regular value comparison
        return this.id === other.id && this.value === other.value;
    }
}

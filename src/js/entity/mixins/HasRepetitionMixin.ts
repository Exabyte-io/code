import type { InMemoryEntity } from "../in_memory";

export interface HasRepetition {
    _repetition: number;
    _totalRepetitions: number;
    repetition: number;
    totalRepetitions: number;
    setRepetition: (repetition: number) => void;
    setTotalRepetitions: (totalRepetition: number) => void;
}

export function hasRepetitionMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & HasRepetition {
    // @ts-expect-error
    const properties: InMemoryEntity & HasRepetition = {
        _repetition: 0,

        _totalRepetitions: 0,

        get repetition() {
            return this._repetition;
        },
        get totalRepetitions() {
            return this._totalRepetitions || 1;
        },
        setRepetition(repetition: number) {
            this.repetition = repetition;
            // if (["Subworkflow", "Workflow"].find((n) => this.constructor.name === n)) {
            //     this.units.forEach((u) => u.setRepetition(repetition));
            // }

            // if (this.constructor.name === "Workflow") {
            //     this.subworkflows.forEach((sw) => sw.setRepetition(repetition));
            //     this.workflows.forEach((wf) => wf.setRepetition(repetition));
            // }
        },
        setTotalRepetitions(totalRepetition: number) {
            this._totalRepetitions = totalRepetition;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

import { InMemoryEntityConstructor } from "../in_memory";

export interface HasRepetition {
    setRepetition: (repetition: number) => void;
}

type Units = HasRepetition[];
type Workflows = HasRepetition[];
type Subworkflows = HasRepetition[];

export function HasRepetitionMixin<T extends InMemoryEntityConstructor>(superclass: T) {
    return class extends superclass {
        _repetition = 0;

        _totalRepetitions = 0;

        // TODO: has to be moved somewhere
        declare units: Units;

        declare workflows: Workflows;

        declare subworkflows: Subworkflows;

        get repetition() {
            return this._repetition || 0;
        }

        // TODO: make abstract and move to workflow/subworkflow classes?
        setRepetition(repetition: number) {
            this._repetition = repetition;

            if (["Subworkflow", "Workflow"].find((n) => this.constructor.name === n)) {
                this.units.forEach((u) => u.setRepetition(repetition));
            }

            if (this.constructor.name === "Workflow") {
                this.subworkflows.forEach((sw) => sw.setRepetition(repetition));
                this.workflows.forEach((wf) => wf.setRepetition(repetition));
            }
        }

        get totalRepetitions() {
            return this._totalRepetitions || 1;
        }

        setTotalRepetitions(totalRepetition: number) {
            this._totalRepetitions = totalRepetition;
        }
    };
}

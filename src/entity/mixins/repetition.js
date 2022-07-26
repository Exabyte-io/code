export const HasRepetitionMixin = (superclass) => {
    return class extends superclass {
        get repetition() {
            return this._repetition || 0;
        }

        setRepetition(repetition) {
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

        setTotalRepetitions(totalRepetition) {
            this._totalRepetitions = totalRepetition;
        }
    };
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HasRepetitionMixin = HasRepetitionMixin;
function HasRepetitionMixin(superclass) {
    return class extends superclass {
        constructor() {
            super(...arguments);
            this._repetition = 0;
            this._totalRepetitions = 0;
        }
        get repetition() {
            return this._repetition || 0;
        }
        // TODO: make abstract and move to workflow/subworkflow classes?
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
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRepetitionMixin = hasRepetitionMixin;
function hasRepetitionMixin(item) {
    // @ts-expect-error
    const properties = {
        _repetition: 0,
        _totalRepetitions: 0,
        get repetition() {
            return this._repetition;
        },
        get totalRepetitions() {
            return this._totalRepetitions || 1;
        },
        setRepetition(repetition) {
            this.repetition = repetition;
            // if (["Subworkflow", "Workflow"].find((n) => this.constructor.name === n)) {
            //     this.units.forEach((u) => u.setRepetition(repetition));
            // }
            // if (this.constructor.name === "Workflow") {
            //     this.subworkflows.forEach((sw) => sw.setRepetition(repetition));
            //     this.workflows.forEach((wf) => wf.setRepetition(repetition));
            // }
        },
        setTotalRepetitions(totalRepetition) {
            this._totalRepetitions = totalRepetition;
        },
    };
    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

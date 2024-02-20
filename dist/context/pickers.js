"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobContextPickKeysForMixin = exports.WorkflowContextPickKeysForMixin = void 0;
const underscore_1 = __importDefault(require("underscore"));
const WorkflowContextPickKeysForMixin = (workflow) => {
    return {
        workflow: underscore_1.default.pick(workflow, ["hasRelaxation"]),
    };
};
exports.WorkflowContextPickKeysForMixin = WorkflowContextPickKeysForMixin;
const JobContextPickKeysForMixin = (job) => {
    return {
        job: underscore_1.default.pick(job, ["parentJob"]),
    };
};
exports.JobContextPickKeysForMixin = JobContextPickKeysForMixin;

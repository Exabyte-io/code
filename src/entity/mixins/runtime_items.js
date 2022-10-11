/* eslint-disable max-classes-per-file, class-methods-use-this */
import s from "underscore.string";

import { safeMakeObject } from "../../utils/object";

/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */

export const RuntimeItemsMixin = (superclass) => {
    return class extends superclass {
        get results() {
            return this.prop("results", this.defaultResults).map(safeMakeObject);
        }

        get monitors() {
            return this.prop("monitors", this.defaultMonitors).map(safeMakeObject);
        }

        get preProcessors() {
            return this.prop("preProcessors", this.defaultPreProcessors).map(safeMakeObject);
        }

        get postProcessors() {
            return this.prop("postProcessors", this.defaultPostProcessors).map(safeMakeObject);
        }

        get defaultResults() {
            return [];
        }

        get defaultMonitors() {
            return [];
        }

        get defaultPreProcessors() {
            return [];
        }

        get defaultPostProcessors() {
            return [];
        }

        get hashObjectFromRuntimeItems() {
            return {
                results: this.results,
                preProcessors: this.preProcessors,
                postProcessors: this.postProcessors,
            };
        }
    };
};

export const RuntimeItemsUILogicMixin = (superclass) => {
    return class extends RuntimeItemsMixin(superclass) {
        constructor(config) {
            super(config);
            this._initRuntimeItems(
                ["results", "monitors", "preProcessors", "postProcessors"],
                config,
            );
        }

        setRuntimeItemsToDefaultValues() {
            ["results", "monitors", "preProcessors", "postProcessors"].map((name) =>
                this.setProp(name, this[`default${s.capitalize(name)}`]),
            );
        }

        /**
         * @summary Must pass config for subclasses to override and use initialization logic
         * @param keys
         * @param config
         * @private
         */
        // eslint-disable-next-line no-unused-vars
        _initRuntimeItems(keys, config) {
            // keeping this separate from constructor so that it can be overridden in mixing (eg. in `ExecutionUnit`)
            const me = this;
            keys.map((key) => {
                if (!me._json[key]) me._json[key] = me[`default${s.capitalize(key)}`];
                return null;
            });
        }

        // eslint-disable-next-line default-param-last
        _addRuntimeItem(key = "results", config) {
            this._json[key].push(safeMakeObject(config));
        }

        // eslint-disable-next-line default-param-last
        _removeRuntimeItem(key = "results", config) {
            const newConfig = safeMakeObject(config);
            this._removeRuntimeItemByName(key, newConfig.name);
        }

        _removeRuntimeItemByName(key, name) {
            this._json[key] = this._json[key].filter((x) => x.name !== name);
        }

        // eslint-disable-next-line default-param-last
        _toggleRuntimeItem(key = "results", data, isAdding) {
            if (isAdding) {
                this._addRuntimeItem(key, data);
            } else {
                this._removeRuntimeItem(key, data);
            }
        }

        toggleResult(data, isAdding) {
            this._toggleRuntimeItem("results", data, isAdding);
        }

        toggleMonitor(data, isAdding) {
            this._toggleRuntimeItem("monitors", data, isAdding);
        }

        togglePreProcessor(data, isAdding) {
            this._toggleRuntimeItem("preProcessors", data, isAdding);
        }

        togglePostProcessor(data, isAdding) {
            this._toggleRuntimeItem("postProcessors", data, isAdding);
        }

        get resultNames() {
            return this.results.map((r) => {
                return r && r.name;
            });
        }

        get monitorNames() {
            return this.monitors.map((r) => r.name);
        }

        get postProcessorNames() {
            return this.postProcessors.map((r) => r.name);
        }

        get preProcessorNames() {
            return this.preProcessors.map((r) => r.name);
        }

        getResultByName(name) {
            return this.results.find((r) => r.name === name);
        }

        filterResultsByName(name) {
            return this.results.filter((r) => r.name === name);
        }

        updateResultsWithArrayOfObjectsByName(name, array) {
            const filteredInput = array.filter((r) => r.name === name);
            this._json.results = this._json.results
                .filter((r) => r.name !== name)
                .concat(filteredInput);
        }
    };
};

// "Placeholder" mixin. Used to indicate the presence of the fields in parent class.
export const RuntimeItemsUIAllowedMixin = (superclass) => {
    return class extends superclass {
        get allowedResults() {
            return [];
        }

        get allowedMonitors() {
            return [];
        }

        get allowedPostProcessors() {
            return [];
        }
    };
};

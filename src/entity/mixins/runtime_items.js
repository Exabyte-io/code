import _ from "underscore";
import s from "underscore.string";

/*
 * @summary Contains runtime items: results, monitors, pre/postProcessors
 *          Is meant to work with Entity, InMemoryEntity b/c of `prop` extraction from `_json`.
 */

export const RuntimeItemsMixin = (superclass) => {
    return class extends superclass {
        // converts "string" to {"name": "string"}
        _safeMakeNameObjectFromString(name) {
            if (!name) return;
            let result = name;
            if (_.isString(name)) result = {name};
            if (!_.isObject(result) || _.isArray(result) || !result.name)
                throw new Error(
                    "RuntimeItemsMixin._safeMakeNameObjectFromString: failed while creating a named object",
                );
            return result;
        }

        get results() {
            return this.prop("results", this.defaultResults).map((r) => {return this._safeMakeNameObjectFromString(r)});
        }

        get monitors() {
            return this.prop("monitors", this.defaultMonitors).map(this._safeMakeNameObjectFromString)
        }

        get preProcessors() {
            return this.prop("preProcessors", this.defaultPreProcessors).map(this._safeMakeNameObjectFromString)
        }

        get postProcessors() {
            return this.prop("postProcessors", this.defaultPostProcessors).map(this._safeMakeNameObjectFromString)
        }

        get defaultResults() {return []}

        get defaultMonitors() {return []}

        get defaultPreProcessors() {return []}

        get defaultPostProcessors() {return []}

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
        _initRuntimeItems(keys, config) {
            // keeping this separate from constructor so that it can be overridden in mixing (eg. in `ExecutionUnit`)
            const me = this;
            keys.map((key) => {
                if (!me._json[key]) me._json[key] = me[`default${s.capitalize(key)}`];
            });
        }

        _addRuntimeItem(key = "results", config) {
            this._json[key].push(this._safeMakeNameObjectFromString(config));
        }

        _removeRuntimeItem(key = "results", config) {
            config = this._safeMakeNameObjectFromString(config);
            this._removeRuntimeItemByName(key, config.name);
        }

        _removeRuntimeItemByName(key, name) {
            this._json[key] = this._json[key].filter(x => x.name !== name);
        }

        _toggleRuntimeItem(key = "results", data, isAdding) {
            isAdding ? this._addRuntimeItem(key, data) : this._removeRuntimeItem(key, data);
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
            return this.results.map(r => {
                return r && r.name
            })
        }

        get monitorNames() {
            return this.monitors.map(r => r.name)
        }

        get postProcessorNames() {
            return this.postProcessors.map(r => r.name)
        }

        get preProcessorNames() {
            return this.preProcessors.map(r => r.name)
        }

        getResultByName(name) {
            return this.results.find(r => r.name === name);
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

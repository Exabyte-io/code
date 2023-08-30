/*
 * @summary This is a standalone class that contains "data" for a property with "name". Helps facilitate UI logic.
 *          Can be initialized from context when user edits are present:
 *          - user edits the corresponding property, eg. "kpath"
 *          - isKpathEdited is set to `true`
 *          - context property is updated for the parent entity (eg. Unit) in a way that persists in Redux state
 *          - new entity inherits the "data" through "context" field in config
 *          - `extraData` field is used to store any other data that should be passed from one instance of provider
 *             to next one, for example data about material to track when it is changed.
 * @notes   Should hold static data only (see `setData` method), no classes or functions
 */
import lodash from "lodash";

import { deepClone } from "../utils/clone";

export interface ContextProviderConfig {
    name: string;
    domain?: string;
    entityName?: string;
    data?: object;
    extraData?: object;
    isEdited?: boolean;
    context?: object;
}

export class ContextProvider {
    config: ContextProviderConfig;

    name: string;

    domain?: string;

    entityName?: string;

    data?: object;

    extraData?: object;

    isEdited?: boolean;

    constructor(config: ContextProviderConfig) {
        this.config = config;
        this.name = config.name; // property name, ie. "kpath"
        this.domain = config.domain || "default";

        // if context is passed inside config, treat it as additional config
        // eslint-disable-next-line no-param-reassign
        if (config.context) config = ContextProvider.createConfigFromContext(config);

        this.entityName = config.entityName || "unit"; // entity this provider yields data to, eg. "unit", "subworkflow"
        this.data = config.data; // property data container
        this.extraData = config.extraData; // property extraData container, used track changes to data, for example
        this.isEdited = config.isEdited; // whether property was edited by user, available under `isEdited` key

        this.setIsEdited = this.setIsEdited.bind(this);
        this.getData = this.getData.bind(this);
        this.setData = this.setData.bind(this);
        this.transformData = this.transformData.bind(this);
        this.yieldData = this.yieldData.bind(this);
    }

    static getConstructorConfig(config: ContextProviderConfig) {
        return {
            constructor: this.prototype.constructor,
            config,
        };
    }

    static createConfigFromContext(config: ContextProviderConfig) {
        const data = lodash.get(config.context, config.name);
        const isEdited = lodash.get(config.context, this.getIsEditedKeyByName(config.name));
        const extraData = lodash.get(config.context, this.getExtraDataKeyByName(config.name));
        return Object.assign(
            config,
            data
                ? {
                      data,
                      extraData,
                      isEdited,
                  }
                : {},
        );
    }

    setIsEdited(isEdited: boolean) {
        this.isEdited = isEdited;
    }

    getData() {
        return this.isEdited ? this.data : this.defaultData;
    }

    setData(data: object) {
        this.data = deepClone(data);
    }

    // override in children
    // eslint-disable-next-line class-methods-use-this
    get defaultData() {
        throw new Error("Not implemented.");
    }

    // override in children
    // eslint-disable-next-line class-methods-use-this
    transformData(data: object) {
        return data;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    yieldData(...transformDataArgs: any) {
        const extraDataObject = this.extraData ? { [this.extraDataKey]: this.extraData } : {};
        return {
            ...extraDataObject,
            // @ts-ignore
            [this.name]: this.transformData(this.getData(), ...transformDataArgs),
            [this.isEditedKey]: this.isEdited,
        };
    }

    // override when this.data needs additional processing before making it available to rendering context
    // used to calculate explicit points path, for example
    yieldDataForRendering() {
        return this.yieldData();
    }

    get extraDataKey() {
        return `${this.name}ExtraData`;
    }

    static getExtraDataKeyByName(name: string) {
        return `${name}ExtraData`;
    }

    get isEditedKey() {
        return `is${lodash.capitalize(this.name)}Edited`;
    }

    static getIsEditedKeyByName(name: string) {
        return `is${lodash.capitalize(name)}Edited`;
    }

    get isUnitContextProvider() {
        return this.entityName === "unit";
    }

    get isSubworkflowContextProvider() {
        return this.entityName === "subworkflow";
    }
}

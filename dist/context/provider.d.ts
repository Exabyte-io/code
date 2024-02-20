export interface ContextProviderConfig {
    name: string;
    domain?: string;
    entityName?: string;
    data?: object;
    extraData?: object;
    isEdited?: boolean;
    context?: object;
}
export declare class ContextProvider {
    config: ContextProviderConfig;
    name: string;
    domain?: string;
    entityName?: string;
    data?: object;
    extraData?: object;
    isEdited?: boolean;
    constructor(config: ContextProviderConfig);
    static getConstructorConfig(config: ContextProviderConfig): {
        constructor: Function;
        config: ContextProviderConfig;
    };
    static createConfigFromContext(config: ContextProviderConfig): ContextProviderConfig & ({
        data: any;
        extraData: any;
        isEdited: any;
    } | {
        data?: undefined;
        extraData?: undefined;
        isEdited?: undefined;
    });
    setIsEdited(isEdited: boolean): void;
    getData(): void | object;
    setData(data: object): void;
    get defaultData(): void;
    transformData(data: object): object;
    yieldData(...transformDataArgs: any): {
        [x: string]: boolean | object;
    };
    yieldDataForRendering(): {
        [x: string]: boolean | object;
    };
    get extraDataKey(): string;
    static getExtraDataKeyByName(name: string): string;
    get isEditedKey(): string;
    static getIsEditedKeyByName(name: string): string;
    get isUnitContextProvider(): boolean;
    get isSubworkflowContextProvider(): boolean;
}

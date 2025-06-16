import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
export interface Pseudo {
    element: string;
    filename?: string;
    path?: string;
}
export interface MethodData {
    pseudo?: Pseudo[];
}
export type MethodDataConfig = {
    context?: {
        methodData?: MethodData;
    };
    isEdited?: boolean;
};
export type MethodDataContextMixinType = {
    isEdited?: boolean;
    methodDataHash?: string;
    extraData?: {
        methodDataHash?: string;
    };
    methodData: MethodData;
    _methodData: MethodData;
    isMethodDataUpdated: boolean;
    _initMethodDataHash: () => void;
    initMethodDataContextMixin: () => void;
};
export declare function methodDataContextMixin(item: ContextProvider): void;
export declare function MethodDataContextMixin<T extends Constructor<ContextProvider>>(superclass: T): T & Constructor<MethodDataContextMixinType>;

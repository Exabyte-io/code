import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
interface Pseudo {
    element: string;
    filename?: string;
    path?: string;
}
interface MethodData {
    pseudo?: Pseudo[];
}
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
export {};

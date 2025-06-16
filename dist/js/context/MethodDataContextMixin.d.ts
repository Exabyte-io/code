import type { Constructor } from "../utils/types";
import type { ContextProvider } from "./provider";
export type MethodDataContextMixinType = {
    isEdited?: boolean;
    methodDataHash?: string;
    extraData?: {
        methodDataHash?: string;
    };
    methodData: any;
    _methodData: any;
    isMethodDataUpdated: boolean;
    _initMethodDataHash: () => void;
    initMethodDataContextMixin: () => void;
};
export declare function methodDataContextMixin(item: ContextProvider): void;
export declare function MethodDataContextMixin<T extends Constructor<ContextProvider>>(superclass: T): T & Constructor<MethodDataContextMixinType>;

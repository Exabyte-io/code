declare const getInSetEntrySelectorBuilder: (config: object) => {
    inSet: {
        $elemMatch: object;
    };
};
declare const getInSetEntrySelectorByIdsCls: (ids: string[], cls?: string | null) => {
    inSet: {
        $elemMatch: object;
    };
};
declare const getInSetEntrySelectorByIds: (ids: string[]) => {
    inSet: {
        $elemMatch: object;
    };
};
declare const getInSetEntrySelector: (cls?: string, _id?: string) => {
    inSet: {
        $elemMatch: {
            _id?: string | undefined;
            cls?: string | undefined;
        };
    };
};
declare const getInSetEntryWithoutClsOnly: {
    inSet: {
        $not: {
            $elemMatch: {
                cls: {
                    $exists: boolean;
                };
            };
        };
    };
};
export { getInSetEntrySelectorByIdsCls, getInSetEntryWithoutClsOnly, getInSetEntrySelectorByIds, getInSetEntrySelectorBuilder, getInSetEntrySelector, };

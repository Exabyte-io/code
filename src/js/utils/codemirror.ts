import forEach from "lodash/forEach";

export const refreshCodeMirror = (containerId: string) => {
    const container = document.getElementById(containerId);
    const editors = container?.getElementsByClassName("CodeMirror");
    // @ts-ignore
    forEach(editors, (cm) => cm.CodeMirror.refresh());
};

import forEach from "lodash/forEach";

export const refreshCodeMirror = (containerId) => {
    const container = document.getElementById(containerId);
    const editors = container.getElementsByClassName("CodeMirror");
    forEach(editors, (cm) => cm.CodeMirror.refresh());
};

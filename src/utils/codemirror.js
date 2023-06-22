import lodash from "lodash";

export const refreshCodeMirror = (containerId) => {
    const container = document.getElementById(containerId);
    const editors = container.getElementsByClassName("CodeMirror");
    lodash.forEach(editors, (cm) => cm.CodeMirror.refresh());
};

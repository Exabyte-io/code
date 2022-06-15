import lodash from 'lodash';

export const refreshCodeMirror = function (containerId) {
    const container = document.getElementById(containerId);
    const editors = container.getElementsByClassName('CodeMirror');
    lodash.each(editors, cm => cm.CodeMirror.refresh());
};

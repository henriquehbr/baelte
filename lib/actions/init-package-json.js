"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const didSucceed = (code) => code === 0;
const installDependencies = (answers, { verbose, path }) => {
    return new Promise((resolve, reject) => {
        const spawnOptions = verbose
            ? {
                cwd: path,
                shell: true,
                stdio: 'inherit'
            }
            : {
                cwd: path
            };
    });
};
exports.default = (plop) => {
    plop.setDefaultInclude({ actionTypes: true });
    plop.setActionType('installDependencies', installDependencies);
};

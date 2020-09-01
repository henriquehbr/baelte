"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
const didSucceed = (code) => code === 0;
const installDependencies = (answers, config) => {
    return new Promise((resolve, reject) => {
        const spawnOptions = (config === null || config === void 0 ? void 0 : config.verbose) ? {
            cwd: config === null || config === void 0 ? void 0 : config.path,
            shell: true,
            stdio: 'inherit'
        }
            : {
                cwd: config === null || config === void 0 ? void 0 : config.path
            };
        const npmInstallCommand = (config === null || config === void 0 ? void 0 : config.dependencies) && cross_spawn_1.spawn('npm', ['i', ...config.dependencies], spawnOptions);
        npmInstallCommand &&
            npmInstallCommand.on('close', code => didSucceed(code)
                ? resolve(`npm installed ${config === null || config === void 0 ? void 0 : config.dependencies.length} packages successfully`)
                : reject(`npm couldn't install the dependencies, error ${code}`));
    });
};
exports.default = (plop) => {
    plop.setDefaultInclude({ actionTypes: true });
    plop.setActionType('installDependencies', installDependencies);
};

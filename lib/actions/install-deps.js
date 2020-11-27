"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
const didSucceed = (code) => code === 0;
const npmInstall = (answers, config) => new Promise((resolve, reject) => {
    const spawnOptions = (config === null || config === void 0 ? void 0 : config.verbose) ?
        {
            cwd: config.path,
            shell: true,
            stdio: 'inherit'
        } :
        { cwd: config === null || config === void 0 ? void 0 : config.path };
    const installSubCommand = (config === null || config === void 0 ? void 0 : config.packageManager) === 'yarn' ? 'add' : 'i';
    const npmInstallCommands = Object.entries({
        dependencies: (config === null || config === void 0 ? void 0 : config.dependencies) &&
            cross_spawn_1.spawn(config.packageManager, [installSubCommand, ...config.dependencies], spawnOptions),
        devDependencies: (config === null || config === void 0 ? void 0 : config.devDependencies) &&
            cross_spawn_1.spawn(config.packageManager, [installSubCommand, '-D', ...config.devDependencies], spawnOptions),
        peerDependencies: (config === null || config === void 0 ? void 0 : config.peerDependencies) &&
            cross_spawn_1.spawn(config.packageManager, [installSubCommand, '-P', ...config.peerDependencies], spawnOptions)
    }).filter(([dependencyType, dependencyNames]) => dependencyNames);
    npmInstallCommands.forEach(([dependencyType, dependencyNames]) => {
        dependencyNames === null || dependencyNames === void 0 ? void 0 : dependencyNames.on('close', code => {
            switch (dependencyType) {
                case 'dependencies':
                    didSucceed(code) ?
                        resolve(`${config === null || config === void 0 ? void 0 : config.packageManager} installed ${config === null || config === void 0 ? void 0 : config.dependencies.length} dependencies`) :
                        reject(`${config === null || config === void 0 ? void 0 : config.packageManager} couldn’t install dependencies, error: ${code}`);
                    break;
                case 'devDependencies':
                    didSucceed(code) ?
                        resolve(`${config === null || config === void 0 ? void 0 : config.packageManager} installed ${config === null || config === void 0 ? void 0 : config.devDependencies.length} devDependencies`) :
                        reject(`${config === null || config === void 0 ? void 0 : config.packageManager} couldn’t install devDependencies, error: ${code}`);
                    break;
                case 'peerDependencies':
                    didSucceed(code) ?
                        resolve(`${config === null || config === void 0 ? void 0 : config.packageManager} installed ${config === null || config === void 0 ? void 0 : config.peerDependencies.length} peerDependencies`) :
                        reject(`${config === null || config === void 0 ? void 0 : config.packageManager} couldn’t install peerDependencies, error: ${code}`);
                    break;
            }
        });
    });
});
exports.default = (plop) => {
    plop.setDefaultInclude({ actionTypes: true });
    plop.setActionType('install-deps', npmInstall);
};

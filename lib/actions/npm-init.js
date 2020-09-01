"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cross_spawn_1 = require("cross-spawn");
const didSucceed = (code) => code === 0, npmInit = (answers, config) => new Promise((resolve, reject) => {
    const spawnOptions = (config === null || config === void 0 ? void 0 : config.verbose) ?
        {
            'cwd': config.path,
            'shell': true,
            'stdio': 'inherit'
        } :
        { 'cwd': config === null || config === void 0 ? void 0 : config.path }, npmInitCommand = cross_spawn_1.spawn('npm', ['init', '-y'], spawnOptions);
    npmInitCommand &&
        npmInitCommand.on('close', code => didSucceed(code)
            ? resolve('created package.json')
            : reject(`couldn’t create package.json, error ${code}`));
});
exports.default = (plop) => {
    plop.setDefaultInclude({ 'actionTypes': true });
    plop.setActionType('npm-init', npmInit);
};

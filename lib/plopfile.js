"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generators_1 = require("./generators/index");
exports.default = (plop) => {
    plop.load(['plop-pack-git-init', './actions/npm-init.js', './actions/install-deps.js'], {
        destBasePath: process.cwd(),
        force: false
    }, false);
    plop.setGenerator('project', generators_1.projectGenerator);
    plop.setGenerator('component', generators_1.componentGenerator);
};

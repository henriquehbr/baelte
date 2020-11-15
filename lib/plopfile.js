"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./generators/index");
exports.default = (plop) => {
    plop.load(['plop-pack-git-init', './actions/npm-init.js', './actions/install-deps.js'], {
        destBasePath: process.cwd(),
        force: false
    }, false);
    plop.setGenerator('project', index_1.projectGenerator);
    plop.setGenerator('component', index_1.componentGenerator);
};

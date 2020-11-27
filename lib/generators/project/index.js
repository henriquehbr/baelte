"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectGenerator = void 0;
const actions_1 = require("./actions");
const prompts_1 = require("./prompts");
exports.projectGenerator = {
    description: 'Create a project',
    prompts: prompts_1.projectGeneratorPrompts,
    actions: actions_1.componentGeneratorActions
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGenerator = void 0;
const prompts_1 = require("./prompts");
const actions_1 = require("./actions");
exports.componentGenerator = {
    'description': 'Generate a component',
    'prompts': prompts_1.componentGeneratorPrompts,
    'actions': actions_1.componentGeneratorActions
};

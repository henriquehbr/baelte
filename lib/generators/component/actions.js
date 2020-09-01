"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGeneratorActions = void 0;
const path_1 = __importDefault(require("path"));
const TEMPLATES_PATH = path_1.default.resolve(__dirname, '../../templates');
exports.componentGeneratorActions = [
    {
        type: 'add',
        path: '{{path}}/{{name}}.svelte',
        templateFile: `${TEMPLATES_PATH}/component.hbs`
    }
];

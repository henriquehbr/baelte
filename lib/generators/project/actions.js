"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGeneratorActions = void 0;
const path_1 = __importDefault(require("path"));
const COMPONENTS_PATH = path_1.default.resolve(process.cwd(), '');
const TEMPLATES_PATH = path_1.default.resolve(__dirname, '../../templates');
exports.componentGeneratorActions = ({ name, packageManager } = {}) => [
    {
        type: 'add',
        path: `${COMPONENTS_PATH}/{{name}}/index.svelte`,
        templateFile: `${TEMPLATES_PATH}/component.hbs`
    },
    {
        type: 'gitInit',
        path: path_1.default.resolve(process.cwd(), name)
    },
    {
        type: `${packageManager}Install`,
        path: path_1.default.resolve(process.cwd(), name),
        verbose: true,
        dependencies: ['rollup', 'svelte']
    }
];

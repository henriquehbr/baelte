"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGeneratorPrompts = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const componentsDirectoryPath = path_1.default.resolve(process.cwd(), 'src', 'components'), componentsDirectoryExists = fs_1.default.existsSync(componentsDirectoryPath);
exports.componentGeneratorPrompts = [
    {
        'name': 'name',
        'type': 'input',
        'message': 'Name of your component?'
    },
    {
        'name': 'path',
        'type': 'input',
        'message': 'Where your component should be created?',
        'when': () => !componentsDirectoryExists,
        'default': process.cwd()
    }
];

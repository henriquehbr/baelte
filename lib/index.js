"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const plop_1 = require("plop");
const arguments_ = process.argv.slice(2);
const argv = require('minimist')(arguments_);
plop_1.Plop.launch({
    cwd: argv.cwd,
    configPath: path_1.default.resolve(__dirname, 'plopfile.js'),
    require: argv.require,
    completion: argv.completion
}, environment => plop_1.run({
    ...environment,
    cwd: process.cwd()
}, undefined, true));

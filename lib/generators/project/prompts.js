"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectGeneratorPrompts = void 0;
exports.projectGeneratorPrompts = [
    {
        name: 'name',
        type: 'input',
        message: 'Name of your project?'
    },
    {
        name: 'packageManager',
        type: 'list',
        message: 'Which package manager do you prefer?',
        choices: [{ name: 'yarn' }, { name: 'npm' }]
    },
    {
        name: 'bundler',
        type: 'list',
        message: 'Which bundler do you prefer?',
        choices: [
            {
                name: 'Rollup',
                value: 'rollup'
            },
            {
                name: 'Webpack',
                value: 'webpack'
            }
        ]
    }
];

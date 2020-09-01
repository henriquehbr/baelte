"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentGeneratorActions = void 0;
const path_1 = __importDefault(require("path"));
const edit_json_file_1 = __importDefault(require("edit-json-file"));
exports.componentGeneratorActions = ({ name, packageManager, bundler } = {}) => {
    const PROJECT_PATH = (...filePath) => path_1.default.resolve(process.cwd(), name, ...filePath), TEMPLATES_PATH = (...filePath) => path_1.default.resolve(__dirname, '..', '..', 'templates', ...filePath);
    const packageJsonScripts = bundler === 'rollup'
        ? {
            dev: 'rollup -cw',
            build: 'rollup -c'
        }
        : {
            dev: 'webpack-dev-server --content-base public',
            build: 'cross-env NODE_ENV=production webpack'
        };
    const dependenciesToInstall = bundler === 'rollup'
        ? [
            '@rollup/plugin-alias',
            '@rollup/plugin-commonjs',
            '@rollup/plugin-node-resolve',
            'rollup-plugin-livereload',
            'rollup-plugin-serve',
            'rollup-plugin-svelte',
            'rollup-plugin-terser'
        ]
        : [
            'css-loader',
            'mini-css-extract-plugin',
            'serve',
            'style-loader',
            'svelte-loader',
            'webpack',
            'webpack-cli',
            'webpack-dev-server'
        ];
    return [
        {
            type: 'addMany',
            destination: PROJECT_PATH(),
            templateFiles: ['templates/**/*', '!templates/*.config.js'],
            globOptions: { dot: true }
        },
        {
            type: 'add',
            path: PROJECT_PATH(`${bundler}.config.js`),
            templateFile: TEMPLATES_PATH(`${bundler}.config.js`)
        },
        {
            type: 'gitInit',
            path: PROJECT_PATH()
        },
        {
            type: 'npm-init',
            path: PROJECT_PATH()
        },
        {
            type: 'modify',
            path: PROJECT_PATH('package.json'),
            verbose: true,
            transform: () => new Promise(resolve => {
                const packageJsonPath = PROJECT_PATH('package.json'), packageJson = edit_json_file_1.default(packageJsonPath, { autosave: true });
                packageJson.set('scripts', packageJsonScripts);
                packageJson.set('main', './src/index.js');
                resolve(JSON.stringify(packageJson.get(), null, 2));
            })
        },
        {
            type: 'install-deps',
            path: PROJECT_PATH(),
            packageManager,
            devDependencies: ['svelte', 'rollup', ...dependenciesToInstall]
        }
    ];
};

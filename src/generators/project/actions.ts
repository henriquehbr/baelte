import path from 'path'
import editJsonFile from 'edit-json-file'
import type { DynamicActionsFunction } from 'node-plop'

export const componentGeneratorActions: DynamicActionsFunction = ({
  name,
  packageManager,
  bundler
} = {}) => {
  const PROJECT_PATH = (...filePath: string[]) => path.resolve(process.cwd(), name, ...filePath)
  const TEMPLATES_PATH = (...filePath: string[]) =>
    path.resolve(__dirname, '..', '..', 'templates', ...filePath)

  const packageJsonScripts =
    bundler === 'rollup'
      ? {
          dev: 'rollup -cw',
          build: 'rollup -c'
        }
      : {
          dev: 'webpack serve',
          build: 'cross-env NODE_ENV=production webpack'
        }

  const devDependenciesToInstall =
    bundler === 'rollup'
      ? [
          'cross-env',
          '@rollup/plugin-alias',
          '@rollup/plugin-commonjs',
          '@rollup/plugin-node-resolve',
          'rollup-plugin-livereload',
          'rollup-plugin-serve',
          'rollup-plugin-svelte',
          'rollup-plugin-terser',
          'rollup-plugin-css-only'
        ]
      : [
          'css-loader',
          'cross-env',
          'mini-css-extract-plugin',
          'serve',
          'style-loader',
          'svelte-loader',
          'webpack',
          'webpack-cli',
          'webpack-dev-server'
        ]

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
      transform: () =>
        new Promise(resolve => {
          const packageJsonPath = PROJECT_PATH('package.json')
          const packageJson = editJsonFile(packageJsonPath, { autosave: true })
          packageJson.set('scripts', packageJsonScripts)
          packageJson.set('main', './src/index.js')
          resolve(JSON.stringify(packageJson.get(), null, 2))
        })
    },
    {
      type: 'install-deps',
      path: PROJECT_PATH(),
      packageManager,
      devDependencies: ['svelte', 'rollup', ...devDependenciesToInstall]
    }
  ]
}

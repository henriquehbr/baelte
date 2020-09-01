import path from 'path'
import type { DynamicActionsFunction } from 'node-plop'
import editJsonFile from 'edit-json-file'

export const componentGeneratorActions: DynamicActionsFunction = ({
  name,
  packageManager,
  bundler
} = {}) => {
  const PROJECT_PATH = (...filePath: string[]) => path.resolve(process.cwd(), name, ...filePath),
    TEMPLATES_PATH = (...filePath: string[]) =>
      path.resolve(__dirname, '..', '..', 'templates', ...filePath)
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
          const packageJsonPath = PROJECT_PATH('package.json'),
            packageJson = editJsonFile(packageJsonPath, { autosave: true })
          packageJson.set('scripts', {
            start: 'rollup -cw',
            build: 'rollup -c'
          })
          packageJson.set('main', './src/index.js')
          resolve(JSON.stringify(packageJson.get()))
        })
    },
    {
      type: 'install-deps',
      path: PROJECT_PATH(),
      packageManager,
      devDependencies: [
        'rollup',
        'svelte',
        '@rollup/plugin-alias',
        '@rollup/plugin-commonjs',
        '@rollup/plugin-node-resolve',
        'rollup-plugin-livereload',
        'rollup-plugin-serve',
        'rollup-plugin-svelte',
        'rollup-plugin-terser'
      ]
    }
  ]
}

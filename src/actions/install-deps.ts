import type { SpawnOptions } from 'child_process'
import { spawn } from 'cross-spawn'
import type { NodePlopAPI, _CustomActionFunction } from 'node-plop'

const didSucceed = (code: number) => code === 0

const npmInstall: _CustomActionFunction = (answers, config) => new Promise((resolve, reject) => {
  const spawnOptions: SpawnOptions = config?.verbose ?
    {
      cwd: config.path,
      shell: true,
      stdio: 'inherit'
    } :
    { cwd: config?.path }

  const installSubCommand = config?.packageManager === 'yarn' ? 'add' : 'i'

  const npmInstallCommands = Object.entries({
    dependencies:
        config?.dependencies &&
        spawn(config.packageManager, [installSubCommand, ...config.dependencies], spawnOptions),
    devDependencies:
        config?.devDependencies &&
        spawn(
          config.packageManager,
          [installSubCommand, '-D', ...config.devDependencies],
          spawnOptions
        ),
    peerDependencies:
        config?.peerDependencies &&
        spawn(
          config.packageManager,
          [installSubCommand, '-P', ...config.peerDependencies],
          spawnOptions
        )
  }).filter(([dependencyType, dependencyNames]) => dependencyNames)

  npmInstallCommands.forEach(([dependencyType, dependencyNames]) => {
    dependencyNames?.on('close', code => {
      switch (dependencyType) {
      case 'dependencies':
        didSucceed(code) ?
          resolve(`${config?.packageManager} installed ${config?.dependencies.length} dependencies`) :
          reject(`${config?.packageManager} couldn’t install dependencies, error: ${code}`)
        break
      case 'devDependencies':
        didSucceed(code) ?
          resolve(`${config?.packageManager} installed ${config?.devDependencies.length} devDependencies`) :
          reject(`${config?.packageManager} couldn’t install devDependencies, error: ${code}`)
        break
      case 'peerDependencies':
        didSucceed(code) ?
          resolve(`${config?.packageManager} installed ${config?.peerDependencies.length} peerDependencies`) :
          reject(`${config?.packageManager} couldn’t install peerDependencies, error: ${code}`)
        break
      }
    })
  })
})

export default (plop: NodePlopAPI) => {
  plop.setDefaultInclude({ actionTypes: true })
  plop.setActionType('install-deps', npmInstall)
}

import type { SpawnOptions } from 'child_process'
import { spawn } from 'cross-spawn'
import type { NodePlopAPI, _CustomActionFunction } from 'node-plop'

const didSucceed = (code: number) => code === 0

const npmInit: _CustomActionFunction = (answers, config) => new Promise((resolve, reject) => {
  const spawnOptions: SpawnOptions = config?.verbose ?
    {
      cwd: config.path,
      shell: true,
      stdio: 'inherit'
    } :
    { cwd: config?.path }

  const npmInitCommand = spawn('npm', ['init', '-y'], spawnOptions)

  npmInitCommand &&
      npmInitCommand.on('close', code => didSucceed(code)
          ? resolve('created package.json')
          : reject(`couldn’t create package.json, error ${code}`)
      )
})

export default (plop: NodePlopAPI) => {
  plop.setDefaultInclude({ actionTypes: true })
  plop.setActionType('npm-init', npmInit)
}

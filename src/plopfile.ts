import type { NodePlopAPI } from 'plop'
import { componentGenerator, projectGenerator } from 'generators'

export default (plop: NodePlopAPI) => {
  plop.load(
    ['plop-pack-git-init', './actions/npm-init.ts', './actions/install-deps.ts'],
    {
      destBasePath: process.cwd(),
      force: false
    },
    false
  )
  plop.setGenerator('Project', projectGenerator)
  plop.setGenerator('Component', componentGenerator)
}

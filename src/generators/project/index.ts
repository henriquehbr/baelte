import type { PlopGeneratorConfig } from 'node-plop'
import { componentGeneratorActions } from './actions'
import { projectGeneratorPrompts } from './prompts'

export const projectGenerator: PlopGeneratorConfig = {
  description: 'Create a project',
  prompts: projectGeneratorPrompts,
  actions: componentGeneratorActions
}

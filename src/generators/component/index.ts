import type { PlopGeneratorConfig } from 'node-plop'
import { componentGeneratorActions } from './actions'
import { componentGeneratorPrompts } from './prompts'

export const componentGenerator: PlopGeneratorConfig = {
  description: 'Generate a component',
  prompts: componentGeneratorPrompts,
  actions: componentGeneratorActions
}

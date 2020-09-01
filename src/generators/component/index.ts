import type { PlopGeneratorConfig } from 'node-plop'
import { componentGeneratorPrompts } from './prompts'
import { componentGeneratorActions } from './actions'

export const componentGenerator: PlopGeneratorConfig = {
  'description': 'Generate a component',
  'prompts': componentGeneratorPrompts,
  'actions': componentGeneratorActions
}

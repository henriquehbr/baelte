import type { PlopGeneratorConfig } from 'node-plop'
import { projectGeneratorPrompts } from './prompts'
import { componentGeneratorActions } from './actions'

export const projectGenerator: PlopGeneratorConfig = {
  'description': 'Create a project',
  'prompts': projectGeneratorPrompts,
  'actions': componentGeneratorActions
}

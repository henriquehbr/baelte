import path from 'path'
import type {
  AddActionConfig,
  AddManyActionConfig,
  AppendActionConfig,
  ModifyActionConfig
} from 'plop'

type ActionConfig = (
  | Omit<AddActionConfig, 'template'>
  | Omit<AddManyActionConfig, 'template'>
  | Omit<ModifyActionConfig, 'template'>
  | Omit<AppendActionConfig, 'template'>
)[]

const TEMPLATES_PATH = path.resolve(__dirname, '../../templates')

export const componentGeneratorActions: ActionConfig = [
  {
    'type': 'add',
    'path': '{{path}}/{{name}}.svelte',
    'templateFile': `${TEMPLATES_PATH}/component.hbs`
  }
]

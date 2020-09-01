import type { Prompts } from 'node-plop'

export const projectGeneratorPrompts: Prompts = [
  {
    name: 'name',
    type: 'input',
    message: 'Name of your project?'
  },
  {
    name: 'packageManager',
    type: 'list',
    message: 'Which package manager do you prefer?',
    choices: [{ name: 'yarn' }, { name: 'npm' }]
  },
  {
    name: 'bundler',
    type: 'list',
    message: 'Which bundler do you prefer?',
    choices: [
      {
        name: 'Rollup',
        value: 'rollup'
      },
      {
        name: 'Webpack',
        value: 'webpack'
      }
    ]
  }
]

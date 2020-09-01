import fs from 'fs'
import path from 'path'
import type { Prompts } from 'node-plop'

const componentsDirectoryPath = path.resolve(
    process.cwd(),
    'src',
    'components'
  ),
  componentsDirectoryExists = fs.existsSync(componentsDirectoryPath)

export const componentGeneratorPrompts: Prompts = [
  {
    'name': 'name',
    'type': 'input',
    'message': 'Name of your component?'
  },
  {
    'name': 'path',
    'type': 'input',
    'message': 'Where your component should be created?',
    'when': () => !componentsDirectoryExists,
    'default': process.cwd()
  }
]

import { GeneratorConfig } from 'sao'

const saoConfig: GeneratorConfig = {
  prompts: [
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of the new project?'
    }
  ]
}

export default saoConfig

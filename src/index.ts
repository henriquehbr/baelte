#!/usr/bin/env node
import path from 'path'
import { Plop, run } from 'plop'

const arguments_ = process.argv.slice(2),
  argv = require('minimist')(arguments_)

Plop.launch(
  {
    'cwd': argv.cwd,
    'configPath': path.resolve(__dirname, 'plopfile.ts'),
    'require': argv.require,
    'completion': argv.completion
  },
  environment => run(
    {
      ...environment,
      'cwd': process.cwd()
    },
    undefined,
    true
  )
)

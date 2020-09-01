import type { ActionType } from 'node-plop'
import { ActionConfig, NodePlopAPI } from 'node-plop'

declare module 'node-plop' {
  interface NodePlopAPI {
    setActionType(name: string, fn: _CustomActionFunction): void
  }

  interface ActionConfig {
    path?: string
    verbose?: boolean
  }

  interface NpmInstallActionConfig extends ActionConfig {
    dependencies: string[]
    devDependencies: string[]
    peerDependencies: string[]
    packageManager: string
  }

  interface CopyFilesActionConfig extends ActionConfig {
    src: string
    dest: string
  }

  type CustomActionTypes = NpmInstallActionConfig & CopyFilesActionConfig

  type _ActionType = ActionType & CustomActionTypes

  type _CustomActionFunction = (
    answers: object,
    config?: _ActionType,
    plopfileApi?: NodePlopAPI
  ) => Promise<string> | string
}

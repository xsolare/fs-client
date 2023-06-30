import type { INode } from '#/types/models/node.interface'

export interface ICreateUserOnNodeVariables {
  activationAt: string | Date
  deactivationAt: string | Date
  nodeId: string
  userId: string
}

export interface ICreateUserOnNodeResponse {
  node: INode
}

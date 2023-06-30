import type { ICreateNodeVariables, IUpdateNodeVariables } from './node.interface'
import type { HandleGQL } from '../..'

import { CREATE_NODE, DELETE_NODE, UPDATE_NODE } from './node.gql'

export const NodeMutation = (handleGQL: HandleGQL) => ({
  createNode: <T>(variables: { node: ICreateNodeVariables }) => {
    return handleGQL<T, { node: ICreateNodeVariables }>(CREATE_NODE, variables)
  },
  deleteNode: <T>(ids: string[]) => {
    return handleGQL<T, { ids: string[] }>(DELETE_NODE, { ids })
  },
  updateNode: <T>(variables: { nodes: IUpdateNodeVariables[] }) => {
    return handleGQL<T, { nodes: IUpdateNodeVariables[] }>(UPDATE_NODE, variables)
  }
})

import type { INode } from '#/types/models/node.interface'
import type { INodesBaseVariables, INodesReservesVariables } from './node.interface'
import type { HandleGQL } from '../..'

import { NODES, NODES_BY_LAYER, NODES_RESERVES } from './node.gql'

export const NodeQuery = (handleGQL: HandleGQL) => ({
  all: () => {
    return handleGQL<INode[]>(NODES)
  },
  nodesByLayer: (variables: INodesBaseVariables) => {
    return handleGQL<INode[]>(NODES_BY_LAYER, variables)
  },
  nodesReservesByLayer: (variables: INodesReservesVariables) => {
    return handleGQL<INode[]>(NODES_RESERVES, variables)
  }
})

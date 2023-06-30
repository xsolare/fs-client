import type { IUsersOnNode } from '#/types/models/user.interface'
import type { HandleGQL } from '../..'

import { ALL_USERS_ON_NODES, USERS_ON_NODES_RANGE } from './user-on-node.gql'

export const UsersOnNodesQuery = (handleGQL: HandleGQL) => ({
  allUsersOnNodes: () => {
    return handleGQL<IUsersOnNode[]>(ALL_USERS_ON_NODES)
  },
  allUsersOnNodesRange: (variables: { fromAt: Date; toAt: Date }) => {
    return handleGQL<IUsersOnNode[]>(USERS_ON_NODES_RANGE, variables)
  }
})

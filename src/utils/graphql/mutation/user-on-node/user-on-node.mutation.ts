import type {
  ICreateUserOnNodeResponse,
  ICreateUserOnNodeVariables
} from './user-on-node.interface'
import type { HandleGQL } from '../..'

import { CREATE_USER_ON_NODE } from './user-on-node.gql'

export const UserOnNodesMutation = (handleGQL: HandleGQL) => ({
  createUserOnNode: (variables: { data: ICreateUserOnNodeVariables }) => {
    return handleGQL<ICreateUserOnNodeResponse, { data: ICreateUserOnNodeVariables }>(
      CREATE_USER_ON_NODE,
      variables
    )
  }
})

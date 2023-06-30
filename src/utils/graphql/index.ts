import type { Variables } from 'graphql-request'

import { GraphQLClient } from 'graphql-request'

import { getBearerToken } from '../common'
import { NodeMutation } from './mutation/node/node.mutation'
import { UserMutation } from './mutation/user/user.mutation'
import { UserOnNodesMutation } from './mutation/user-on-node/user-on-node.mutation'
import { NodeQuery } from './query/node/node.query'
import { OfficeQuery } from './query/office/office.query'
import { UserQuery } from './query/user/user.query'
import { UsersOnNodesQuery } from './query/user-on-node/user-on-node.query'

export type HandleGQL = typeof handleGQL

const getHeaders = () => ({
  [AUTH_KEY]: getBearerToken()
})

export const handleGQL = async <TData, TVariables = Variables>(
  ql: string,
  variables?: TVariables
) => {
  const graphQLClient = new GraphQLClient(`${import.meta.env.VITE_API_URL}/graphql`, {
    headers: getHeaders()
  })

  let data: TData | null = null
  let errors: string | null = null

  try {
    data = await graphQLClient.request(ql, variables as unknown as Variables)
    data = data?.[Object.keys(data)[0]].data
  } catch (error) {
    errors = error?.response?.errors
  }

  return { data, errors }
}

export const graphql = {
  query: {
    user: UserQuery(handleGQL),
    node: NodeQuery(handleGQL),
    office: OfficeQuery(handleGQL),
    usersOnNodes: UsersOnNodesQuery(handleGQL)
  },
  mutation: {
    user: UserMutation(handleGQL),
    node: NodeMutation(handleGQL),
    usersOnNodes: UserOnNodesMutation(handleGQL)
  }
}

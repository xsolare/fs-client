import type { Variables } from 'graphql-request'

import { GraphQLClient } from 'graphql-request'

import { getBearerToken } from '../common/helpers'
import { UserMutation } from './mutation/user/user.mutation'
import { UserQuery } from './query/user/user.query'

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
    user: UserQuery(handleGQL)
  },
  mutation: {
    user: UserMutation(handleGQL)
  }
}

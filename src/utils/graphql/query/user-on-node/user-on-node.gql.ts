import { gql } from 'graphql-request'

export const ALL_USERS_ON_NODES = gql`
  query allUsersOnNodes {
    usersOnNodes {
      ... on Error {
        message
      }
      ... on QueryUsersOnNodesSuccess {
        data {
          activationAt
          createdAt
          deactivationAt
          nodeId
          userId
        }
      }
    }
  }
`

export const USERS_ON_NODES_RANGE = gql`
  query allUsersOnNodesRange($fromAt: TimestampTZ!, $toAt: TimestampTZ!) {
    usersOnNodesRange(fromAt: $fromAt, toAt: $toAt) {
      ... on QueryUsersOnNodesRangeSuccess {
        data {
          id
          activationAt
          createdAt
          deactivationAt
          nodeId
          userId
        }
      }
      ... on Error {
        message
      }
    }
  }
`

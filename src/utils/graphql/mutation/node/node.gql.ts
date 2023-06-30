import { gql } from 'graphql-request'

export const CREATE_NODE = gql`
  mutation CreateNode($node: NodeCreateInput!) {
    createNode(data: $node) {
      ... on MutationCreateNodeSuccess {
        data {
          id
          data {
            index
          }
        }
      }
      ... on Error {
        message
      }
    }
  }
`

export const DELETE_NODE = gql`
  mutation DeleteNode($ids: [UUID!]) {
    deleteNode(data: $ids) {
      ... on MutationDeleteNodeSuccess {
        data
      }
      ... on Error {
        message
      }
    }
  }
`

export const UPDATE_NODE = gql`
  mutation UpdateNode($nodes: [NodeUpdateInput!]!) {
    updateNode(data: $nodes) {
      __typename
    }
  }
`

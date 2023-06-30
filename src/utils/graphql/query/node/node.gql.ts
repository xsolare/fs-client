import { gql } from 'graphql-request'

export const NODES = gql`
  query Nodes {
    nodes {
      ... on Error {
        message
      }
      ... on QueryNodesSuccess {
        data {
          id
          angle
          height
          layerId
          type
          width
          pos
          data {
            index
            backgroundSrc
            customCss
          }
        }
      }
    }
  }
`

export const NODES_BY_LAYER = gql`
  query AllNodesFromLayers($uuid: UUID!) {
    nodesByLayerId(layerId: $uuid) {
      ... on QueryNodesByLayerIdSuccess {
        data {
          id
          height
          angle
          layerId
          pos
          width
          type
          reserves {
            user {
              id
              login
              avatar
              city
              country
              firstName
              lastName
              telegram
              mobile
              emailPersonal
              emailSecondary
              status
              birthDate
              employmentDate
              createdAt
              updatedAt
            }
            activationAt
            createdAt
            deactivationAt
          }
          data {
            index
            backgroundSrc
            customCss
          }
        }
      }
      ... on Error {
        message
      }
    }
  }
`

export const NODES_RESERVES = gql`
  query NodesReserves($uuid: UUID!, $reserveAt: TimestampTZ, $reserveTo: TimestampTZ) {
    nodesByLayerId(layerId: $uuid) {
      ... on QueryNodesByLayerIdSuccess {
        data {
          id
          reserves(at: $reserveAt, to: $reserveTo) {
            user {
              id
              login
              avatar
              city
              country
              firstName
              lastName
              telegram
              mobile
              emailPersonal
              emailSecondary
              status
              birthDate
              employmentDate
              createdAt
              updatedAt
            }
            activationAt
            deactivationAt
          }
        }
      }
      ... on Error {
        message
      }
    }
  }
`

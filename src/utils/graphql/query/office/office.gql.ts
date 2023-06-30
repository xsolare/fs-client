import { gql } from 'graphql-request'

export const ALL_OFFICE_NESTED = gql`
  query AllOfficeNested($uuid: UUID!) {
    officeByUuid(id: $uuid) {
      ... on QueryOfficeByUuidSuccess {
        data {
          id
          createdAt
          city
          address
          updatedAt
          name
          layers {
            id
            img
            index
            name
            nodes {
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
        }
      }
      ... on Error {
        message
      }
    }
  }
`

export const OFFICE_WITH_LAYERS = gql`
  query OfficeWithLayers($uuid: UUID!) {
    officeByUuid(id: $uuid) {
      ... on QueryOfficeByUuidSuccess {
        data {
          id
          createdAt
          city
          address
          updatedAt
          name
          layers {
            id
            img
            index
            name
          }
        }
      }
      ... on Error {
        message
      }
    }
  }
`

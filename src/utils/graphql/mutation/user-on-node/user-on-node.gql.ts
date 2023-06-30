import { gql } from 'graphql-request'

export const CREATE_USER_ON_NODE = gql`
  mutation CreateUserOnNode($data: UserOnNodeCreateInput!) {
    createUserOnNode(data: $data) {
      ... on Error {
        message
      }
      ... on MutationCreateUserOnNodeSuccess {
        data {
          node {
            id
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
          }
        }
      }
    }
  }
`

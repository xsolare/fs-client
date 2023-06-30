import { gql } from 'graphql-request'

export const AUTH_ME = gql`
  query authMe {
    me {
      ... on Error {
        message
      }
      ... on QueryMeSuccess {
        data {
          id
          login
          role
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
          reserves {
            id
            activationAt
            deactivationAt
            createdAt
            node {
              id
              type
            }
          }
        }
      }
    }
  }
`

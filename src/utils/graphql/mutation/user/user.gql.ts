import { gql } from 'graphql-request'

export const SIGN_IN_WITH_TRACKER = gql`
  mutation signInWithTracker($payload: UserSignInInput!) {
    signInWithTracker(data: $payload) {
      ... on Error {
        message
      }
      ... on MutationSignInWithTrackerSuccess {
        data {
          accessToken
          refreshToken
        }
      }
    }
  }
`

export const SIGN_IN = gql`
  mutation sigIn($payload: UserSignInInput!) {
    signIn(data: $payload) {
      ... on Error {
        message
      }
      ... on MutationSignInSuccess {
        data {
          user {
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
          accessToken
          refreshToken
        }
      }
    }
  }
`

export const SIGN_UP = gql`
  mutation sigUp($payload: UserSignUpInput!) {
    signUp(data: $payload) {
      ... on Error {
        message
      }
      ... on MutationSignUpSuccess {
        data {
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
            reserves {
              __typename
            }
          }
          accessToken
          refreshToken
        }
      }
    }
  }
`

import type { IAuthedUser, IUserSignInVariables, IUserSignUpVariables } from './user.interface'
import type { HandleGQL } from '../..'

import { SIGN_IN, SIGN_IN_WITH_TRACKER, SIGN_UP } from './user.gql'

export const UserMutation = (handleGQL: HandleGQL) => ({
  sigIn: (variables: IUserSignInVariables) => {
    return handleGQL<IAuthedUser, { payload: IUserSignInVariables }>(SIGN_IN, {
      payload: variables
    })
  },
  sigUp: (variables: IUserSignInVariables) => {
    return handleGQL<IAuthedUser, { payload: IUserSignUpVariables }>(SIGN_UP, {
      payload: variables
    })
  },
  sigInWithTracker: (variables: IUserSignInVariables) => {
    return handleGQL<IAuthedUser, { payload: IUserSignInVariables }>(SIGN_IN_WITH_TRACKER, {
      payload: variables
    })
  }
})

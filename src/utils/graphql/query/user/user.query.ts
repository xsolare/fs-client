import type { IUser } from '#/types/models/user.interface'
import type { HandleGQL } from '../..'

import { AUTH_ME } from './user.gql'

export const UserQuery = (handleGQL: HandleGQL) => ({
  me: () => {
    return handleGQL<IUser>(AUTH_ME)
  }
})

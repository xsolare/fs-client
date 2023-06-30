import type { IUser } from '#/types/models/user.interface'

export interface IUserSignInVariables {
  login: string
  password: string
}

export interface IUserSignUpVariables {
  login: string
  password: string
}

export interface IAuthedUser {
  user: IUser
  accessToken: string
  refreshToken: string
}

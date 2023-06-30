export interface IUser {
  id: string
  password: string
  login: string

  createdAt?: Date
  updatedAt?: Date

  role: ERole
}

export enum ERole {
  User = 'User',
  Admin = 'Admin'
}

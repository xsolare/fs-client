import type { IUser } from '#/types/models/user.interface'

///                                                                                 //
export const AuthApi = (instance: AxiosInstance) => ({
  async me(): Promise<IUser> {
    const { data } = await instance.get<IUser>('/user/me')
    return data
  }
})

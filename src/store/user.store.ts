import type { IUser } from '#/types/models/user.interface'

export default class UserStore {
  private _user: IUser | null = null

  constructor() {
    makeAutoObservable(this)
  }

  get user() {
    return this._user
  }

  setUser(user: IUser | null) {
    this._user = user
  }

  me = async () => {
    const { data: user } = await graphql.query.user.me()
    this.setUser(user)
    return user ?? null
  }

  saveCredential = (data: { accessToken: string; refreshToken: string }) => {
    localStorage.setItem(AUTH_KEY, data.accessToken)
    localStorage.setItem(AUTH_REFRESH_KEY, data.refreshToken)
  }

  logout = () => {
    this.setUser(null)
    localStorage.removeItem(AUTH_KEY)
  }

  get isAuth() {
    return !!this.user?.login
  }
}

import { AuthApi } from './auth'
import { FsApi } from './fs'

export type ApiReturnType = {
  auth: ReturnType<typeof AuthApi>
  fs: ReturnType<typeof FsApi>
}

export const api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
  })

  store.appStore.addAxiosInterceptors(instance)

  const apis = {
    auth: AuthApi(instance),
    fs: FsApi(instance)
  }

  return apis
}

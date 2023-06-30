import { useRootStore } from '#/contexts/root-store'
import AppStore from '../app.store'
import UserStore from '../user.store'

export interface IRootStore {
  appStore: AppStore
  userStore: UserStore
}

//* ---- Root store ------------------------------------------------------------- *//
export class IRootStore {
  constructor() {
    const appStore = new AppStore()
    const userStore = new UserStore()

    this.appStore = appStore
    this.userStore = userStore
  }
}

export const useAppStore = useRootStore
